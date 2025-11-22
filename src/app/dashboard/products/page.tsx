/**
 * Products Page - Main Product Management Interface
 * 
 * Purpose:
 * - Display all products in grid/list view
 * - Search and filter products by name, SKU, category
 * - Show stock status with color-coded badges
 * - Navigate to product details
 * - Quick add product button
 * 
 * Features:
 * - Debounced search for performance
 * - Responsive grid layout
 * - Empty state handling
 * - Status-based filtering
 * - Sort by stock level, price, name
 */

'use client';

import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter, Grid, List, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dummyData from '@/data/dummy.json';
import SearchInput from '@/components/ui/SearchInput';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency } from '@/lib/utils';

type SortBy = 'name' | 'stock' | 'price' | 'status';

export default function ProductsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = dummyData.products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.sku.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stock':
          return b.stock - a.stock;
        case 'price':
          return b.unitPrice - a.unitPrice;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [debouncedSearch, statusFilter, sortBy]);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const stockStats = {
    total: dummyData.products.length,
    inStock: dummyData.products.filter(p => p.status === 'in-stock').length,
    lowStock: dummyData.products.filter(p => p.status === 'low-stock').length,
    outOfStock: dummyData.products.filter(p => p.status === 'out-of-stock').length,
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
            {dummyData.labels.products}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage your product inventory • {filteredProducts.length} of {stockStats.total} items
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/products/new')}>
          <Plus className="w-5 h-5" />
          Add Product
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
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Total Products</p>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stockStats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">In Stock</p>
          <p className="text-2xl font-bold text-success">{stockStats.inStock}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-warning">{stockStats.lowStock}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-effect rounded-lg p-4 border border-border dark:border-border"
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-error">{stockStats.outOfStock}</p>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <SearchInput
          placeholder="Search products by name, SKU, or category..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
            <option value="price">Sort by Price</option>
            <option value="status">Sort by Status</option>
          </select>
          
          {/* View Toggle */}
          <div className="flex border border-border dark:border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent text-white'
                  : 'hover:bg-sidebar-hover'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent text-white'
                  : 'hover:bg-sidebar-hover'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description="Try adjusting your search or filters, or add a new product."
          action={{
            label: 'Add Product',
            onClick: () => router.push('/dashboard/products/new'),
          }}
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
          : 'space-y-4'
        }>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * index }}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/products/${product.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <Badge variant={getStatusVariant(product.status)}>
                  {product.status.replace('-', ' ')}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-primary dark:text-primary mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                {product.sku} • {product.category}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary dark:text-text-secondary">Stock:</span>
                  <span className={`font-semibold ${
                    product.stock <= product.minStockLevel ? 'text-error' : 'text-primary dark:text-primary'
                  }`}>
                    {product.stock} / {product.maxStockLevel} {product.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary dark:text-text-secondary">Location:</span>
                  <span className="text-primary dark:text-primary font-medium">{product.warehouse} - {product.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary dark:text-text-secondary">Unit Price:</span>
                  <span className="font-semibold text-primary dark:text-primary">
                    {formatCurrency(product.unitPrice)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border dark:border-border">
                  <span className="text-text-secondary dark:text-text-secondary">Total Value:</span>
                  <span className="font-bold text-accent">
                    {formatCurrency(product.totalValue)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
