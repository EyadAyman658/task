import type { SxProps, Theme } from '@mui/material/styles';

export const tickersGridStyles = {
  loadingContainer: {
    p: 3,
    width: '100vw',
  } as SxProps<Theme>,

  errorContainer: {
    p: 3,
    width: '100vw',
  } as SxProps<Theme>,

  errorAlert: {
    mb: 2,
  } as SxProps<Theme>,

  emptyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    p: 3,
    minHeight: 0,
  } as SxProps<Theme>,

  emptyContent: {
    maxWidth: 420,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    margin: '0 auto',
  } as SxProps<Theme>,

  emptyRetryButton: {
    mt: 2,
  } as SxProps<Theme>,

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
    width: '100vw',
    minHeight: 0,
  } as SxProps<Theme>,

  resultsCount: {
    mb: 2,
    textAlign: 'center',
    px: 3,
    pt: 3,
  } as SxProps<Theme>,

  scrollableContainer: {
    flex: 1,
    overflowY: 'auto',
    px: { xs: 2, md: 3 },
    pb: 3,
    minHeight: 0,
  } as SxProps<Theme>,

  gridContainer: {
    width: '100%',
    mt: { xs: 2, md: 4 },
    justifyContent: 'center',
    '& .MuiGrid-item': {
      display: 'flex',
      width: { xs: '100%', sm: 'auto' },
    },
  } as SxProps<Theme>,

  gridItem: {
    display: 'flex',
    alignItems: 'stretch',
    width: { xs: '100%', sm: 'auto' },
  } as SxProps<Theme>,

  infiniteScrollLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 3,
    mb: 2,
    minHeight: 60,
  } as SxProps<Theme>,

  loadingMoreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,
};
