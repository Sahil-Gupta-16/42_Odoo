/**
 * Receipts Page - Incoming Stock Management
 * 
 * Purpose:
 * - Track all incoming stock receipts
 * - Monitor pending and completed receipts
 * - View receipt details and items
 * - Create new receipts
 * 
 * Features:
 * - Status filtering (completed/pending)
 * - Search by receipt number or supplier
 * - Date sorting
 * - Receipt value display
 * - Quick actions
 */

'use client';

import { motion } from 'framer-motion';
import { PackageOpen, Plus, Calendar, User, CheckCircle, Clock, FileText } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import SearchInput from '@/components/ui/SearchInput';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function ReceiptsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReceipts = useMemo(() => {
    return dummyData.receipts.filter(receipt => {
      const matchesSearch = 
        receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        receipt.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, statusFilter]);

  const stats = {
    total: dummyData.receipts.length,
    completed: dummyData.receipts.filter(r => r.status === 'completed').length,
    pending: dummyData.receipts.filter(r => r.status === 'pending').length,
    totalValue: dummyData.receipts.reduce((sum, r) => sum + r.totalValue, 0),
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
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
            {dummyData.labels.receipts}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Track incoming stock receipts • {filteredReceipts.length} total
          </p>
        </div>
        <Button variant="success" onClick={() => router.push('/dashboard/operations/receipts/new')}>
          <Plus className="w-5 h-5" />
          New Receipt
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
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-accent" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Receipts</p>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Completed</p>
          </div>
          <p className="text-2xl font-bold text-success">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-warning" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Pending</p>
          </div>
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <PackageOpen className="w-5 h-5 text-info" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Value</p>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-primary">{formatCurrency(stats.totalValue)}</p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <SearchInput
          placeholder="Search by receipt number or supplier..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </motion.div>

      {/* Receipts List */}
      {filteredReceipts.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No receipts found"
          description="Create your first receipt to track incoming stock."
          action={{
            label: 'Create Receipt',
            onClick: () => router.push('/dashboard/operations/receipts/new'),
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredReceipts.map((receipt, index) => (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.01 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-success dark:hover:border-success transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/operations/receipts/${receipt.id}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <PackageOpen className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary dark:text-primary mb-2">
                      {receipt.receiptNumber}
                    </h3>
                    <div className="space-y-1 text-sm text-text-secondary dark:text-text-secondary">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{receipt.supplier}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(receipt.date)}</span>
                        {receipt.expectedDate && receipt.date !== receipt.expectedDate && (
                          <span className="text-text-tertiary">• Expected: {formatDate(receipt.expectedDate)}</span>
                        )}
                      </div>
                      <p className="text-text-tertiary">Warehouse: {receipt.warehouse}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p className="text-2xl font-bold text-primary dark:text-primary">
                    {formatCurrency(receipt.totalValue)}
                  </p>
                  <Badge variant={getStatusVariant(receipt.status)}>
                    {receipt.status}
                  </Badge>
                  <p className="text-xs text-text-tertiary">
                    {receipt.items.length} item{receipt.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mt-4 pt-4 border-t border-border dark:border-border">
                <p className="text-sm font-medium text-text-secondary dark:text-text-secondary mb-2">Items:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {receipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm p-2 rounded bg-background-secondary dark:bg-background-secondary">
                      <span className="text-text-primary dark:text-text-primary font-medium truncate">{item.productName}</span>
                      <span className="text-text-secondary dark:text-text-secondary ml-2">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>
                {receipt.notes && (
                  <p className="mt-3 text-sm text-text-tertiary italic">Note: {receipt.notes}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
