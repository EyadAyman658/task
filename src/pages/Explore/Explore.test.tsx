import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  QueryClient,
  QueryClientProvider,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { vi } from 'vitest';
import { AxiosError } from 'axios';
import Explore from './index';
import type { PolygonTickersResponse } from '../../services/Explore';
import type { ApiErrorResponse } from '../../services/network/config';

vi.mock('../../services/Explore', () => ({
  useInfiniteTickers: vi.fn(),
  getFlatTickers: vi.fn(),
}));

vi.mock('../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(() => ({
    loadMoreRef: { current: null },
  })),
}));

vi.mock('./partials/SearchSection', () => ({
  default: ({
    searchQuery,
    onSearch,
    onClear,
    isLoading,
  }: {
    searchQuery: string;
    onSearch: (query: string) => void;
    onClear: () => void;
    isLoading: boolean;
  }) => (
    <div data-testid="search-section">
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
        disabled={isLoading}
      />
      <button data-testid="clear-button" onClick={onClear}>
        Clear
      </button>
    </div>
  ),
}));

vi.mock('./partials/TickersGrid', () => ({
  default: ({
    tickers,
    isInitialLoading,
    isEmpty,
    isError,
    errorMessage,
    onRetry,
  }: {
    tickers: { ticker: string }[];
    isInitialLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
    errorMessage: string | null;
    onRetry: () => void;
  }) => (
    <div data-testid="tickers-grid">
      {isInitialLoading && <div data-testid="loading">Loading...</div>}
      {isEmpty && <div data-testid="empty">No results</div>}
      {isError && (
        <div data-testid="error">
          {errorMessage}
          <button data-testid="retry-button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
      {tickers.map(ticker => (
        <div key={ticker.ticker} data-testid={`ticker-${ticker.ticker}`}>
          {ticker.ticker}
        </div>
      ))}
    </div>
  ),
}));

const { useInfiniteTickers, getFlatTickers } = await import(
  '../../services/Explore'
);

// Helper function to create proper UseInfiniteQueryResult mock
const createInfiniteQueryMock = (overrides = {}) =>
  ({
    data: undefined,
    error: null,
    isLoading: false,
    isError: false,
    isFetching: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    refetch: vi.fn(),
    // Additional required properties
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    isFetchNextPageError: false,
    isPaused: false,
    isSuccess: true,
    status: 'success' as const,
    fetchStatus: 'idle' as const,
    failureCount: 0,
    failureReason: null,
    isPlaceholderData: false,
    isRefetching: false,
    isStale: false,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: 0,
    // Additional missing properties for infinite queries
    isFetchPreviousPageError: false,
    fetchPreviousPage: vi.fn(),
    hasPreviousPage: false,
    isFetchingPreviousPage: false,
    isInitialLoading: false,
    pageParams: undefined,
    // Additional required properties for UseInfiniteQueryResult
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isEnabled: true,
    promise: Promise.resolve(),
    ...overrides,
  }) as unknown as UseInfiniteQueryResult<
    PolygonTickersResponse,
    AxiosError<ApiErrorResponse>
  >;

describe('Explore Page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const renderExplore = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Explore />
      </QueryClientProvider>
    );
  };

  test('renders search section and tickers grid', () => {
    vi.mocked(useInfiniteTickers).mockReturnValue(createInfiniteQueryMock());

    vi.mocked(getFlatTickers).mockReturnValue([]);

    renderExplore();

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('tickers-grid')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        isLoading: true,
        isSuccess: false,
        status: 'pending',
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue([]);

    renderExplore();

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('displays tickers when data is loaded', () => {
    const mockTickers = [
      { ticker: 'AAPL', name: 'Apple Inc.', market: 'stocks' },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', market: 'stocks' },
    ];

    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        data: { pages: [{ results: mockTickers }] },
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue(
      mockTickers as ReturnType<typeof getFlatTickers>
    );

    renderExplore();

    expect(screen.getByTestId('ticker-AAPL')).toBeInTheDocument();
    expect(screen.getByTestId('ticker-GOOGL')).toBeInTheDocument();
  });

  test('displays empty state when no results', () => {
    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        data: { pages: [] },
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue([]);

    renderExplore();

    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  test('displays error state when error occurs', () => {
    const mockError = { message: 'API Error occurred' };

    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        error: mockError,
        isError: true,
        isSuccess: false,
        status: 'error',
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue([]);

    renderExplore();

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('API Error occurred')).toBeInTheDocument();
  });

  test('handles search input changes', async () => {
    vi.mocked(useInfiniteTickers).mockReturnValue(createInfiniteQueryMock());

    vi.mocked(getFlatTickers).mockReturnValue([]);

    const user = userEvent.setup();
    renderExplore();

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'AAPL');

    expect(searchInput).toHaveValue('AAPL');
  });

  test('handles clear search', async () => {
    vi.mocked(useInfiniteTickers).mockReturnValue(createInfiniteQueryMock());

    vi.mocked(getFlatTickers).mockReturnValue([]);

    const user = userEvent.setup();
    renderExplore();

    const searchInput = screen.getByTestId('search-input');
    const clearButton = screen.getByTestId('clear-button');

    await user.type(searchInput, 'AAPL');
    expect(searchInput).toHaveValue('AAPL');

    await user.click(clearButton);
    expect(searchInput).toHaveValue('');
  });

  test('handles retry on error', async () => {
    const mockRefetch = vi.fn();
    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        error: { message: 'Network error' },
        isError: true,
        isSuccess: false,
        status: 'error',
        refetch: mockRefetch,
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue([]);

    const user = userEvent.setup();
    renderExplore();

    const retryButton = screen.getByTestId('retry-button');
    await user.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test('handles rate limit error message', () => {
    const mockError = { message: 'Rate limited. Retrying in 60 seconds.' };

    vi.mocked(useInfiniteTickers).mockReturnValue(
      createInfiniteQueryMock({
        error: mockError,
        isError: true,
        isSuccess: false,
        status: 'error',
      })
    );

    vi.mocked(getFlatTickers).mockReturnValue([]);

    renderExplore();

    expect(
      screen.getByText('Rate limited. Retrying in 60 seconds.')
    ).toBeInTheDocument();
  });
});
