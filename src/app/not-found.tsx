'use client';

import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-8xl font-bold text-accent mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
          Page Not Found
        </h1>
        
        <p className="text-text-secondary dark:text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 border border-border dark:border-border rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            <Search className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
