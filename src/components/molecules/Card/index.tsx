import React from 'react';
import {
  Card as MuiCard,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Skeleton,
  Box,
} from '@mui/material';
import type { CardProps } from './interface';

const Card: React.FC<CardProps> = ({
  variant = 'elevation',
  elevation = 1,
  square = false,
  header,
  title,
  subtitle,
  avatar,
  image,
  imageAlt,
  imageHeight = 200,
  content,
  actions,
  footer,
  loading = false,
  clickable = false,
  disabled = false,
  children,
  className,
  sx,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && clickable && onClick) {
      onClick(event);
    }
  };

  const cardSx = {
    cursor: clickable && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'all 0.2s ease-in-out',
    '&:hover':
      clickable && !disabled
        ? {
            transform: 'translateY(-2px)',
            boxShadow: variant === 'elevation' ? 4 : 'none',
          }
        : {},
    ...sx,
  };

  if (loading) {
    return (
      <MuiCard
        variant={variant}
        elevation={variant === 'elevation' ? elevation : 0}
        square={square}
        className={className}
        sx={{ ...cardSx, height: '100%', minHeight: 240 }}
        {...props}
      >
        <CardHeader
          title={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'space-between',
              }}
            >
              <Skeleton variant="text" width="40%" height={32} />
              <Skeleton
                variant="rectangular"
                width={60}
                height={24}
                sx={{ borderRadius: '12px' }}
              />
            </Box>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="35%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="35%" height={20} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="35%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
            >
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton
                variant="rectangular"
                width={60}
                height={24}
                sx={{ borderRadius: '12px' }}
              />
            </Box>
          </Box>
        </CardContent>
      </MuiCard>
    );
  }

  return (
    <MuiCard
      variant={variant}
      elevation={variant === 'elevation' ? elevation : 0}
      square={square}
      className={className}
      sx={cardSx}
      onClick={handleClick}
      {...props}
    >
      {(header || title || subtitle || avatar) && (
        <CardHeader
          avatar={avatar}
          title={title}
          subheader={subtitle}
          {...(header && typeof header === 'object' ? header : {})}
        />
      )}

      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt}
        />
      )}

      {(content || children) && (
        <CardContent>
          {content}
          {children}
        </CardContent>
      )}

      {actions && <CardActions>{actions}</CardActions>}

      {footer && <Box sx={{ p: 2, pt: 0 }}>{footer}</Box>}
    </MuiCard>
  );
};

export default Card;
