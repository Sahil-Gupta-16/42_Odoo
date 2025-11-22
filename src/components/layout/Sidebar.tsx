'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  PackageOpen,
  Truck,
  ArrowLeftRight,
  History,
  Warehouse,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dummyData from '@/data/dummy.json';

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard',
    badge: null 
  },
  { 
    icon: Package, 
    label: 'Products', 
    href: '/dashboard/products',
    badge: null 
  },
  { 
    icon: PackageOpen, 
    label: 'Receipts', 
    href: '/dashboard/operations/receipts',
    badge: dummyData.kpi.pendingReceipts 
  },
  { 
    icon: Truck, 
    label: 'Deliveries', 
    href: '/dashboard/operations/deliveries',
    badge: dummyData.kpi.pendingDeliveries 
  },
  { 
    icon: ArrowLeftRight, 
    label: 'Transfers', 
    href: '/dashboard/stock-moves',
    badge: null 
  },
  { 
    icon: Warehouse, 
    label: 'Warehouses', 
    href: '/dashboard/warehouses',
    badge: null 
  },
  { 
    icon: History, 
    label: 'History', 
    href: '/dashboard/history',
    badge: null 
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/dashboard/settings',
    badge: null 
  },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-[1010] md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? '280px' : '80px',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar-bg dark:bg-sidebar-bg border-r border-border dark:border-border z-[1020] overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Toggle */}
          <div className="flex items-center justify-end p-4 border-b border-border dark:border-border">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-5 h-5 text-text-primary dark:text-text-primary" />
              ) : (
                <ChevronRight className="w-5 h-5 text-text-primary dark:text-text-primary" />
              )}
            </motion.button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`
                          flex items-center gap-3 px-3 py-3 rounded-lg transition-all cursor-pointer
                          ${isActive 
                            ? 'bg-sidebar-active text-accent dark:text-accent font-medium' 
                            : 'text-text-secondary dark:text-text-secondary hover:bg-sidebar-hover hover:text-text-primary dark:hover:text-text-primary'
                          }
                        `}
                      >
                        <div className="flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 text-sm"
                          >
                            {item.label}
                          </motion.span>
                        )}

                        {sidebarOpen && item.badge !== null && item.badge > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0 px-2 py-0.5 bg-error text-white text-xs font-semibold rounded-full"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-border dark:border-border p-4">
            {sidebarOpen ? (
              <div className="text-xs text-text-tertiary dark:text-text-tertiary space-y-1">
                <p className="font-semibold text-text-secondary dark:text-text-secondary">
                  {dummyData.appName}
                </p>
                <p>Version 1.0.0</p>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">SM</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
