// src/theme/theme.ts
/**
 * Central theme configuration for StockMaster IMS
 * Controls colors, spacing, shadows, animations, and all visual design tokens
 * Easy to customize - change values here to update entire app theme
 */

export const theme = {
  // Color Palette - Soft, modern, professional
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#222A35',
      light: '#3A4556',
      dark: '#1A2029',
      foreground: '#FFFFFF'
    },
    
    // Secondary/Neutral colors
    secondary: {
      DEFAULT: '#ADB5BD',
      light: '#CED4DA',
      dark: '#6C757D',
      foreground: '#222A35'
    },
    
    // Accent colors for highlights and interactive elements
    accent: {
      DEFAULT: '#30B8F2',
      light: '#5DCBF7',
      dark: '#1B96D1',
      foreground: '#FFFFFF'
    },
    
    // Status colors
    success: '#39D98A',
    warning: '#FFBC42',
    error: '#FF5F56',
    info: '#5DA9E9',
    
    // Surface and background colors
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
    
    // Sidebar specific
    sidebar: {
      background: '#F6F8FA',
      hover: 'rgba(48, 184, 242, 0.08)',
      active: 'rgba(48, 184, 242, 0.12)',
      border: 'rgba(173, 181, 189, 0.15)'
    },
    
    // KPI color coding
    kpi: {
      good: '#39D98A',
      warning: '#FFBC42',
      critical: '#ED254E',
      neutral: '#ADB5BD'
    },
    
    // Text colors
    text: {
      primary: '#222A35',
      secondary: '#6C757D',
      tertiary: '#ADB5BD',
      inverse: '#FFFFFF',
      muted: '#CED4DA'
    },
    
    // Border colors
    border: {
      DEFAULT: 'rgba(173, 181, 189, 0.2)',
      light: 'rgba(173, 181, 189, 0.1)',
      medium: 'rgba(173, 181, 189, 0.3)',
      dark: 'rgba(34, 42, 53, 0.15)'
    }
  },

  // Typography settings
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
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
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // Spacing scale
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem'     // 96px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px'
  },

  // Shadows - soft, subtle, professional
  shadow: {
    none: 'none',
    soft: '0 2px 8px rgba(34, 42, 53, 0.06)',
    medium: '0 4px 16px rgba(34, 42, 53, 0.08)',
    large: '0 8px 24px rgba(34, 42, 53, 0.10)',
    glass: '0 4px 24px rgba(34, 42, 53, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    glow: '0 0 24px rgba(48, 184, 242, 0.25)',
    inner: 'inset 0 2px 4px rgba(34, 42, 53, 0.06)'
  },

  // Animation and motion settings
  motion: {
    // Duration presets
    duration: {
      instant: '100ms',
      fast: '180ms',
      normal: '340ms',
      slow: '600ms',
      slower: '900ms'
    },
    
    // Easing curves
    easing: {
      default: [0.22, 1, 0.36, 1],      // easeOutCubic
      spring: [0.16, 1, 0.3, 1],        // Spring-like
      bounce: [0.68, -0.55, 0.265, 1.55], // Slight overshoot
      smooth: [0.4, 0, 0.2, 1]          // Standard material
    },
    
    // Transition presets for common animations
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

  // Dynamic background settings
  background: {
    type: 'particles',  // 'particles' | 'gradient' | 'noise'
    shimmerIntensity: 0.35,  // 0-1
    particleCount: 50,
    particleSpeed: 0.5,
    reactiveness: 0.4,  // Mouse reactivity 0-1
    colors: ['#30B8F2', '#5DCBF7', '#ADB5BD'],
    enabled: true
  },

  // Rolling text settings
  rollingText: {
    speed: 32,  // pixels per second
    gap: 48,    // gap between repeated text in pixels
    pauseOnHover: true
  },

  // Component-specific overrides
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

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px'
  },

  // Z-index scale
  zIndex: {
    background: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050
  }
}

// Type export for TypeScript autocomplete
export type Theme = typeof theme

// Helper function to get nested theme values
export const getThemeValue = (path: string): any => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme as any)
}

// Export individual sections for convenience
export const colors = theme.colors
export const typography = theme.typography
export const spacing = theme.spacing
export const motion = theme.motion
export const shadows = theme.shadow
