import React from 'react';
import { ToggleButtonGroup, ToggleButton, Tooltip, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ComputerIcon from '@mui/icons-material/Computer';
import { useThemeStore, type ThemePreference } from '../../../store/theme';
import type { ThemeToggleProps } from './interface';

const OPTION_ICONS = {
  light: <LightModeIcon fontSize="small" />,
  dark: <DarkModeIcon fontSize="small" />,
  system: <ComputerIcon fontSize="small" />,
} as const;

const OPTION_LABELS: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'small',
  orientation = 'horizontal',
  showLabels = false,
}) => {
  const preference = useThemeStore(state => state.preference);
  const systemTheme = useThemeStore(state => state.systemTheme);
  const setTheme = useThemeStore(state => state.setTheme);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: ThemePreference | null
  ) => {
    if (!value || value === preference) {
      return;
    }
    setTheme(value);
  };

  const renderLabel = (option: ThemePreference) => {
    if (!showLabels) return null;

    if (option === 'system') {
      return `${OPTION_LABELS.system} (${systemTheme === 'dark' ? 'Dark' : 'Light'})`;
    }

    return OPTION_LABELS[option];
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={preference}
      size={size}
      orientation={orientation}
      onChange={handleChange}
      aria-label="Theme selection"
      color="standard"
      sx={{ borderRadius: 999, overflow: 'hidden' }}
    >
      {(Object.keys(OPTION_LABELS) as ThemePreference[]).map(option => {
        const label =
          option === 'system'
            ? `${OPTION_LABELS.system} (${systemTheme === 'dark' ? 'Dark' : 'Light'})`
            : OPTION_LABELS[option];

        return (
          <Tooltip
            key={option}
            title={label}
            arrow
            disableHoverListener={showLabels}
          >
            <ToggleButton
              value={option}
              aria-label={`${label} theme`}
              sx={{
                gap: showLabels ? 1 : 0,
                px: showLabels ? 1.5 : 1,
                display: 'flex',
                alignItems: 'center',
              }}
              data-testid={`theme-toggle-${option}`}
            >
              {OPTION_ICONS[option]}
              {showLabels && (
                <Box
                  component="span"
                  sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                >
                  {renderLabel(option)}
                </Box>
              )}
            </ToggleButton>
          </Tooltip>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
