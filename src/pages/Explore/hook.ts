import { useState, useCallback, useMemo } from 'react';
import {
  useInfiniteTickers,
  getFlatTickers,
  type TickersSearchParams,
  type PolygonTicker,
} from '../../services/Explore';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export const useExplore = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Prepare search parameters
  const searchParams: TickersSearchParams = useMemo(
    () => ({
      market: 'stocks',
      active: true,
      order: 'asc',
      limit: 50,
      sort: 'ticker',
      ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
    }),
    [searchQuery]
  );

  // Fetch tickers with infinite scroll
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteTickers(searchParams);

  // Get flat array of tickers
  const tickers: PolygonTicker[] = useMemo(() => getFlatTickers(data), [data]);

  // Handle search input changes (debounced)
  const handleSearch = useCallback((query: string) => {
    // Save scroll position before search
    setScrollPosition(window.scrollY);
    setSearchQuery(query);
  }, []);

  // Handle search clear
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setScrollPosition(0);
  }, []);

  // Infinite scroll hook
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Error handling
  const errorMessage = useMemo(() => {
    if (!isError || !error) return null;

    const errorMsg =
      error.message || 'An error occurred while fetching tickers';

    if (errorMsg.includes('API key')) {
      return 'API key configuration error. Please check your environment settings.';
    }

    if (errorMsg.includes('Rate limited')) {
      return errorMsg; // Use the specific rate limit message
    }

    if (errorMsg.includes('network') || errorMsg.includes('timeout')) {
      return 'Network error. Please check your connection and try again.';
    }

    return errorMsg;
  }, [isError, error]);

  // Loading states
  const isInitialLoading = isLoading && !data;
  const hasResults = tickers.length > 0;
  const isEmpty = !isInitialLoading && !hasResults && !isError;

  return {
    // Data
    tickers,
    hasResults,
    isEmpty,

    // Search
    searchQuery,
    handleSearch,
    handleClearSearch,

    // Loading states
    isInitialLoading,
    isFetching,
    isFetchingNextPage,

    // Pagination
    hasNextPage,
    fetchNextPage,
    loadMoreRef,

    // Error handling
    isError,
    errorMessage,
    refetch,

    // Scroll management
    scrollPosition,
  };
};
