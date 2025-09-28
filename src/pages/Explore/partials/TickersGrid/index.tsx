import React from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import TickerCard from '../TickerCard';
import { useI18n } from '../../../../hooks/useI18n';
import { tickersGridStyles } from './styles';
import type { PolygonTicker } from '../../../../services/Explore';
import Button from '../../../../components/atoms/Button';

interface TickersGridProps {
  tickers: PolygonTicker[];
  isInitialLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isEmpty: boolean;
  isError: boolean;
  errorMessage: string | null;
  searchQuery: string;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onRetry: () => void;
}

const TickersGrid: React.FC<TickersGridProps> = ({
  tickers,
  isInitialLoading,
  isFetchingNextPage,
  hasNextPage,
  isEmpty,
  isError,
  errorMessage,
  searchQuery,
  loadMoreRef,
  onRetry,
}) => {
  const { t } = useI18n('explore');
  // Loading skeleton
  if (isInitialLoading) {
    return (
      <Box sx={tickersGridStyles.loadingContainer}>
        <Grid container spacing={3}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <TickerCard ticker={{} as PolygonTicker} loading />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Error state
  if (isError && errorMessage) {
    return (
      <Box sx={tickersGridStyles.errorContainer}>
        <Alert
          severity="error"
          action={
            <Button
              color="primary"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              {t('actions.retry')}
            </Button>
          }
          sx={tickersGridStyles.errorAlert}
        >
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  // Empty state
  if (isEmpty) {
    const hasSearchQuery = searchQuery.trim().length > 0;

    return (
      <Box sx={tickersGridStyles.mainContainer}>
        <Box sx={tickersGridStyles.emptyContainer}>
          <Box sx={tickersGridStyles.emptyContent}>
            <Typography variant="h6" color="text.secondary">
              {hasSearchQuery
                ? `${t('search.noResults')} "${searchQuery}"`
                : t('search.noDataAvailable')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hasSearchQuery
                ? t('search.noResultsDescription')
                : t('search.noDataDescription')}
            </Typography>
            {!hasSearchQuery && (
              <Button
                variant="outlined"
                onClick={onRetry}
                startIcon={<RefreshIcon />}
                sx={tickersGridStyles.emptyRetryButton}
              >
                {t('actions.retry')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  // Results grid
  return (
    <Box sx={tickersGridStyles.mainContainer}>
      {/* Results count */}
      {searchQuery && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={tickersGridStyles.resultsCount}
        >
          {tickers.length} {t('search.resultsFound')} "{searchQuery}"
        </Typography>
      )}

      {/* Scrollable tickers container */}
      <Box sx={tickersGridStyles.scrollableContainer}>
        <Grid container spacing={3} sx={tickersGridStyles.gridContainer}>
          {tickers.map(ticker => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={ticker.ticker}
              sx={tickersGridStyles.gridItem}
            >
              <TickerCard ticker={ticker} />
            </Grid>
          ))}
        </Grid>

        {/* Infinite scroll loader */}
        <Box ref={loadMoreRef} sx={tickersGridStyles.infiniteScrollLoader}>
          {isFetchingNextPage && (
            <Box sx={tickersGridStyles.loadingMoreContainer}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="text.secondary">
                {t('actions.loadingMore')}
              </Typography>
            </Box>
          )}
          {!hasNextPage && tickers.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              {t('actions.endOfResults')}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TickersGrid;
