import React from 'react';
import { Box, AppBar, Toolbar, keyframes } from '@mui/material';
import Logo from '../components/atoms/Logo';
import LanguageSwitcher from '../components/atoms/LanguageSwitcher';
import ThemeToggle from '../components/atoms/ThemeToggle';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo
            size="medium"
            variant="square"
            sx={{
              animation: `${float} 3s ease-in-out infinite`,
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ThemeToggle />
            <LanguageSwitcher
              variant="button"
              size="medium"
              showLabel={false}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Header;
