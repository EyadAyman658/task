import type { SxProps, Theme } from '@mui/material/styles';

export const searchSectionStyles = {
  container: {
    p: 3,
    borderBottom: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  } as SxProps<Theme>,

  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as SxProps<Theme>,

  title: {
    fontWeight: 'bold',
    color: 'primary.main',
  } as SxProps<Theme>,

  subtitle: {
    mb: 3,
  } as SxProps<Theme>,

  searchInput: {
    width: '100%',
    maxWidth: 600,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  } satisfies SxProps<Theme>,
};
