// src/theme/theme.ts
/**
 * Central theme configuration for StockMaster IMS
 * Controls colors, spacing, shadows, animations, and all visual design tokens
 * Supports both light and dark modes
 */

// Light Mode Theme (Default)
export const theme = {
  colors: {
    primary: {
      DEFAULT: '#222A35',
      light: '#3A4556',
      dark: '#1A2029',
      foreground: '#FFFFFF'
    },
    secondary: {
      DEFAULT: '#ADB5BD',
      light: '#CED4DA',
      dark: '#6C757D',
      foreground: '#222A35'
    },
    accent: {
      DEFAULT: '#30B8F2',
      light: '#5DCBF7',
      dark: '#1B96D1',
      foreground: '#FFFFFF'
    },
    success: '#39D98A',
    warning: '#FFBC42',
    error: '#FF5F56',
    info: '#5DA9E9',
    background: {
      DEFAULT: '#FAFBFC',
      secondary: '#F6F8FA',
      tertiary: '#EEECEC',
      dark: '#1A1D23'
    },
    surface: {
      DEFAULT: 'rgba(255, 255, 255, 0.95)',
      glass: 'rgba(255, 255, 255, 0.75)',
      elevated: '#FFFFFF'
    },
    sidebar: {
      background: '#F6F8FA',
      hover: 'rgba(48, 184, 242, 0.08)',
      active: 'rgba(48, 184, 242, 0.12)',
      border: 'rgba(173, 181, 189, 0.15)'
    },
    kpi: {
      good: '#39D98A',
      warning: '#FFBC42',
      critical: '#ED254E',
      neutral: '#ADB5BD'
    },
    text: {
      primary: '#222A35',
      secondary: '#6C757D',
      tertiary: '#ADB5BD',
      inverse: '#FFFFFF',
      muted: '#CED4DA'
    },
    border: {
      DEFAULT: 'rgba(173, 181, 189, 0.2)',
      light: 'rgba(173, 181, 189, 0.1)',
      medium: 'rgba(173, 181, 189, 0.3)',
      dark: 'rgba(34, 42, 53, 0.15)'
    }
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },

  borderRadius: {
    none: '0',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px'
  },

  shadow: {
    none: 'none',
    soft: '0 2px 8px rgba(34, 42, 53, 0.06)',
    medium: '0 4px 16px rgba(34, 42, 53, 0.08)',
    large: '0 8px 24px rgba(34, 42, 53, 0.10)',
    glass: '0 4px 24px rgba(34, 42, 53, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    glow: '0 0 24px rgba(48, 184, 242, 0.25)',
    inner: 'inset 0 2px 4px rgba(34, 42, 53, 0.06)'
  },

  motion: {
    duration: {
      instant: '100ms',
      fast: '180ms',
      normal: '340ms',
      slow: '600ms',
      slower: '900ms'
    },
    easing: {
      default: [0.22, 1, 0.36, 1],
      spring: [0.16, 1, 0.3, 1],
      bounce: [0.68, -0.55, 0.265, 1.55],
      smooth: [0.4, 0, 0.2, 1]
    },
    transitions: {
      pageEnter: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
      },
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18 }
      },
      slideInRight: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
      },
      scaleIn: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: { duration: 0.18 }
      }
    }
  },

  background: {
    type: 'particles',
    shimmerIntensity: 0.35,
    particleCount: 50,
    particleSpeed: 0.5,
    reactiveness: 0.4,
    colors: ['#30B8F2', '#5DCBF7', '#ADB5BD'],
    enabled: true
  },

  rollingText: {
    speed: 32,
    gap: 48,
    pauseOnHover: true
  },

  components: {
    sidebar: {
      width: {
        expanded: '280px',
        collapsed: '80px'
      },
      transitionDuration: '340ms'
    },
    card: {
      padding: '1.5rem',
      borderRadius: '12px',
      shadow: 'soft'
    },
    button: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px'
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem'
      }
    },
    input: {
      height: '44px',
      borderRadius: '8px',
      focusRingWidth: '2px',
      focusRingColor: 'rgba(48, 184, 242, 0.3)'
    },
    table: {
      rowHeight: '56px',
      headerHeight: '48px',
      stripedOpacity: 0.03
    }
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px'
  },

  zIndex: {
    background: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050
  }
};

// Dark Mode Theme
export const darkTheme = {
  colors: {
    primary: {
      DEFAULT: '#E8EAED',
      light: '#F8F9FA',
      dark: '#CED4DA',
      foreground: '#1A1D23'
    },
    secondary: {
      DEFAULT: '#6C757D',
      light: '#ADB5BD',
      dark: '#495057',
      foreground: '#E8EAED'
    },
    accent: {
      DEFAULT: '#5DCBF7',
      light: '#8DDBF9',
      dark: '#30B8F2',
      foreground: '#1A1D23'
    },
    success: '#4AE99E',
    warning: '#FFD666',
    error: '#FF7B72',
    info: '#79C0FF',
    background: {
      DEFAULT: '#0D1117',
      secondary: '#161B22',
      tertiary: '#1C2128',
      dark: '#010409'
    },
    surface: {
      DEFAULT: 'rgba(22, 27, 34, 0.95)',
      glass: 'rgba(22, 27, 34, 0.75)',
      elevated: '#1C2128'
    },
    sidebar: {
      background: '#161B22',
      hover: 'rgba(93, 203, 247, 0.12)',
      active: 'rgba(93, 203, 247, 0.18)',
      border: 'rgba(173, 181, 189, 0.1)'
    },
    kpi: {
      good: '#4AE99E',
      warning: '#FFD666',
      critical: '#FF7B72',
      neutral: '#6C757D'
    },
    text: {
      primary: '#E8EAED',
      secondary: '#ADB5BD',
      tertiary: '#6C757D',
      inverse: '#1A1D23',
      muted: '#495057'
    },
    border: {
      DEFAULT: 'rgba(173, 181, 189, 0.15)',
      light: 'rgba(173, 181, 189, 0.08)',
      medium: 'rgba(173, 181, 189, 0.25)',
      dark: 'rgba(232, 234, 237, 0.1)'
    }
  },

  // Dark mode uses same structure for other properties
  typography: theme.typography,
  spacing: theme.spacing,
  borderRadius: theme.borderRadius,
  
  shadow: {
    none: 'none',
    soft: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.4)',
    large: '0 8px 24px rgba(0, 0, 0, 0.5)',
    glass: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    glow: '0 0 24px rgba(93, 203, 247, 0.3)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
  },

  motion: theme.motion,
  
  background: {
    ...theme.background,
    shimmerIntensity: 0.25,
    colors: ['#5DCBF7', '#30B8F2', '#6C757D']
  },

  rollingText: theme.rollingText,
  components: theme.components,
  breakpoints: theme.breakpoints,
  zIndex: theme.zIndex
};

// Type exports
export type Theme = typeof theme;
export type DarkTheme = typeof darkTheme;

// Helper to get theme value by path
export const getThemeValue = (path: string, isDark = false): any => {
  const currentTheme = isDark ? darkTheme : theme;
  return path.split('.').reduce((obj, key) => obj?.[key], currentTheme as any);
};

// Export individual sections
export const colors = theme.colors;
export const darkColors = darkTheme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
export const motion = theme.motion;
export const shadows = theme.shadow;
export const darkShadows = darkTheme.shadow;

// Export light theme as default
export { theme as lightTheme };
