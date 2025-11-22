/**
 * Warehouses Page - Facility Management Interface (Optimized)
 * 
 * Purpose:
 * - View all warehouse locations with clean design
 * - Monitor capacity with visual indicators
 * - Compact, efficient layout
 * 
 * Features:
 * - Compact cards with better space utilization
 * - Real-time capacity monitoring
 * - Interactive hover effects
 * - Clean visual hierarchy
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Warehouse, 
  MapPin, 
  Plus, 
  Users, 
  Phone, 
  Grid3X3,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Building2
} from 'lucide-react';
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
    return 'bg-success';
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
            Warehouses
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage warehouse facilities • {stats.total} locations
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/warehouses/new')}>
          <Plus className="w-5 h-5" />
          Add Warehouse
        </Button>
      </motion.div>

      {/* Compact Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="glass-effect rounded-xl p-4 border border-border dark:border-border hover:border-accent transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Warehouse className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary">Warehouses</p>
              <p className="text-2xl font-bold text-primary dark:text-primary">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="glass-effect rounded-xl p-4 border border-border dark:border-border hover:border-info transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-info/10 group-hover:bg-info/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary">Capacity</p>
              <p className="text-2xl font-bold text-primary dark:text-primary">{stats.totalCapacity.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="glass-effect rounded-xl p-4 border border-border dark:border-border hover:border-success transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary">In Stock</p>
              <p className="text-2xl font-bold text-primary dark:text-primary">{stats.totalStock.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="glass-effect rounded-xl p-4 border border-border dark:border-border hover:border-warning transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary">Utilization</p>
              <p className={`text-2xl font-bold ${getUtilizationColor(stats.avgUtilization)}`}>
                {stats.avgUtilization}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Compact Warehouses Grid */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {dummyData.warehouses.map((warehouse, index) => (
            <motion.div
              key={warehouse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative glass-effect rounded-xl border border-border dark:border-border hover:border-accent hover:shadow-large transition-all cursor-pointer group"
              onClick={() => router.push(`/dashboard/warehouses/${warehouse.id}`)}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              
              <div className="relative p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors flex-shrink-0">
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-primary dark:text-primary group-hover:text-accent transition-colors truncate">
                        {warehouse.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary dark:text-text-secondary">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{warehouse.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <Badge variant={warehouse.status === 'active' ? 'success' : 'default'}>
                      {warehouse.status}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Capacity Stats */}
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background-secondary dark:bg-background-secondary">
                  <div className="text-center flex-1">
                    <p className="text-xs text-text-tertiary mb-0.5">Capacity</p>
                    <p className="text-lg font-bold text-primary dark:text-primary">
                      {(warehouse.capacity / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="h-10 w-px bg-border dark:bg-border" />
                  <div className="text-center flex-1">
                    <p className="text-xs text-text-tertiary mb-0.5">In Stock</p>
                    <p className="text-lg font-bold text-primary dark:text-primary">
                      {(warehouse.currentStock / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="h-10 w-px bg-border dark:bg-border" />
                  <div className="text-center flex-1">
                    <p className="text-xs text-text-tertiary mb-0.5">Used</p>
                    <p className={`text-lg font-bold ${getUtilizationColor(warehouse.utilizationPercent)}`}>
                      {warehouse.utilizationPercent}%
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Utilization</span>
                    <span className={`text-xs font-semibold ${getUtilizationColor(warehouse.utilizationPercent)}`}>
                      {warehouse.utilizationPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-background-secondary dark:bg-background-secondary rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${warehouse.utilizationPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                      className={`h-1.5 rounded-full ${getUtilizationBg(warehouse.utilizationPercent)}`}
                    />
                  </div>
                </div>

                {/* Zones */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Grid3X3 className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-text-primary dark:text-text-primary">
                      Zones ({warehouse.zones.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {warehouse.zones.slice(0, 4).map((zone, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded border border-accent/20"
                      >
                        {zone}
                      </span>
                    ))}
                    {warehouse.zones.length > 4 && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded border border-accent/20">
                        +{warehouse.zones.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border dark:border-border">
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                    <span className="text-text-secondary dark:text-text-secondary truncate">
                      {warehouse.manager}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                    <span className="text-text-secondary dark:text-text-secondary truncate">
                      {warehouse.phone}
                    </span>
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
