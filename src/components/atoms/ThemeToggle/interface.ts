import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

export interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  orientation?: ToggleButtonGroupProps['orientation'];
  showLabels?: boolean;
}
