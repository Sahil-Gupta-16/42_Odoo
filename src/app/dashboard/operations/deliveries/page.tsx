/**
 * Deliveries Page - Outgoing Shipment Management
 * 
 * Purpose:
 * - Track all outgoing deliveries
 * - Monitor delivery status
 * - Manage customer orders
 * - View tracking information
 * 
 * Features:
 * - Real-time status updates
 * - Customer information display
 * - Delivery address tracking
 * - Search and filter capabilities
 * - Quick delivery creation
 */

'use client';

import { motion } from 'framer-motion';
import { Truck, Plus, Calendar, MapPin, Package, User, Navigation } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import SearchInput from '@/components/ui/SearchInput';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DeliveriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDeliveries = useMemo(() => {
    return dummyData.deliveries.filter(delivery => {
      const matchesSearch = 
        delivery.deliveryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, statusFilter]);

  const stats = {
    total: dummyData.deliveries.length,
    dispatched: dummyData.deliveries.filter(d => d.status === 'dispatched').length,
    pending: dummyData.deliveries.filter(d => d.status === 'pending').length,
    totalValue: dummyData.deliveries.reduce((sum, d) => sum + d.totalValue, 0),
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'dispatched': return 'success';
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
            {dummyData.labels.deliveries}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage outgoing deliveries • {filteredDeliveries.length} shipments
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push('/dashboard/operations/deliveries/new')}>
          <Plus className="w-5 h-5" />
          New Delivery
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
            <Truck className="w-5 h-5 text-info" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Deliveries</p>
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
            <Navigation className="w-5 h-5 text-success" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Dispatched</p>
          </div>
          <p className="text-2xl font-bold text-success">{stats.dispatched}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-warning" />
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
            <Truck className="w-5 h-5 text-accent" />
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
          placeholder="Search by delivery number, customer, or tracking..."
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
          <option value="dispatched">Dispatched</option>
          <option value="pending">Pending</option>
        </select>
      </motion.div>

      {/* Deliveries List */}
      {filteredDeliveries.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="No deliveries found"
          description="Create your first delivery to start shipping products."
          action={{
            label: 'Create Delivery',
            onClick: () => router.push('/dashboard/operations/deliveries/new'),
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredDeliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.01 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-info dark:hover:border-info transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/operations/deliveries/${delivery.id}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-info/10">
                    <Truck className="w-6 h-6 text-info" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-primary dark:text-primary mb-2">
                      {delivery.deliveryNumber}
                    </h3>
                    <div className="space-y-1 text-sm text-text-secondary dark:text-text-secondary">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{delivery.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{delivery.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(delivery.date)}</span>
                        {delivery.scheduledDate && delivery.date !== delivery.scheduledDate && (
                          <span className="text-text-tertiary">• Scheduled: {formatDate(delivery.scheduledDate)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 flex-shrink-0" />
                        <span className="text-text-tertiary">Tracking: {delivery.trackingNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p className="text-2xl font-bold text-primary dark:text-primary">
                    {formatCurrency(delivery.totalValue)}
                  </p>
                  <Badge variant={getStatusVariant(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <p className="text-xs text-text-tertiary">
                    {delivery.items.length} item{delivery.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mt-4 pt-4 border-t border-border dark:border-border">
                <p className="text-sm font-medium text-text-secondary dark:text-text-secondary mb-2">Items:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {delivery.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm p-2 rounded bg-background-secondary dark:bg-background-secondary">
                      <span className="text-text-primary dark:text-text-primary font-medium truncate">{item.productName}</span>
                      <span className="text-text-secondary dark:text-text-secondary ml-2">
                        {item.quantity} units
                      </span>
                    </div>
                  ))}
                </div>
                {delivery.notes && (
                  <p className="mt-3 text-sm text-text-tertiary italic">Note: {delivery.notes}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
