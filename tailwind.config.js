/** @type {import('tailwindcss').Config} */
const { theme } = require('./src/theme/theme.ts');

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
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
        background: theme.colors.background,
        surface: theme.colors.surface,
        sidebar: theme.colors.sidebar,
        kpi: theme.colors.kpi,
        text: theme.colors.text,
        border: theme.colors.border,
      },
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadow,
      screens: theme.breakpoints,
      zIndex: theme.zIndex,
      transitionDuration: {
        'instant': theme.motion.duration.instant,
        'fast': theme.motion.duration.fast,
        'normal': theme.motion.duration.normal,
        'slow': theme.motion.duration.slow,
        'slower': theme.motion.duration.slower,
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
