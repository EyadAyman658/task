import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import type { LoaderProps } from './interface';

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  thickness = 3.6,
  variant = 'indeterminate',
  value,
  disableShrink = false,
  className,
  sx,
  ...props
}) => {
  const getSizeValue = (size: LoaderProps['size']): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 60;
      case 'medium':
      default:
        return 40;
    }
  };

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={sx}
    >
      <CircularProgress
        size={getSizeValue(size)}
        color={color}
        thickness={thickness}
        variant={variant}
        value={value}
        disableShrink={disableShrink}
        {...props}
      />
    </Box>
  );
};

export default Loader;
