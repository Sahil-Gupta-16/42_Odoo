/**
 * useDebounce Hooks
 * 
 * This file contains two debounce utilities:
 * 1. useDebounce - Debounces a value
 * 2. useDebounceCallback - Debounces a callback function
 * 
 * Author: StockMaster Team
 * Last Updated: 2025-11-22
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================
// VALUE DEBOUNCE HOOK
// ============================================

/**
 * Debounce a value
 * 
 * Delays updating a value until after user stops changing it.
 * Perfect for search inputs and form fields.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 * 
 * @example
 * ```
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 * 
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     fetchResults(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// CALLBACK DEBOUNCE HOOK
// ============================================

/**
 * Debounce a callback function
 * 
 * Creates a debounced version of a callback that delays execution.
 * Useful for event handlers like scroll, resize, or input events.
 * 
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced version of the callback
 * 
 * @example
 * ```
 * const handleSearch = useDebounceCallback((query: string) => {
 *   console.log('Searching for:', query);
 *   fetchResults(query);
 * }, 500);
 * 
 * <input onChange={(e) => handleSearch(e.target.value)} />
 * ```
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 500
): T {
  // Store latest callback in ref to avoid stale closures
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return debounced callback
  return useCallback(
    ((...args) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );
}

// ============================================
// ADVANCED: DEBOUNCE WITH LEADING OPTION
// ============================================

/**
 * Advanced debounce with leading/trailing options
 * 
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @param options - Configuration options
 * @returns Debounced function with cancel method
 * 
 * @example
 * ```
 * const handleClick = useAdvancedDebounce(
 *   () => console.log('Clicked'),
 *   1000,
 *   { leading: true, trailing: false }
 * );
 * ```
 */
export function useAdvancedDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 500,
  options: { leading?: boolean; trailing?: boolean } = { leading: false, trailing: true }
): T & { cancel: () => void } {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastCallTimeRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedFn = useCallback(
    ((...args) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      const execute = () => {
        lastCallTimeRef.current = now;
        callbackRef.current(...args);
      };

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Leading edge: execute immediately if enough time has passed
      if (options.leading && timeSinceLastCall >= delay) {
        execute();
      }

      // Trailing edge: set timeout to execute after delay
      if (options.trailing) {
        timeoutRef.current = setTimeout(() => {
          execute();
        }, delay);
      }
    }) as T,
    [delay, options.leading, options.trailing]
  );

  // Add cancel method
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return Object.assign(debouncedFn, { cancel });
}
