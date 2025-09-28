import { createTheme, alpha } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { colors } from './colors';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import type { CustomThemeOptions, CustomShadows } from './interface';

import './interface';

const createCustomShadows = (mode: PaletteMode): CustomShadows => {
  const shadowColor = mode === 'light' ? colors.grey[500] : colors.common.black;

  return {
    z1: `0 1px 2px 0 ${alpha(shadowColor, 0.16)}`,
    z4: `0 4px 8px 0 ${alpha(shadowColor, 0.16)}`,
    z8: `0 8px 16px 0 ${alpha(shadowColor, 0.16)}`,
    z12: `0 12px 24px -4px ${alpha(shadowColor, 0.16)}`,
    z16: `0 16px 32px -4px ${alpha(shadowColor, 0.16)}`,
    z20: `0 20px 40px -4px ${alpha(shadowColor, 0.16)}`,
    z24: `0 24px 48px 0 ${alpha(shadowColor, 0.16)}`,
    primary: `0 8px 16px 0 ${alpha(colors.primary[500], 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(colors.secondary[500], 0.24)}`,
    info: `0 8px 16px 0 ${alpha(colors.info[500], 0.24)}`,
    success: `0 8px 16px 0 ${alpha(colors.success[500], 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(colors.warning[500], 0.24)}`,
    error: `0 8px 16px 0 ${alpha(colors.error[500], 0.24)}`,
  };
};

export const createLightTheme = (): CustomThemeOptions => {
  return {
    mode: 'light',
    palette: {
      mode: 'light',
      primary: {
        lighter: colors.primary[50],
        light: colors.primary[300],
        main: colors.primary[500],
        dark: colors.primary[700],
        darker: colors.primary[900],
        contrastText: colors.common.white,
      },
      secondary: {
        lighter: colors.secondary[50],
        light: colors.secondary[300],
        main: colors.secondary[500],
        dark: colors.secondary[700],
        darker: colors.secondary[900],
        contrastText: colors.common.white,
      },
      error: {
        lighter: colors.error[50],
        light: colors.error[300],
        main: colors.error[500],
        dark: colors.error[700],
        darker: colors.error[900],
        contrastText: colors.common.white,
      },
      warning: {
        lighter: colors.warning[50],
        light: colors.warning[300],
        main: colors.warning[500],
        dark: colors.warning[700],
        darker: colors.warning[900],
        contrastText: colors.grey[900],
      },
      info: {
        lighter: colors.info[50],
        light: colors.info[300],
        main: colors.info[500],
        dark: colors.info[700],
        darker: colors.info[900],
        contrastText: colors.common.white,
      },
      success: {
        lighter: colors.success[50],
        light: colors.success[300],
        main: colors.success[500],
        dark: colors.success[700],
        darker: colors.success[900],
        contrastText: colors.common.white,
      },
      grey: colors.grey,
      neutral: {
        50: colors.grey[50],
        100: colors.grey[100],
        200: colors.grey[200],
        300: colors.grey[300],
        400: colors.grey[400],
        500: colors.grey[500],
        600: colors.grey[600],
        700: colors.grey[700],
        800: colors.grey[800],
        900: colors.grey[900],
      },
      text: {
        primary: colors.text.light.primary,
        secondary: colors.text.light.secondary,
        disabled: colors.text.light.disabled,
      },
      background: {
        default: colors.background.light.default,
        paper: colors.background.light.paper,
        neutral: colors.background.light.surface,
      },
      divider: colors.divider.light,
      action: {
        active: colors.action.light.active,
        hover: colors.action.light.hover,
        selected: colors.action.light.selected,
        disabled: colors.action.light.disabled,
        disabledBackground: colors.action.light.disabledBackground,
        focus: colors.action.light.focus,
      },
    },
    typography,
    breakpoints,
    customShadows: createCustomShadows('light'),
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: createCustomShadows('light').z1,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: createCustomShadows('light').z4,
          },
        },
      },
    },
  };
};

export const createDarkTheme = (): CustomThemeOptions => {
  return {
    mode: 'dark',
    palette: {
      mode: 'dark',
      primary: {
        lighter: colors.primary[50],
        light: colors.primary[300],
        main: colors.primary[400],
        dark: colors.primary[600],
        darker: colors.primary[900],
        contrastText: colors.common.white,
      },
      secondary: {
        lighter: colors.secondary[50],
        light: colors.secondary[300],
        main: colors.secondary[400],
        dark: colors.secondary[600],
        darker: colors.secondary[900],
        contrastText: colors.common.white,
      },
      error: {
        lighter: colors.error[50],
        light: colors.error[300],
        main: colors.error[400],
        dark: colors.error[600],
        darker: colors.error[900],
        contrastText: colors.common.white,
      },
      warning: {
        lighter: colors.warning[50],
        light: colors.warning[300],
        main: colors.warning[400],
        dark: colors.warning[600],
        darker: colors.warning[900],
        contrastText: colors.grey[900],
      },
      info: {
        lighter: colors.info[50],
        light: colors.info[300],
        main: colors.info[400],
        dark: colors.info[600],
        darker: colors.info[900],
        contrastText: colors.common.white,
      },
      success: {
        lighter: colors.success[50],
        light: colors.success[300],
        main: colors.success[400],
        dark: colors.success[600],
        darker: colors.success[900],
        contrastText: colors.common.white,
      },
      grey: colors.grey,
      neutral: {
        50: colors.grey[50],
        100: colors.grey[100],
        200: colors.grey[200],
        300: colors.grey[300],
        400: colors.grey[400],
        500: colors.grey[500],
        600: colors.grey[600],
        700: colors.grey[700],
        800: colors.grey[800],
        900: colors.grey[900],
      },
      text: {
        primary: colors.text.dark.primary,
        secondary: colors.text.dark.secondary,
        disabled: colors.text.dark.disabled,
      },
      background: {
        default: colors.background.dark.default,
        paper: colors.background.dark.paper,
        neutral: colors.background.dark.surface,
      },
      divider: colors.divider.dark,
      action: {
        active: colors.action.dark.active,
        hover: colors.action.dark.hover,
        selected: colors.action.dark.selected,
        disabled: colors.action.dark.disabled,
        disabledBackground: colors.action.dark.disabledBackground,
        focus: colors.action.dark.focus,
      },
    },
    typography,
    breakpoints,
    customShadows: createCustomShadows('dark'),
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: createCustomShadows('dark').z1,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: createCustomShadows('dark').z4,
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode = 'light') => {
  const themeConfig = mode === 'light' ? createLightTheme() : createDarkTheme();
  return createTheme(themeConfig);
};

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

export { colors } from './colors';
export { typography, customTypography } from './typography';
export { breakpoints, customBreakpoints, mediaQueries } from './breakpoints';
export type {
  CustomThemeOptions,
  ThemeMode,
  CustomShadows,
  ThemeContextType,
  ComponentOverrides,
  ExtendedTypography,
  BreakpointKey,
  ColorIntensity,
  ThemeConfig,
} from './interface';

export default createAppTheme;
