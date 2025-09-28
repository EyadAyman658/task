import type { SxProps, Theme } from '@mui/material/styles';
import { keyframes } from '@mui/material';

export const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const splashStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    bgcolor: 'background.default',
    position: 'relative',
    px: 2,
    overflow: 'hidden',
  } as SxProps<Theme>,

  logoWrapper: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${fadeInScale} 0.8s ease-out, ${float} 3s ease-in-out infinite 0.8s`,
  } as SxProps<Theme>,

  logoText: {
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
    textAlign: 'center',
    letterSpacing: 2,
  } as SxProps<Theme>,

  developerName: {
    marginBottom: 10,
    transform: 'translateX(-50%)',
    textAlign: 'center',
    animation: `${fadeInScale} 0.8s ease-out 0.4s both`,
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,
};
