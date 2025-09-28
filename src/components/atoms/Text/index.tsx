import React from 'react';
import { Typography } from '@mui/material';
import type { TextProps } from './interface';

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  component,
  color = 'text.primary',
  textAlign = 'left',
  gutterBottom = false,
  noWrap = false,
  className,
  sx,
  ...props
}) => {
  const typographyProps = {
    variant,
    color,
    gutterBottom,
    noWrap,
    className,
    sx: {
      textAlign,
      ...sx,
    },
    ...props,
  };

  if (component) {
    return (
      <Typography component={component} {...typographyProps}>
        {children}
      </Typography>
    );
  }

  return <Typography {...typographyProps}>{children}</Typography>;
};

export default Text;
