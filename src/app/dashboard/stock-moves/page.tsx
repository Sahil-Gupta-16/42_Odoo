/**
 * Stock Moves/Transfers Page - Inventory Movement Management
 * 
 * Purpose:
 * - Track stock transfers between warehouses
 * - Record inventory adjustments
 * - Monitor movement history
 * - Manage inter-warehouse logistics
 * 
 * Features:
 * - Transfer and adjustment types
 * - Source/destination tracking
 * - Quantity monitoring
 * - Status updates (pending/completed)
 * - Reason/notes documentation
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowLeftRight, Plus, Calendar, Package, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import SearchInput from '@/components/ui/SearchInput';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/utils';

export default function StockMovesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMoves = useMemo(() => {
    return dummyData.stockMoves.filter(move => {
      const matchesSearch = 
        move.moveNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        move.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        move.reason.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || move.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || move.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, typeFilter, statusFilter]);

  const stats = {
    total: dummyData.stockMoves.length,
    transfers: dummyData.stockMoves.filter(m => m.type === 'transfer').length,
    adjustments: dummyData.stockMoves.filter(m => m.type === 'adjustment').length,
    completed: dummyData.stockMoves.filter(m => m.status === 'completed').length,
    pending: dummyData.stockMoves.filter(m => m.status === 'pending').length,
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'transfer' ? 'text-info' : 'text-warning';
  };

  const getTypeBg = (type: string) => {
    return type === 'transfer' ? 'bg-info/10' : 'bg-warning/10';
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
            {dummyData.labels.transfers}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Track stock movements and adjustments • {filteredMoves.length} records
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/stock-moves/new')}>
          <Plus className="w-5 h-5" />
          New Transfer
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <ArrowLeftRight className="w-5 h-5 text-accent" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Moves</p>
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
            <Package className="w-5 h-5 text-info" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Transfers</p>
          </div>
          <p className="text-2xl font-bold text-info">{stats.transfers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-warning" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Adjustments</p>
          </div>
          <p className="text-2xl font-bold text-warning">{stats.adjustments}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-2">Completed</p>
          <p className="text-2xl font-bold text-success">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-2">Pending</p>
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <SearchInput
          placeholder="Search by move number, product, or reason..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="all">All Types</option>
            <option value="transfer">Transfers</option>
            <option value="adjustment">Adjustments</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </motion.div>

      {/* Stock Moves List */}
      {filteredMoves.length === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="No stock movements found"
          description="Create a transfer or adjustment to start tracking inventory movements."
          action={{
            label: 'Create Transfer',
            onClick: () => router.push('/dashboard/stock-moves/new'),
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredMoves.map((move, index) => (
            <motion.div
              key={move.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.01 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getTypeBg(move.type)}`}>
                    {move.type === 'transfer' ? (
                      <ArrowLeftRight className={`w-6 h-6 ${getTypeColor(move.type)}`} />
                    ) : (
                      <TrendingUp className={`w-6 h-6 ${getTypeColor(move.type)}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-primary dark:text-primary">
                        {move.moveNumber}
                      </h3>
                      <Badge variant={move.type === 'transfer' ? 'info' : 'warning'}>
                        {move.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-text-secondary dark:text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="font-medium text-text-primary dark:text-text-primary">{move.productName}</span>
                      </div>
                      
                      {move.type === 'transfer' ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {move.fromWarehouse} ({move.fromLocation}) → {move.toWarehouse} ({move.toLocation})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{move.warehouse} - {move.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(move.date)}</span>
                      </div>
                      
                      <p className="text-text-tertiary">
                        <span className="font-medium">Reason:</span> {move.reason}
                      </p>
                      <p className="text-text-tertiary">
                        <span className="font-medium">By:</span> {move.initiatedByName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    {move.quantity > 0 ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-error" />
                    )}
                    <p className={`text-2xl font-bold ${
                      move.quantity > 0 ? 'text-success' : 'text-error'
                    }`}>
                      {move.quantity > 0 ? '+' : ''}{move.quantity}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(move.status)}>
                    {move.status}
                  </Badge>
                </div>
              </div>

              {move.notes && (
                <div className="mt-4 pt-4 border-t border-border dark:border-border">
                  <p className="text-sm text-text-tertiary italic">
                    <span className="font-medium not-italic">Note:</span> {move.notes}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
