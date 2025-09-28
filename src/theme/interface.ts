import type { Theme, ThemeOptions } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      z1: string;
      z4: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      z1?: string;
      z4?: string;
      z8?: string;
      z12?: string;
      z16?: string;
      z20?: string;
      z24?: string;
      primary?: string;
      secondary?: string;
      info?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
  }

  interface Palette {
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
    };
  }

  interface TypeBackground {
    neutral: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
}

// Custom component theme types
export interface CustomThemeOptions extends ThemeOptions {
  mode: PaletteMode;
}

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Custom shadows type
export interface CustomShadows {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

// Extended theme context type
export interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

// Component override types
export interface ComponentOverrides {
  MuiButton?: object;
  MuiCard?: object;
  MuiTextField?: object;
  MuiAppBar?: object;
  MuiDrawer?: object;
  MuiDialog?: object;
  MuiChip?: object;
  MuiAvatar?: object;
  MuiList?: object;
  MuiListItem?: object;
  MuiTable?: object;
  MuiPaper?: object;
}

// Typography extension
export interface ExtendedTypography {
  display1: React.CSSProperties;
  display2: React.CSSProperties;
  tiny: React.CSSProperties;
  code: React.CSSProperties;
  arabic: React.CSSProperties;
}

// Breakpoint keys
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color intensity
export type ColorIntensity =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700';

// Theme configuration
export interface ThemeConfig {
  fontFamily: string;
  borderRadius: number;
  outlinedBorder: boolean;
  navType: 'light' | 'dark';
  presetColor: 'default' | 'theme1' | 'theme2' | 'theme3';
  locale: string;
  rtlLayout: boolean;
}

export type { Theme, ThemeOptions };
