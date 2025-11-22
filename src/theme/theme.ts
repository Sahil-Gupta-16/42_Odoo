/**
 * Central theme configuration for StockMaster IMS
 * ERPNext-Inspired Black & White Theme
 * 
 * Purpose:
 * - Professional, minimal color palette
 * - High contrast for readability
 * - Clean, business-focused design
 * - Color only for status and minimal accents
 * 
 * Controls: colors, spacing, shadows, animations, and all visual design tokens
 * Supports both light and dark modes
 */

// Light Mode Theme (Default) - ERPNext Style
export const theme = {
  colors: {
    primary: {
      DEFAULT: '#111827',      // Near black for text
      light: '#374151',        // Dark gray
      dark: '#000000',         // Pure black
      foreground: '#FFFFFF'
    },
    secondary: {
      DEFAULT: '#6B7280',      // Medium gray
      light: '#9CA3AF',        // Light gray
      dark: '#4B5563',         // Darker gray
      foreground: '#111827'
    },
    accent: {
      DEFAULT: '#2563EB',      // Professional blue (minimal use)
      light: '#3B82F6',        // Lighter blue
      dark: '#1D4ED8',         // Darker blue
      foreground: '#FFFFFF'
    },
    success: '#10B981',        // Clean green
    warning: '#F59E0B',        // Amber
    error: '#EF4444',          // Red
    info: '#3B82F6',           // Blue
    background: {
      DEFAULT: '#FFFFFF',      // Pure white
      secondary: '#F9FAFB',    // Very light gray
      tertiary: '#F3F4F6',     // Light gray
      dark: '#111827'
    },
    surface: {
      DEFAULT: '#FFFFFF',      // Pure white surface
      glass: 'rgba(255, 255, 255, 0.98)',
      elevated: '#FFFFFF'
    },
    sidebar: {
      background: '#FFFFFF',   // White sidebar
      hover: '#F3F4F6',        // Light gray hover
      active: '#E5E7EB',       // Gray active
      border: '#E5E7EB'
    },
    kpi: {
      good: '#10B981',         // Green
      warning: '#F59E0B',      // Amber
      critical: '#EF4444',     // Red
      neutral: '#6B7280'       // Gray
    },
    text: {
      primary: '#111827',      // Almost black
      secondary: '#6B7280',    // Medium gray
      tertiary: '#9CA3AF',     // Light gray
      inverse: '#FFFFFF',
      muted: '#D1D5DB'
    },
    border: {
      DEFAULT: '#E5E7EB',      // Light gray border
      light: '#F3F4F6',        // Very light
      medium: '#D1D5DB',       // Medium gray
      dark: '#9CA3AF'
    }
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem'       // 48px
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
      tight: 1.25,
      normal: 1.6,
      relaxed: 1.75
    }
  },

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem'    // 96px
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px'
  },

  shadow: {
    none: 'none',
    soft: '0 1px 2px rgba(0, 0, 0, 0.05)',      // Very subtle
    medium: '0 1px 3px rgba(0, 0, 0, 0.1)',     // Subtle
    large: '0 4px 6px rgba(0, 0, 0, 0.1)',      // Light shadow
    glass: '0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    glow: '0 0 0 3px rgba(37, 99, 235, 0.1)',   // Minimal glow
    inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
  },

  motion: {
    duration: {
      instant: '100ms',
      fast: '150ms',      // Faster for snappier feel
      normal: '200ms',    // Reduced from 340ms
      slow: '300ms',      // Reduced from 600ms
      slower: '500ms'     // Reduced from 900ms
    },
    easing: {
      default: [0.4, 0, 0.2, 1],          // Standard easing
      spring: [0.16, 1, 0.3, 1],          // Spring
      bounce: [0.68, -0.55, 0.265, 1.55], // Bounce
      smooth: [0.25, 0.1, 0.25, 1]        // Smooth
    },
    transitions: {
      pageEnter: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      },
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 }
      },
      slideInRight: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      },
      scaleIn: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: { duration: 0.15 }
      }
    }
  },

  background: {
    type: 'none',           // Disabled for clean look
    shimmerIntensity: 0,    // No shimmer
    particleCount: 0,       // No particles
    particleSpeed: 0,
    reactiveness: 0,
    colors: [],
    enabled: false          // Completely disabled
  },

  rollingText: {
    speed: 30,
    gap: 48,
    pauseOnHover: true
  },

  components: {
    sidebar: {
      width: {
        expanded: '280px',
        collapsed: '80px'
      },
      transitionDuration: '200ms'   // Faster transition
    },
    card: {
      padding: '1.5rem',
      borderRadius: '0.5rem',       // 8px - cleaner
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
      borderRadius: '0.375rem',     // 6px - cleaner
      focusRingWidth: '2px',
      focusRingColor: 'rgba(37, 99, 235, 0.3)'
    },
    table: {
      rowHeight: '56px',
      headerHeight: '48px',
      stripedOpacity: 0.02          // Very subtle stripes
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

// Dark Mode Theme - Clean Dark
export const darkTheme = {
  colors: {
    primary: {
      DEFAULT: '#F9FAFB',      // Near white
      light: '#FFFFFF',        // Pure white
      dark: '#E5E7EB',         // Light gray
      foreground: '#111827'
    },
    secondary: {
      DEFAULT: '#9CA3AF',      // Medium gray
      light: '#D1D5DB',        // Light gray
      dark: '#6B7280',         // Darker gray
      foreground: '#F9FAFB'
    },
    accent: {
      DEFAULT: '#60A5FA',      // Lighter blue for dark mode
      light: '#93C5FD',        // Light blue
      dark: '#3B82F6',         // Medium blue
      foreground: '#111827'
    },
    success: '#34D399',        // Vibrant green
    warning: '#FBBF24',        // Bright amber
    error: '#F87171',          // Bright red
    info: '#60A5FA',           // Bright blue
    background: {
      DEFAULT: '#111827',      // Very dark
      secondary: '#1F2937',    // Dark gray
      tertiary: '#374151',     // Medium dark
      dark: '#000000'
    },
    surface: {
      DEFAULT: '#1F2937',      // Dark surface
      glass: 'rgba(31, 41, 55, 0.98)',
      elevated: '#374151'
    },
    sidebar: {
      background: '#1F2937',   // Dark sidebar
      hover: '#374151',        // Medium dark hover
      active: '#4B5563',       // Lighter active
      border: '#374151'
    },
    kpi: {
      good: '#34D399',         // Vibrant green
      warning: '#FBBF24',      // Bright amber
      critical: '#F87171',     // Bright red
      neutral: '#9CA3AF'       // Gray
    },
    text: {
      primary: '#F9FAFB',      // Near white
      secondary: '#D1D5DB',    // Light gray
      tertiary: '#9CA3AF',     // Medium gray
      inverse: '#111827',
      muted: '#6B7280'
    },
    border: {
      DEFAULT: '#374151',      // Dark gray border
      light: '#1F2937',        // Very dark
      medium: '#4B5563',       // Medium dark
      dark: '#6B7280'
    }
  },

  // Dark mode inherits same structure
  typography: theme.typography,
  spacing: theme.spacing,
  borderRadius: theme.borderRadius,
  
  shadow: {
    none: 'none',
    soft: '0 1px 2px rgba(0, 0, 0, 0.3)',
    medium: '0 1px 3px rgba(0, 0, 0, 0.4)',
    large: '0 4px 6px rgba(0, 0, 0, 0.5)',
    glass: '0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    glow: '0 0 0 3px rgba(96, 165, 250, 0.2)',
    inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
  },

  motion: theme.motion,
  
  background: {
    type: 'none',
    shimmerIntensity: 0,
    particleCount: 0,
    particleSpeed: 0,
    reactiveness: 0,
    colors: [],
    enabled: false
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

// Helper to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  // Handle rgba colors
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  // Handle rgb colors
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  }
  return color;
};

// Helper to determine if color is light or dark
export const isLightColor = (color: string): boolean => {
  // Simple luminance calculation
  if (!color.startsWith('#')) return false;
  
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

// Status color helpers
export const getStatusColor = (status: string, isDark = false): string => {
  const currentTheme = isDark ? darkTheme : theme;
  const statusMap: Record<string, string> = {
    'success': currentTheme.colors.success,
    'completed': currentTheme.colors.success,
    'active': currentTheme.colors.success,
    'in-stock': currentTheme.colors.success,
    
    'warning': currentTheme.colors.warning,
    'pending': currentTheme.colors.warning,
    'low-stock': currentTheme.colors.warning,
    
    'error': currentTheme.colors.error,
    'failed': currentTheme.colors.error,
    'out-of-stock': currentTheme.colors.error,
    'critical': currentTheme.colors.error,
    
    'info': currentTheme.colors.info,
    'dispatched': currentTheme.colors.info,
    
    'default': currentTheme.colors.secondary.DEFAULT,
  };
  
  return statusMap[status.toLowerCase()] || statusMap['default'];
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

// Preset configurations for common UI patterns
export const presets = {
  card: {
    default: {
      padding: spacing.lg,
      borderRadius: theme.borderRadius.lg,
      shadow: theme.shadow.soft,
      border: `1px solid ${colors.border.DEFAULT}`
    },
    elevated: {
      padding: spacing.lg,
      borderRadius: theme.borderRadius.lg,
      shadow: theme.shadow.medium,
      border: 'none'
    },
    flat: {
      padding: spacing.lg,
      borderRadius: theme.borderRadius.md,
      shadow: 'none',
      border: `1px solid ${colors.border.DEFAULT}`
    }
  },
  button: {
    primary: {
      background: colors.accent.DEFAULT,
      color: colors.accent.foreground,
      border: 'none',
      shadow: 'none'
    },
    secondary: {
      background: colors.secondary.light,
      color: colors.secondary.foreground,
      border: 'none',
      shadow: 'none'
    },
    outline: {
      background: 'transparent',
      color: colors.text.primary,
      border: `1px solid ${colors.border.DEFAULT}`,
      shadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: colors.text.primary,
      border: 'none',
      shadow: 'none'
    }
  }
};
