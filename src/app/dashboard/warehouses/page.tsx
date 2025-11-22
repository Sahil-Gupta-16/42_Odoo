/**
 * Warehouses Page - Facility Management Interface
 * 
 * Purpose:
 * - View all warehouse locations
 * - Monitor capacity and utilization
 * - Track warehouse zones
 * - Manage facility information
 * 
 * Features:
 * - Real-time capacity monitoring
 * - Utilization percentage display
 * - Zone management
 * - Contact information
 * - Status indicators
 * - Visual capacity bars
 */

'use client';

import { motion } from 'framer-motion';
import { Warehouse, MapPin, Plus, Users, Phone, Package, Grid3X3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

export default function WarehousesPage() {
  const router = useRouter();

  const stats = {
    total: dummyData.warehouses.length,
    totalCapacity: dummyData.warehouses.reduce((sum, w) => sum + w.capacity, 0),
    totalStock: dummyData.warehouses.reduce((sum, w) => sum + w.currentStock, 0),
    avgUtilization: Math.round(
      dummyData.warehouses.reduce((sum, w) => sum + w.utilizationPercent, 0) / dummyData.warehouses.length
    ),
  };

  const getUtilizationColor = (percent: number) => {
    if (percent >= 90) return 'text-error';
    if (percent >= 70) return 'text-warning';
    return 'text-success';
  };

  const getUtilizationBg = (percent: number) => {
    if (percent >= 90) return 'bg-error';
    if (percent >= 70) return 'bg-warning';
    return 'bg-accent';
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
            {dummyData.labels.warehouse}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage warehouse facilities and capacity • {stats.total} locations
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/warehouses/new')}>
          <Plus className="w-5 h-5" />
          Add Warehouse
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="w-5 h-5 text-accent" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Warehouses</p>
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
            <p className="text-sm text-text-secondary dark:text-text-secondary">Total Capacity</p>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.totalCapacity.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-success" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Current Stock</p>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.totalStock.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Grid3X3 className="w-5 h-5 text-warning" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">Avg Utilization</p>
          </div>
          <p className={`text-2xl font-bold ${getUtilizationColor(stats.avgUtilization)}`}>
            {stats.avgUtilization}%
          </p>
        </motion.div>
      </div>

      {/* Warehouses Grid */}
      {dummyData.warehouses.length === 0 ? (
        <EmptyState
          icon={Warehouse}
          title="No warehouses found"
          description="Add your first warehouse to start managing inventory locations."
          action={{
            label: 'Add Warehouse',
            onClick: () => router.push('/dashboard/warehouses/new'),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dummyData.warehouses.map((warehouse, index) => (
            <motion.div
              key={warehouse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/warehouses/${warehouse.id}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-info/10">
                    <Warehouse className="w-8 h-8 text-info" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-primary">
                      {warehouse.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{warehouse.location}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={warehouse.status === 'active' ? 'success' : 'default'}>
                  {warehouse.status}
                </Badge>
              </div>

              {/* Address */}
              <div className="mb-4 p-3 rounded-lg bg-background-secondary dark:bg-background-secondary">
                <p className="text-sm text-text-secondary dark:text-text-secondary">
                  {warehouse.address}
                </p>
              </div>

              {/* Capacity Stats */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Capacity</p>
                    <p className="text-2xl font-bold text-primary dark:text-primary">
                      {warehouse.capacity.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Current Stock</p>
                    <p className="text-2xl font-bold text-primary dark:text-primary">
                      {warehouse.currentStock.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-secondary dark:text-text-secondary">Utilization</span>
                    <span className={`text-sm font-semibold ${getUtilizationColor(warehouse.utilizationPercent)}`}>
                      {warehouse.utilizationPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-background-secondary dark:bg-background-secondary rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${warehouse.utilizationPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className={`h-3 rounded-full ${getUtilizationBg(warehouse.utilizationPercent)}`}
                    />
                  </div>
                </div>

                {/* Zones */}
                <div>
                  <p className="text-sm text-text-secondary dark:text-text-secondary mb-2">
                    Zones ({warehouse.zones.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {warehouse.zones.map((zone, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-4 border-t border-border dark:border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-text-secondary dark:text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>Manager:</span>
                  </div>
                  <span className="text-primary dark:text-primary font-medium">{warehouse.manager}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-text-secondary dark:text-text-secondary">
                    <Phone className="w-4 h-4" />
                    <span>Phone:</span>
                  </div>
                  <span className="text-primary dark:text-primary">{warehouse.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
