import type { TextFieldProps } from '@mui/material/TextField';

export interface InputProps extends Omit<TextFieldProps, 'color'> {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  InputProps?: object;
  inputProps?: object;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  sx?: object;
  // Search-specific props
  search?: boolean;
  debounceDelay?: number;
  onDebouncedChange?: (value: string) => void;
  searchIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}
