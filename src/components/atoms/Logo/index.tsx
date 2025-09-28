import React, { useState } from 'react';
import { Avatar, Box, Skeleton } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import type { LogoProps } from './interface';

const Logo: React.FC<LogoProps> = ({
  src,
  alt = 'Logo',
  size = 'medium',
  variant = 'square',
  clickable = false,
  loading = false,
  fallbackIcon = <ImageIcon />,
  className,
  sx,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  const getSizeValue = (size: LogoProps['size']): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 80;
      case 'medium':
      default:
        return 48;
    }
  };

  const sizeValue = getSizeValue(size);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (loading) {
    return (
      <Skeleton
        variant={variant === 'circular' ? 'circular' : 'rectangular'}
        width={sizeValue}
        height={sizeValue}
        className={className}
        sx={{
          borderRadius: variant === 'rounded' ? 1 : 0,
          ...sx,
        }}
      />
    );
  }

  if (!src || imageError) {
    return (
      <Avatar
        variant={variant}
        className={className}
        sx={{
          width: sizeValue,
          height: sizeValue,
          cursor: clickable ? 'pointer' : 'default',
          bgcolor: 'grey.200',
          color: 'grey.600',
          ...sx,
        }}
        onClick={clickable ? onClick : undefined}
      >
        {fallbackIcon}
      </Avatar>
    );
  }

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        display: 'inline-block',
        ...sx,
      }}
    >
      {imageLoading && (
        <Skeleton
          variant={variant === 'circular' ? 'circular' : 'rectangular'}
          width={sizeValue}
          height={sizeValue}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: variant === 'rounded' ? 1 : 0,
          }}
        />
      )}
      <Avatar
        src={src}
        alt={alt}
        variant={variant}
        sx={{
          width: sizeValue,
          height: sizeValue,
          cursor: clickable ? 'pointer' : 'default',
          opacity: imageLoading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={clickable ? onClick : undefined}
      />
    </Box>
  );
};

export default Logo;
