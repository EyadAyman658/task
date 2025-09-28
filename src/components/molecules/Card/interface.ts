import type { CardProps as MuiCardProps } from '@mui/material/Card';

export interface CardProps extends Omit<MuiCardProps, 'children' | 'content'> {
  variant?: 'elevation' | 'outlined';
  elevation?: number;
  square?: boolean;
  header?: React.ReactNode;
  title?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageHeight?: number | string;
  content?: string | React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  sx?: object;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
