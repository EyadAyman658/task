import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSplash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/explore');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return {};
};
