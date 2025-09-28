export interface LogoProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  variant?: 'square' | 'rounded' | 'circular';
  clickable?: boolean;
  loading?: boolean;
  fallbackIcon?: React.ReactNode;
  className?: string;
  sx?: object;
  onClick?: () => void;
}
