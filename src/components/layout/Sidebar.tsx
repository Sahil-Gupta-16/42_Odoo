'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1005] md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? '280px' : '80px',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar dark:bg-sidebar border-r border-border dark:border-border z-[1010] overflow-hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li 
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center gap-3 px-3 py-3 rounded-lg transition-all cursor-pointer relative
                          ${isActive 
                            ? 'bg-accent text-white shadow-medium' 
                            : 'text-text-primary dark:text-text-primary hover:bg-sidebar-hover'
                          }
                          ${!sidebarOpen ? 'justify-center' : ''}
                        `}
                      >
                        <div className="flex-shrink-0 relative">
                          <Icon className="w-5 h-5" />
                          {/* Badge on icon when closed */}
                          {!sidebarOpen && item.badge !== null && item.badge > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                              {item.badge > 9 ? '9+' : item.badge}
                            </span>
                          )}
                        </div>
                        
                        {sidebarOpen && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex-1 text-sm font-medium"
                            >
                              {item.label}
                            </motion.span>

                            {item.badge !== null && item.badge > 0 && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex-shrink-0 min-w-[24px] h-6 px-2 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </>
                        )}
                      </motion.div>
                    </Link>

                    {/* Tooltip for closed sidebar */}
                    <AnimatePresence>
                      {!sidebarOpen && hoveredItem === item.href && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[1030] pointer-events-none"
                        >
                          <div className="bg-sidebar-bg dark:bg-sidebar-bg border border-border dark:border-border rounded-lg shadow-large px-3 py-2 whitespace-nowrap">
                            <p className="text-sm font-medium text-text-primary dark:text-text-primary">
                              {item.label}
                            </p>
                            {item.badge !== null && item.badge > 0 && (
                              <p className="text-xs text-text-secondary dark:text-text-secondary mt-0.5">
                                {item.badge} pending
                              </p>
                            )}
                          </div>
                          {/* Arrow */}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-border dark:border-r-border"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Toggle Button */}
          {/* <div className="border-t border-border dark:border-border p-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-hover transition-colors ${
                !sidebarOpen ? 'justify-center' : ''
              }`}
            >
              {sidebarOpen ? (
                <>
                  <ChevronLeft className="w-5 h-5 text-text-primary dark:text-text-primary" />
                  <span className="text-sm font-medium text-text-primary dark:text-text-primary">
                    Collapse
                  </span>
                </>
              ) : (
                <ChevronRight className="w-5 h-5 text-text-primary dark:text-text-primary" />
              )}
            </motion.button>
          </div> */}

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
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-accent">
                  {dummyData.appName.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
