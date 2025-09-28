import type { CircularProgressProps } from '@mui/material/CircularProgress';

export interface LoaderProps extends Omit<CircularProgressProps, 'color'> {
  size?: number | 'small' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'inherit';
  thickness?: number;
  variant?: 'determinate' | 'indeterminate';
  value?: number;
  disableShrink?: boolean;
  className?: string;
  sx?: object;
}
