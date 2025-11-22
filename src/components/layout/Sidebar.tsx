'use client';

import {
  LayoutDashboard,
  Package,
  PackageOpen,
  Truck,
  ArrowLeftRight,
  History,
  Settings
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dummyData from '@/data/dummy.json';
import { cn } from '@/lib/utils';

type MenuItem = {
  type: 'link';
  icon: any;
  label: string;
  href: string;
  badge?: number | null;
} | {
  type: 'header';
  label: string;
} | {
  type: 'separator';
};

const menuItems: MenuItem[] = [
  {
    type: 'link',
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    badge: null
  },
  {
    type: 'link',
    icon: Package,
    label: 'Products',
    href: '/products',
    badge: null
  },
  { type: 'separator' },
  { type: 'header', label: 'Operations' },
  {
    type: 'link',
    icon: PackageOpen,
    label: 'Receipts',
    href: '/operations/receipts',
    badge: dummyData.kpi.pendingReceipts
  },
  {
    type: 'link',
    icon: Truck,
    label: 'Deliveries',
    href: '/operations/deliveries',
    badge: dummyData.kpi.pendingDeliveries
  },
  {
    type: 'link',
    icon: ArrowLeftRight,
    label: 'Internal Transfers',
    href: '/operations/transfers',
    badge: null
  },
  { type: 'separator' },
  {
    type: 'link',
    icon: History,
    label: 'Stock Ledger',
    href: '/history',
    badge: null
  },
  {
    type: 'link',
    icon: Settings,
    label: 'Settings',
    href: '/settings',
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
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/20 z-[1010] md:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar-bg border-r border-border z-[1020] transition-all duration-200 ease-in-out overflow-hidden",
          sidebarOpen ? "w-[260px]" : "w-[64px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item, index) => {
              if (item.type === 'separator') {
                return sidebarOpen ? (
                  <div key={index} className="my-2 border-t border-border/50" />
                ) : (
                  <div key={index} className="my-2 border-t border-border/50 mx-2" />
                );
              }

              if (item.type === 'header') {
                return sidebarOpen ? (
                  <div key={index} className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    {item.label}
                  </div>
                ) : null;
              }

              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium group relative",
                    isActive
                      ? "bg-sidebar-active text-text-primary"
                      : "text-text-secondary hover:bg-sidebar-hover hover:text-text-primary"
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary")} />

                  <span className={cn(
                    "flex-1 whitespace-nowrap transition-opacity duration-200",
                    sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}>
                    {item.label}
                  </span>

                  {sidebarOpen && item.badge && item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-text-inverse text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}

                  {!sidebarOpen && item.badge && item.badge > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {sidebarOpen ? (
              <div className="text-xs text-text-tertiary">
                <p className="font-semibold text-text-primary">{dummyData.appName}</p>
                <p>v1.0.0</p>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-sidebar-active flex items-center justify-center mx-auto">
                <span className="text-[10px] font-bold text-text-primary">SM</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
