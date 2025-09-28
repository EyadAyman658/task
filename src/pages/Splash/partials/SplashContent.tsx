import React from 'react';
import { Box } from '@mui/material';
import { splashStyles } from '../styles';
import Text from '../../../components/atoms/Text';
const SplashContent: React.FC = () => {
  return (
    <Box sx={splashStyles.container}>
      <Box sx={splashStyles.logoWrapper}>
        <Text variant="h2" component="h1" sx={splashStyles.logoText}>
          NASDAQ
        </Text>
      </Box>

      <Text
        variant="body2"
        color="text.secondary"
        sx={splashStyles.developerName}
      >
        Developed by Eyad Ayman Gabr
      </Text>
    </Box>
  );
};

export default SplashContent;
