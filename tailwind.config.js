/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          glass: 'var(--surface-glass)',
          elevated: 'var(--surface-elevated)',
        },
        sidebar: {
          bg: 'var(--sidebar-bg)',
          hover: 'var(--sidebar-hover)',
          active: 'var(--sidebar-active)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: 'var(--border-light)',
          medium: 'var(--border-medium)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        large: 'var(--shadow-large)',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '150ms',
        'normal': '200ms', /* Frappe Standard */
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'default': 'ease-out', /* Smooth, non-bouncy */
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', /* Frappe-like ease */
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'modal': '1030',
        'popover': '1040',
        'tooltip': '1050',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
};
