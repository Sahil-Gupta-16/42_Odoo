'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/NotificationToast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarOpen, theme } = useUIStore();

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated || isAuthenticated !== 'true') {
        router.push('/login');
      }
    }
  }, [router]);

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300 overflow-x-hidden">
      <Header />
      
      <div className="flex relative w-full">
        <Sidebar />
        
        <main
          className={`flex-1 w-full min-h-[calc(100vh-4rem)] transition-all duration-300 ${
            sidebarOpen ? 'pl-0 md:pl-[280px]' : 'pl-0 md:pl-[80px]'
          }`}
        >
          <div className="w-full max-w-full p-4 md:p-6 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <NotificationToast />
    </div>
  );
}
