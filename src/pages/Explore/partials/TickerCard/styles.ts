import type { SxProps, Theme } from '@mui/material/styles';

export const tickerCardStyles = {
  card: {
    width: 400,
    height: '100%',
    minHeight: 160,
    maxWidth: { xs: '100%', sm: 400 },
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: 2,
    },
  } satisfies SxProps<Theme>,

  tickerSymbol: {
    fontWeight: 'bold',
    color: 'primary.main',
    fontFamily: 'monospace',
    fontSize: '1.1rem',
  } satisfies SxProps<Theme>,

  companyName: {
    fontWeight: 500,
    lineHeight: 1.4,
    textAlign: 'center',
    padding: 1,
  } satisfies SxProps<Theme>,
};
