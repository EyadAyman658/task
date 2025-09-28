import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import type { ButtonProps } from './interface';

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
