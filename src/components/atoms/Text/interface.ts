import type { TypographyProps } from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode, ElementType } from 'react';

export interface TextProps
  extends Omit<TypographyProps, 'color' | 'align' | 'paragraph'> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
  component?: ElementType;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'text.primary'
    | 'text.secondary'
    | 'text.disabled'
    | string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}
