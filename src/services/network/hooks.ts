import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  type UseMutationOptions,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { apiClient } from './config';
import { type ApiRequestConfig, type ApiErrorResponse } from './config';

export interface ApiQueryOptions<TData = unknown>
  extends Omit<
    UseQueryOptions<TData, AxiosError<ApiErrorResponse>>,
    'queryKey' | 'queryFn'
  > {
  queryKey: QueryKey;
  url: string;
  config?: ApiRequestConfig;
  client?: AxiosInstance;
}

export interface ApiMutationOptions<TData = unknown, TVariables = unknown>
  extends Omit<
    UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
    'mutationFn'
  > {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  config?: ApiRequestConfig;
  client?: AxiosInstance;
}

export interface ApiInfiniteQueryOptions<TData = unknown>
  extends Omit<
    UseInfiniteQueryOptions<TData, AxiosError<ApiErrorResponse>>,
    'queryKey' | 'queryFn'
  > {
  queryKey: QueryKey;
  requestFn: (context: {
    pageParam: unknown;
    client: AxiosInstance;
  }) => Promise<TData>;
  client?: AxiosInstance;
}

export function useApiQuery<TData = unknown>(
  options: ApiQueryOptions<TData>
): UseQueryResult<TData, AxiosError<ApiErrorResponse>> {
  const {
    queryKey,
    url,
    config,
    client = apiClient,
    ...queryOptions
  } = options;

  return useQuery({
    queryKey,
    queryFn: async (): Promise<TData> => {
      const response: AxiosResponse<TData> = await client.get(url, config);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...queryOptions,
  });
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  options: ApiMutationOptions<TData, TVariables>
): UseMutationResult<TData, AxiosError<ApiErrorResponse>, TVariables> {
  const {
    url,
    method = 'POST',
    config,
    client = apiClient,
    ...mutationOptions
  } = options;

  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      let response: AxiosResponse<TData>;

      switch (method) {
        case 'POST':
          response = await client.post(url, variables, config);
          break;
        case 'PUT':
          response = await client.put(url, variables, config);
          break;
        case 'PATCH':
          response = await client.patch(url, variables, config);
          break;
        case 'DELETE':
          response = await client.delete(url, { ...config, data: variables });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data;
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, onMutateResult, context);
      }
    },
    onError: (error, variables, onMutateResult, context) => {
      console.error('Mutation error:', error);
      if (options.onError) {
        options.onError(error, variables, onMutateResult, context);
      }
    },
    ...mutationOptions,
  });
}

export function useInfiniteApiQuery<TData = unknown>(
  options: ApiInfiniteQueryOptions<TData>
): UseInfiniteQueryResult<TData, AxiosError<ApiErrorResponse>> {
  const { queryKey, requestFn, client = apiClient, ...queryOptions } = options;

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => requestFn({ pageParam, client }),
    retry: false,
    ...queryOptions,
  });
}

// GET request hook
export function useGet<TData = unknown>(
  queryKey: QueryKey,
  url: string,
  config?: ApiRequestConfig,
  options?: Omit<
    UseQueryOptions<TData, AxiosError<ApiErrorResponse>>,
    'queryKey' | 'queryFn'
  > & {
    client?: AxiosInstance;
  }
) {
  return useApiQuery<TData>({
    queryKey,
    url,
    config,
    ...options,
  });
}

// POST request hook
export function usePost<TData = unknown, TVariables = unknown>(
  url: string,
  config?: ApiRequestConfig,
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
    'mutationFn'
  > & {
    client?: AxiosInstance;
  }
) {
  return useApiMutation<TData, TVariables>({
    url,
    method: 'POST',
    config,
    ...options,
  });
}

// PUT request hook
export function usePut<TData = unknown, TVariables = unknown>(
  url: string,
  config?: ApiRequestConfig,
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
    'mutationFn'
  > & {
    client?: AxiosInstance;
  }
) {
  return useApiMutation<TData, TVariables>({
    url,
    method: 'PUT',
    config,
    ...options,
  });
}

// PATCH request hook
export function usePatch<TData = unknown, TVariables = unknown>(
  url: string,
  config?: ApiRequestConfig,
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
    'mutationFn'
  > & {
    client?: AxiosInstance;
  }
) {
  return useApiMutation<TData, TVariables>({
    url,
    method: 'PATCH',
    config,
    ...options,
  });
}

// DELETE request hook
export function useDelete<TData = unknown, TVariables = unknown>(
  url: string,
  config?: ApiRequestConfig,
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
    'mutationFn'
  > & {
    client?: AxiosInstance;
  }
) {
  return useApiMutation<TData, TVariables>({
    url,
    method: 'DELETE',
    config,
    ...options,
  });
}

// Query invalidation utilities
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByKey: (queryKey: QueryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    invalidateByPrefix: (prefix: string) =>
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === prefix,
      }),
    refetchAll: () => queryClient.refetchQueries(),
    refetchByKey: (queryKey: QueryKey) =>
      queryClient.refetchQueries({ queryKey }),
  };
}

export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  return {
    setOptimisticData: <T>(
      queryKey: QueryKey,
      updater: (old: T | undefined) => T
    ) => queryClient.setQueryData(queryKey, updater),
    cancelQueries: (queryKey: QueryKey) =>
      queryClient.cancelQueries({ queryKey }),
    rollback: (queryKey: QueryKey, previousData: unknown) =>
      queryClient.setQueryData(queryKey, previousData),
  };
}
