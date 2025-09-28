import type { SxProps, Theme } from '@mui/material/styles';

export const tickerDetailsModalStyles = {
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,

  tickerSymbol: {
    fontWeight: 'bold',
    color: 'primary.main',
    fontFamily: 'monospace',
  } as SxProps<Theme>,

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  } as SxProps<Theme>,

  sectionTitle: {
    mb: 1,
    fontWeight: 600,
  } as SxProps<Theme>,

  tradingSectionTitle: {
    mb: 2,
    fontWeight: 600,
  } as SxProps<Theme>,

  marketSectionTitle: {
    mb: 2,
    fontWeight: 600,
  } as SxProps<Theme>,

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
  } as SxProps<Theme>,

  fieldLabel: {
    mb: 0.5,
  } as SxProps<Theme>,

  fieldValue: {
    fontWeight: 500,
  } as SxProps<Theme>,
};
