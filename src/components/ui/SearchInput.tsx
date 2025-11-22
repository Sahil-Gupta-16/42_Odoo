/**
 * SearchInput Component
 * 
 * Purpose:
 * - Reusable search input field with icon
 * - Clear button functionality
 * - Optimized for search operations
 * - Consistent styling across app
 * 
 * Features:
 * - Search icon on left
 * - Clear button (X) on right when value exists
 * - Auto-focus support
 * - Customizable placeholder
 * - onChange callback
 * - Optional onClear callback
 * - Full keyboard support
 * - Responsive design
 * - Dark mode compatible
 * 
 * Usage:
 * ```
 * <SearchInput
 *   placeholder="Search products..."
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   onClear={() => console.log('Cleared')}
 * />
 * ```
 */

'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Placeholder text for the input */
  placeholder?: string;
  
  /** Current value of the search input */
  value: string;
  
  /** Callback when input value changes */
  onChange: (value: string) => void;
  
  /** Optional callback when clear button is clicked */
  onClear?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Whether to auto-focus the input on mount */
  autoFocus?: boolean;
}

export default function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  className,
  autoFocus = false,
  ...props
}: SearchInputProps) {
  
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={cn('relative', className)}>
      {/* Search Icon */}
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary dark:text-text-tertiary pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* Input Field */}
      <input
        type="text"
        role="searchbox"
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className={cn(
          // Base styles
          'w-full pl-11 pr-11 py-3 rounded-lg',
          // Border and background
          'border border-border dark:border-border',
          'bg-surface dark:bg-surface',
          // Text styles
          'text-text-primary dark:text-text-primary',
          'placeholder:text-text-tertiary',
          // Focus styles
          'focus:outline-none focus:ring-2 focus:ring-accent/30',
          // Transitions
          'transition-all duration-200',
          // Hover
          'hover:border-accent/50 dark:hover:border-accent/50'
        )}
        {...props}
      />
      
      {/* Clear Button - Only shows when there's a value */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            'p-1 rounded transition-colors',
            'hover:bg-sidebar-hover',
            'focus:outline-none focus:ring-2 focus:ring-accent/30'
          )}
        >
          <X className="w-4 h-4 text-text-secondary dark:text-text-secondary" />
        </button>
      )}
    </div>
  );
}
