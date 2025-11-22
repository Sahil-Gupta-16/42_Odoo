'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export default function NotificationToast() {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="fixed top-20 right-4 md:right-6 z-[1050] flex flex-col gap-3 max-w-sm w-full px-4 md:px-0">
      <AnimatePresence>
        {notifications.map((notification) => {
          const icons = {
            success: <CheckCircle className="w-5 h-5 text-success" />,
            error: <AlertCircle className="w-5 h-5 text-error" />,
            warning: <AlertTriangle className="w-5 h-5 text-warning" />,
            info: <Info className="w-5 h-5 text-info" />,
          };

          const bgColors = {
            success: 'bg-success/10 border-success/20 dark:bg-success/5 dark:border-success/10',
            error: 'bg-error/10 border-error/20 dark:bg-error/5 dark:border-error/10',
            warning: 'bg-warning/10 border-warning/20 dark:bg-warning/5 dark:border-warning/10',
            info: 'bg-info/10 border-info/20 dark:bg-info/5 dark:border-info/10',
          };

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`glass-effect border ${bgColors[notification.type]} rounded-lg p-4 shadow-large flex items-start gap-3`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {icons[notification.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary dark:text-text-primary break-words">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
