import { type AxiosError, type AxiosInstance } from 'axios';
import { type UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteApiQuery } from '../network/hooks';
import {
  API_CONFIG,
  createApiClient,
  HTTP_STATUS,
  type ApiErrorResponse,
  type HttpStatusCode,
} from '../network/config';
import { NotificationService } from '../network/notifications';
import { queryClient } from '../queryClient';
import type {
  PolygonApiError,
  PolygonTicker,
  PolygonTickersResponse,
  TickersSearchParams,
} from './types';

const TICKERS_ENDPOINT = '/tickers';
const DEFAULT_RATE_LIMIT_SECONDS = 60;

const polygonClient: AxiosInstance = createApiClient({
  baseURL: API_CONFIG.POLYGON_BASE_URL,
  timeout: 15_000,
  skipInterceptors: true,
});

const polygonQueryKeys = {
  tickersList: (params: TickersSearchParams) =>
    ['polygon', 'tickers', params] as const,
};

type RateLimitError = Error & { isRateLimit: true; retryAfter: number };

type RequestContext = {
  pageParam: unknown;
  client: AxiosInstance;
};

const parseRetryAfter = (value?: string): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_RATE_LIMIT_SECONDS;
};

const buildTickerQueryParams = (
  params: TickersSearchParams,
  apiKey: string,
  cursor?: string
): Record<string, string | number | boolean> => {
  const {
    market = 'stocks',
    active = true,
    order = 'asc',
    limit = 100,
    sort = 'ticker',
    search,
    ticker,
    'ticker.gte': tickerGte,
    'ticker.gt': tickerGt,
    'ticker.lte': tickerLte,
    'ticker.lt': tickerLt,
  } = params;

  const baseParams: Record<string, string | number | boolean> = {
    apikey: apiKey,
    market,
    active,
    order,
    limit,
    sort,
  };

  if (search) {
    const searchValue = search.toUpperCase();
    baseParams['ticker.gte'] = searchValue;
    baseParams['ticker.lt'] = `${searchValue}Z`;
  } else if (ticker) {
    baseParams.ticker = ticker;
  }

  if (tickerGte) baseParams['ticker.gte'] = tickerGte;
  if (tickerGt) baseParams['ticker.gt'] = tickerGt;
  if (tickerLte) baseParams['ticker.lte'] = tickerLte;
  if (tickerLt) baseParams['ticker.lt'] = tickerLt;
  if (cursor) baseParams.cursor = cursor;

  return baseParams;
};

const extractCursor = (nextUrl?: string): string | undefined => {
  if (!nextUrl) return undefined;

  try {
    const url = new URL(nextUrl);
    return url.searchParams.get('cursor') || undefined;
  } catch {
    return undefined;
  }
};

const createRateLimitError = (retryAfter: number): RateLimitError => {
  const message = `Rate limited. Retrying in ${retryAfter} seconds.`;
  NotificationService.handleApiError(HTTP_STATUS.TOO_MANY_REQUESTS, message);

  const rateError = new Error(message) as RateLimitError;
  rateError.isRateLimit = true;
  rateError.retryAfter = retryAfter;
  return rateError;
};

const handlePolygonError = (error: AxiosError<PolygonApiError>): never => {
  const status = error.response?.status as HttpStatusCode | undefined;
  const responseMessage = error.response?.data?.message;
  const fallbackMessage =
    responseMessage || error.message || 'Failed to fetch data from Polygon API';

  switch (status) {
    case HTTP_STATUS.TOO_MANY_REQUESTS: {
      const retryAfter = parseRetryAfter(
        error.response?.headers?.['retry-after']
      );
      throw createRateLimitError(retryAfter);
    }
    case HTTP_STATUS.UNAUTHORIZED: {
      const message =
        responseMessage ||
        'Invalid API key. Please check your Polygon API configuration.';
      NotificationService.handleApiError(HTTP_STATUS.UNAUTHORIZED, message);
      throw new Error(message);
    }
    case HTTP_STATUS.FORBIDDEN: {
      const message =
        responseMessage ||
        'Access forbidden. Your API key may not have permission for this endpoint.';
      NotificationService.handleApiError(HTTP_STATUS.FORBIDDEN, message);
      throw new Error(message);
    }
    default: {
      if (status) {
        NotificationService.handleApiError(status, fallbackMessage);
      } else {
        NotificationService.error(fallbackMessage);
      }
      throw new Error(fallbackMessage);
    }
  }
};

const requestTickersPage = async (
  params: TickersSearchParams,
  context: RequestContext
): Promise<PolygonTickersResponse> => {
  const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Polygon API key is not configured. Please set VITE_POLYGON_API_KEY in your environment.'
    );
  }

  const cursor = context.pageParam as string | undefined;

  try {
    const response = await context.client.get<PolygonTickersResponse>(
      TICKERS_ENDPOINT,
      {
        params: buildTickerQueryParams(params, apiKey, cursor),
      }
    );

    return response.data;
  } catch (error) {
    return handlePolygonError(error as AxiosError<PolygonApiError>);
  }
};

export const clearPolygonCache = (): void => {
  queryClient.removeQueries({ queryKey: ['polygon', 'tickers'] });
};

export function useInfiniteTickers(
  params: TickersSearchParams = {},
  options?: Omit<
    UseInfiniteQueryOptions<
      PolygonTickersResponse,
      AxiosError<ApiErrorResponse>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useInfiniteApiQuery<PolygonTickersResponse>({
    queryKey: polygonQueryKeys.tickersList(params),
    client: polygonClient,
    initialPageParam: undefined,
    getNextPageParam: lastPage => extractCursor(lastPage.next_url),
    requestFn: ({ pageParam, client }) =>
      requestTickersPage(params, { pageParam, client }),
    retry: (failureCount, error) => {
      if (
        (error as { response?: { status?: number } })?.response?.status ===
        HTTP_STATUS.UNAUTHORIZED
      ) {
        return false;
      }

      if ((error as { isRateLimit?: boolean }).isRateLimit) {
        return failureCount < 3;
      }

      return failureCount < 2;
    },
    retryDelay: (attemptIndex, error) => {
      if ((error as unknown as RateLimitError).isRateLimit) {
        return (
          ((error as unknown as RateLimitError).retryAfter ||
            DEFAULT_RATE_LIMIT_SECONDS) * 1000
        );
      }

      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
    ...options,
  });
}

export const getFlatTickers = (
  data?:
    | {
        pages: PolygonTickersResponse[];
      }
    | PolygonTickersResponse
): PolygonTicker[] => {
  if (!data) {
    return [];
  }

  // Handle infinite query structure
  if ('pages' in data) {
    return data.pages.flatMap(page => page.results || []);
  }

  // Handle single response structure
  return data.results || [];
};
