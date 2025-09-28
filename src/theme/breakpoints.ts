import type { BreakpointsOptions } from '@mui/material/styles';

// Breakpoints configuration for responsive design
export const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0, // Extra small devices (phones)
    sm: 600, // Small devices (portrait tablets and large phones)
    md: 900, // Medium devices (landscape tablets)
    lg: 1200, // Large devices (laptops/desktops)
    xl: 1536, // Extra large devices (large laptops and desktops)
  },
};

// Custom breakpoint values for specific use cases
export const customBreakpoints = {
  // Mobile-first breakpoints
  mobile: 0,
  mobileLarge: 480,
  tablet: 768,
  tabletLarge: 1024,
  desktop: 1200,
  desktopLarge: 1440,
  desktopXL: 1920,

  // Common device sizes
  devices: {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
  },

  // Container max widths
  containers: {
    xs: 444,
    sm: 692,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// Media query helpers
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const mediaQueries = {
  up: (key: BreakpointKey) =>
    `@media (min-width:${breakpoints.values?.[key] || 0}px)`,
  down: (key: BreakpointKey) => {
    const value = breakpoints.values?.[key] || 0;
    return `@media (max-width:${value - 0.05}px)`;
  },
  between: (start: BreakpointKey, end: BreakpointKey) => {
    const startValue = breakpoints.values?.[start] || 0;
    const endValue = breakpoints.values?.[end] || 0;
    return `@media (min-width:${startValue}px) and (max-width:${endValue - 0.05}px)`;
  },
  only: (key: BreakpointKey) => {
    if (!breakpoints.values) return '';
    const keys: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const index = keys.indexOf(key);

    if (index === 0) {
      return mediaQueries.down(keys[1]);
    }
    if (index === keys.length - 1) {
      return mediaQueries.up(key);
    }

    return mediaQueries.between(key, keys[index + 1]);
  },
};
