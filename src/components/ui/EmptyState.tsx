import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="p-4 bg-secondary/10 rounded-full mb-4">
        <Icon className="w-12 h-12 text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-primary dark:text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-secondary dark:text-text-secondary mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
