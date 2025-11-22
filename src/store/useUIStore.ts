import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

interface UIStore {
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Theme state with persistence
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Rolling text settings
  rollingTextSpeed: number;
  setRollingTextSpeed: (speed: number) => void;

  // Modal/Dialog state
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  modalTitle: string;
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;

  // Loading state
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;

  // Notification/Toast state
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active page tracking
  activePage: string;
  setActivePage: (page: string) => void;

  // User preferences
  preferences: {
    compactMode: boolean;
    animationsEnabled: boolean;
    soundEnabled: boolean;
  };
  setPreference: (key: keyof UIStore['preferences'], value: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Theme with auto-apply to document
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document root
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          if (theme === 'dark') {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
          // Optional: Dispatch custom event for theme change
          window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
        }
      },
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      // Rolling text
      rollingTextSpeed: 32,
      setRollingTextSpeed: (speed) => set({ rollingTextSpeed: speed }),

      // Modal
      modalOpen: false,
      modalContent: null,
      modalTitle: '',
      openModal: (content, title = '') => 
        set({ modalOpen: true, modalContent: content, modalTitle: title }),
      closeModal: () => 
        set({ modalOpen: false, modalContent: null, modalTitle: '' }),

      // Loading
      isLoading: false,
      loadingMessage: '',
      setLoading: (loading, message = 'Loading...') => 
        set({ isLoading: loading, loadingMessage: message }),

      // Notifications
      notifications: [],
      addNotification: (type, message) => {
        const id = `notification-${Date.now()}-${Math.random()}`;
        const notification: Notification = {
          id,
          type,
          message,
          timestamp: Date.now()
        };
        
        set((state) => ({
          notifications: [...state.notifications, notification]
        }));

        // Auto-remove after 5 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, 5000);
      },
      removeNotification: (id) => 
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        })),
      clearAllNotifications: () => set({ notifications: [] }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Active page
      activePage: 'dashboard',
      setActivePage: (page) => set({ activePage: page }),

      // User preferences
      preferences: {
        compactMode: false,
        animationsEnabled: true,
        soundEnabled: false
      },
      setPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value
          }
        }))
    }),
    {
      name: 'stockmaster-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        rollingTextSpeed: state.rollingTextSpeed,
        preferences: state.preferences
      }),
    }
  )
);

// Selector hooks for better performance
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useTheme = () => useUIStore((state) => state.theme);
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useLoading = () => useUIStore((state) => state.isLoading);
