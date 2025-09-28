import React from 'react';
import { useSplash } from './hook';
import SplashContent from './partials/SplashContent';

const Splash: React.FC = () => {
  useSplash();

  return <SplashContent />;
};

export default Splash;
