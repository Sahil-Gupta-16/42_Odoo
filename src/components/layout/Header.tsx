'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  UserCircle
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';

export default function Header() {
  const router = useRouter();
  const { toggleSidebar, theme, toggleTheme, addNotification } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Load current user from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    addNotification('info', 'Logged out successfully');
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1030] glass-effect border-b border-border dark:border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-text-primary dark:text-text-primary" />
          </motion.button>

          <h1 className="text-xl font-bold text-primary dark:text-primary">
            {dummyData.appName}
          </h1>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary dark:text-text-tertiary" />
            <input
              type="text"
              placeholder="Search products, receipts, deliveries..."
              className="w-full pl-11 pr-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-text-primary dark:text-text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-text-primary dark:text-text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-text-primary dark:text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/settings')}
            className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-text-primary dark:text-text-primary" />
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-text-primary dark:text-text-primary">
                {currentUser?.name || 'User'}
              </span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowUserMenu(false)}
                    className="fixed inset-0 z-[1025]"
                  />

                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 glass-effect rounded-lg shadow-large overflow-hidden border border-border dark:border-border z-[1030]"
                  >
                    {/* User Info */}
                    <div className="p-3 border-b border-border dark:border-border bg-background-secondary dark:bg-background-secondary">
                      <p className="font-medium text-text-primary dark:text-text-primary">
                        {currentUser?.name || 'User'}
                      </p>
                      <p className="text-sm text-text-secondary dark:text-text-secondary truncate">
                        {currentUser?.email || 'user@example.com'}
                      </p>
                      <p className="text-xs text-text-tertiary dark:text-text-tertiary mt-1 capitalize">
                        {currentUser?.role || 'User'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          router.push('/profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-hover transition-colors text-left text-text-primary dark:text-text-primary"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span className="text-sm">My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          router.push('/settings');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-hover transition-colors text-left text-text-primary dark:text-text-primary"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </button>

                      <div className="my-1 border-t border-border dark:border-border"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-error/10 text-error transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
