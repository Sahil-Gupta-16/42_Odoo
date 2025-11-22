/**
 * Tabs Component
 * 
 * Purpose:
 * - Organize content into separate tabbed sections
 * - Accessible tab navigation with ARIA attributes
 * - Smooth animations between tab switches
 * - Keyboard navigation support (Arrow keys, Tab, Enter)
 * 
 * Features:
 * - Animated underline indicator
 * - Icon support in tabs
 * - Custom tab content
 * - Responsive design
 * - Dark mode compatible
 * - Accessible (WCAG compliant)
 * - Customizable active tab
 * 
 * Usage:
 * ```
 * const tabs = [
 *   { label: 'Profile', content: <ProfileContent />, icon: <User /> },
 *   { label: 'Settings', content: <SettingsContent />, icon: <Settings /> }
 * ];
 * 
 * <Tabs tabs={tabs} defaultTab={0} />
 * ```
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Individual tab configuration
 */
export interface Tab {
  /** Display label for the tab */
  label: string;
  
  /** Content to display when tab is active */
  content: React.ReactNode;
  
  /** Optional icon to display before label */
  icon?: React.ReactNode;
  
  /** Optional badge count */
  badge?: number;
  
  /** Disable this tab */
  disabled?: boolean;
}

/**
 * Tabs component props
 */
interface TabsProps {
  /** Array of tab configurations */
  tabs: Tab[];
  
  /** Index of initially active tab (0-based) */
  defaultTab?: number;
  
  /** Callback when tab changes */
  onTabChange?: (index: number) => void;
  
  /** Additional CSS classes for container */
  className?: string;
  
  /** Tab list alignment */
  align?: 'left' | 'center' | 'right';
  
  /** Tab variant */
  variant?: 'default' | 'pills' | 'underline';
  
  /** Full width tabs */
  fullWidth?: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Tabs({
  tabs,
  defaultTab = 0,
  onTabChange,
  className,
  align = 'left',
  variant = 'underline',
  fullWidth = false,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index: number) => {
    if (tabs[index].disabled) return;
    setActiveTab(index);
    onTabChange?.(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      handleTabChange(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      handleTabChange(prevIndex);
    }
  };

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div 
        className={cn(
          'flex gap-2 mb-6 overflow-x-auto',
          variant === 'underline' && 'border-b border-border dark:border-border',
          alignmentClasses[align],
          fullWidth && 'w-full'
        )}
        role="tablist"
        aria-label="Content tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleTabChange(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'relative px-4 py-3 font-medium transition-all whitespace-nowrap flex items-center gap-2',
                'focus:outline-none focus:ring-2 focus:ring-accent/30 rounded-t-lg',
                fullWidth && 'flex-1 justify-center',
                
                // Variant styles
                variant === 'default' && [
                  isActive
                    ? 'text-accent bg-accent/10 dark:bg-accent/5'
                    : 'text-text-secondary hover:text-text-primary dark:hover:text-text-primary hover:bg-sidebar-hover'
                ],
                
                variant === 'pills' && [
                  'rounded-lg',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary dark:hover:text-text-primary hover:bg-sidebar-hover'
                ],
                
                variant === 'underline' && [
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary dark:hover:text-text-primary'
                ],
                
                // Disabled state
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {/* Icon */}
              {tab.icon && (
                <span className={cn(
                  'flex-shrink-0',
                  isActive ? 'text-accent' : 'text-text-tertiary'
                )}>
                  {tab.icon}
                </span>
              )}
              
              {/* Label */}
              <span>{tab.label}</span>
              
              {/* Badge */}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={cn(
                  'px-2 py-0.5 text-xs font-semibold rounded-full',
                  isActive 
                    ? 'bg-accent text-white' 
                    : 'bg-secondary/10 text-secondary'
                )}>
                  {tab.badge}
                </span>
              )}
              
              {/* Underline Indicator (for underline variant) */}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
