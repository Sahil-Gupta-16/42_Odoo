export const APP_NAME = 'StockMaster';
export const APP_VERSION = '1.0.0';

export const STATUS_COLORS = {
  'in-stock': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'error',
  completed: 'success',
  pending: 'warning',
  dispatched: 'info',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  WAREHOUSES: '/dashboard/warehouses',
  RECEIPTS: '/dashboard/operations/receipts',
  DELIVERIES: '/dashboard/operations/deliveries',
  STOCK_MOVES: '/dashboard/stock-moves',
  HISTORY: '/dashboard/history',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;
