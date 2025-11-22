'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-error/10 rounded-full">
            <AlertTriangle className="w-16 h-16 text-error" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
          Something went wrong
        </h1>
        
        <p className="text-text-secondary dark:text-text-secondary mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 border border-border dark:border-border rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
