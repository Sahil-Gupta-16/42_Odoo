/**
 * History Page - Complete Transaction Timeline
 * 
 * Purpose:
 * - View all inventory transactions
 * - Track chronological activity
 * - Search historical records
 * - Filter by transaction type
 * - Export history data
 * 
 * Features:
 * - Unified timeline view
 * - Activity icons by type
 * - Date-based sorting
 * - Type filtering (receipts/deliveries/moves)
 * - Search functionality
 * - Detailed transaction information
 */

'use client';

import { motion } from 'framer-motion';
import { History, Filter, Download, Calendar, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import SearchInput from '@/components/ui/SearchInput';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';

type ActivityType = 'receipt' | 'delivery' | 'move' | 'all';

interface Activity {
  id: string;
  type: 'receipt' | 'delivery' | 'move';
  number: string;
  date: string;
  description: string;
  value?: number;
  status: string;
  icon: string;
  warehouse: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType>('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Combine all activities
  const allActivities: Activity[] = useMemo(() => {
    const activities: Activity[] = [
      ...dummyData.receipts.map(r => ({
        id: r.id,
        type: 'receipt' as const,
        number: r.receiptNumber,
        date: r.date,
        description: `Receipt from ${r.supplier}`,
        value: r.totalValue,
        status: r.status,
        icon: '📦',
        warehouse: r.warehouse,
      })),
      ...dummyData.deliveries.map(d => ({
        id: d.id,
        type: 'delivery' as const,
        number: d.deliveryNumber,
        date: d.date,
        description: `Delivery to ${d.customer}`,
        value: d.totalValue,
        status: d.status,
        icon: '🚚',
        warehouse: d.warehouse,
      })),
      ...dummyData.stockMoves.map(m => ({
        id: m.id,
        type: 'move' as const,
        number: m.moveNumber,
        date: m.date,
        description: m.type === 'transfer' 
          ? `Transfer: ${m.fromWarehouse} → ${m.toWarehouse}`
          : `Adjustment: ${m.productName}`,
        status: m.status,
        icon: '🔄',
        warehouse: m.warehouse || m.fromWarehouse || '',
      })),
    ];

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      const matchesSearch = 
        activity.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || activity.type === typeFilter;
      
      // Date filtering
      let matchesDate = true;
      if (dateRange !== 'all') {
        const activityDate = new Date(activity.date);
        const now = new Date();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        switch (dateRange) {
          case 'today':
            matchesDate = activityDate.toDateString() === now.toDateString();
            break;
          case 'week':
            matchesDate = (now.getTime() - activityDate.getTime()) <= 7 * dayInMs;
            break;
          case 'month':
            matchesDate = (now.getTime() - activityDate.getTime()) <= 30 * dayInMs;
            break;
        }
      }
      
      return matchesSearch && matchesType && matchesDate;
    });
  }, [allActivities, searchQuery, typeFilter, dateRange]);

  const stats = {
    totalTransactions: allActivities.length,
    receipts: allActivities.filter(a => a.type === 'receipt').length,
    deliveries: allActivities.filter(a => a.type === 'delivery').length,
    moves: allActivities.filter(a => a.type === 'move').length,
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'receipt': return 'Receipt';
      case 'delivery': return 'Delivery';
      case 'move': return 'Transfer';
      default: return type;
    }
  };

  const getTypeVariant = (type: string): 'success' | 'info' | 'warning' | 'default' => {
    switch (type) {
      case 'receipt': return 'success';
      case 'delivery': return 'info';
      case 'move': return 'warning';
      default: return 'default';
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting history data...');
  };

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary mb-2">
            {dummyData.labels.history}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Complete transaction history • {filteredActivities.length} records
          </p>
        </div>
        <Button variant="ghost" onClick={handleExport}>
          <Download className="w-5 h-5" />
          Export
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.totalTransactions}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Receipts</p>
          <p className="text-2xl font-bold text-success">{stats.receipts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Deliveries</p>
          <p className="text-2xl font-bold text-info">{stats.deliveries}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Transfers</p>
          <p className="text-2xl font-bold text-warning">{stats.moves}</p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <SearchInput
          placeholder="Search by transaction number or description..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ActivityType)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="all">All Types</option>
            <option value="receipt">Receipts</option>
            <option value="delivery">Deliveries</option>
            <option value="move">Transfers</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </motion.div>

      {/* Activity Timeline */}
      {filteredActivities.length === 0 ? (
        <EmptyState
          icon={History}
          title="No transactions found"
          description="Try adjusting your filters or search query."
        />
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={`${activity.type}-${activity.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.01 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-primary dark:text-primary">
                          {activity.number}
                        </h3>
                        <Badge variant={getTypeVariant(activity.type)}>
                          {getTypeLabel(activity.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary dark:text-text-secondary">
                        {activity.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-sm text-text-tertiary dark:text-text-tertiary">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(activity.date)}</span>
                      </div>
                      {activity.value && (
                        <p className="text-lg font-bold text-primary dark:text-primary">
                          {formatCurrency(activity.value)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-tertiary dark:text-text-tertiary">
                    <span>Warehouse: {activity.warehouse}</span>
                    <span>•</span>
                    <span className="capitalize">Status: {activity.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
