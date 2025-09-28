import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from '../pages/Splash';
import Explore from '../pages/Explore';
import Header from '../layout/Header';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      <Route
        path="/explore"
        element={
          <Header>
            <Explore />
          </Header>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
