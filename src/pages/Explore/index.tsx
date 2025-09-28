import React from 'react';
import { Box } from '@mui/material';
import { useExplore } from './hook';
import SearchSection from './partials/SearchSection';
import TickersGrid from './partials/TickersGrid';

const Explore: React.FC = () => {
  const {
    tickers,
    isEmpty,
    searchQuery,
    handleSearch,
    handleClearSearch,
    isInitialLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    errorMessage,
    refetch,
    loadMoreRef,
  } = useExplore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <SearchSection
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={isInitialLoading}
      />

      <Box
        sx={{
          flex: 1,
          bgcolor: 'background.default',
          overflow: 'hidden',
          display: 'flex',
          minHeight: 0,
        }}
      >
        <TickersGrid
          tickers={tickers}
          isInitialLoading={isInitialLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          isEmpty={isEmpty}
          isError={isError}
          errorMessage={errorMessage}
          searchQuery={searchQuery}
          loadMoreRef={loadMoreRef}
          onRetry={refetch}
        />
      </Box>
    </Box>
  );
};

export default Explore;
