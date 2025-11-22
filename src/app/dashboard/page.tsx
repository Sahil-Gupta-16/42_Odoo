'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Clock,
  DollarSign,
  Warehouse,
  TrendingDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import RollingText from '@/components/RollingText';
import dummyData from '@/data/dummy.json';

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }
  }, []);

  const kpiCards = [
    {
      title: 'Total Products',
      value: dummyData.kpi.totalProducts,
      change: `+${dummyData.kpi.monthlyGrowth}%`,
      trend: 'up',
      icon: Package,
      bgColor: 'bg-accent/10 dark:bg-accent/5',
      iconColor: 'text-accent',
      link: '/dashboard/products'
    },
    {
      title: 'Low Stock Items',
      value: dummyData.kpi.lowStock,
      change: 'Needs attention',
      trend: 'down',
      icon: AlertTriangle,
      bgColor: 'bg-warning/10 dark:bg-warning/5',
      iconColor: 'text-warning',
      link: '/dashboard/products'
    },
    {
      title: 'Out of Stock',
      value: dummyData.kpi.outOfStock,
      change: 'Critical',
      trend: 'up',
      icon: AlertTriangle,
      bgColor: 'bg-error/10 dark:bg-error/5',
      iconColor: 'text-error',
      link: '/dashboard/products'
    },
    {
      title: 'Total Value',
      value: `$${(dummyData.kpi.totalValue / 1000).toFixed(1)}K`,
      change: `+${dummyData.kpi.monthlyGrowth}%`,
      trend: 'up',
      icon: DollarSign,
      bgColor: 'bg-success/10 dark:bg-success/5',
      iconColor: 'text-success',
      link: '/dashboard/history'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
          {dummyData.labels.dashboard}
        </h1>
        <p className="text-text-secondary dark:text-text-secondary">
          {dummyData.labels.welcome}, {currentUser?.name || 'User'}! Here's your inventory overview
        </p>
      </motion.div>

      {/* Rolling Text Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <RollingText messages={dummyData.rollingTextMessages} />
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 2) }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => router.push(card.link)}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  card.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {card.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-xs">{card.change}</span>
                </div>
              </div>
              <h3 className="text-text-secondary dark:text-text-secondary text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-primary dark:text-primary">
                {card.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Warehouse Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-primary dark:text-primary mb-4">
          Warehouse Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyData.warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
              onClick={() => router.push(`/dashboard/warehouses`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Warehouse className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary dark:text-primary">
                      {warehouse.name}
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      {warehouse.location}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full capitalize">
                  {warehouse.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-secondary">Capacity</span>
                  <span className="font-medium text-primary dark:text-primary">
                    {warehouse.currentStock} / {warehouse.capacity}
                  </span>
                </div>
                
                <div className="w-full bg-background-secondary dark:bg-background-secondary rounded-full h-2">
                  <div 
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${warehouse.utilizationPercent}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-secondary">Utilization</span>
                  <span className="font-medium text-accent">
                    {warehouse.utilizationPercent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-primary dark:text-primary mb-4">
          {dummyData.labels.quickActions}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyData.quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(action.link)}
              className="glass-effect rounded-lg p-4 border border-border dark:border-border text-left hover:border-accent dark:hover:border-accent transition-colors"
            >
              <div className={`inline-flex p-2 rounded-lg mb-3 ${
                action.color === 'accent' ? 'bg-accent/10' :
                action.color === 'success' ? 'bg-success/10' :
                action.color === 'info' ? 'bg-info/10' :
                'bg-warning/10'
              }`}>
                <Plus className={`w-5 h-5 ${
                  action.color === 'accent' ? 'text-accent' :
                  action.color === 'success' ? 'text-success' :
                  action.color === 'info' ? 'text-info' :
                  'text-warning'
                }`} />
              </div>
              <h3 className="font-semibold text-primary dark:text-primary mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                {action.description}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Stock Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="glass-effect rounded-xl p-6 border border-border dark:border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary dark:text-primary">
              {dummyData.labels.recentActivity}
            </h2>
            <Clock className="w-5 h-5 text-text-tertiary dark:text-text-tertiary" />
          </div>
          <div className="space-y-3">
            {dummyData.receipts.slice(0, 3).map((receipt) => (
              <div
                key={receipt.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover dark:hover:bg-sidebar-hover transition-colors cursor-pointer"
                onClick={() => router.push('/dashboard/operations/receipts')}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <ShoppingCart className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-primary text-sm">
                      {receipt.receiptNumber}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-text-secondary">
                      {receipt.supplier}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary dark:text-primary text-sm">
                    ${receipt.totalValue.toFixed(2)}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    receipt.status === 'completed' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {receipt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/dashboard/history')}
            className="w-full mt-4 py-2 text-accent hover:text-accent-dark font-medium transition-colors text-sm"
          >
            View All Activity →
          </button>
        </motion.div>

        {/* Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="glass-effect rounded-xl p-6 border border-border dark:border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary dark:text-primary">
              {dummyData.labels.stockAlerts}
            </h2>
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div className="space-y-3">
            {dummyData.products.filter(p => p.status !== 'in-stock').map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover dark:hover:bg-sidebar-hover transition-colors cursor-pointer"
                onClick={() => router.push('/dashboard/products')}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    product.status === 'out-of-stock' ? 'bg-error/10' : 'bg-warning/10'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      product.status === 'out-of-stock' ? 'text-error' : 'text-warning'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-primary text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-text-secondary">
                      {product.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary dark:text-primary text-sm">
                    {product.stock} {product.unit}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    product.status === 'out-of-stock' 
                      ? 'bg-error/10 text-error' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {product.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="w-full mt-4 py-2 text-warning hover:text-warning/80 font-medium transition-colors text-sm"
          >
            View All Products →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
