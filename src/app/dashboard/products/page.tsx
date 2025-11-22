/**
 * Products Page - Using Centralized Store with Add Product Modal
 * 
 * Purpose:
 * - Display products with beautiful animated cards
 * - Real-time stock updates
 * - Add products via modal
 * - Delete products with confirmation
 * 
 * Features:
 * - Grid and list view toggle
 * - Search and filter functionality
 * - Quick stock update modal
 * - Add product modal
 * - Animated stats cards
 * - Responsive design
 */

'use client';

import { motion } from 'framer-motion';
import { Package, Plus, Grid, List, Edit2, Trash2, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from '@/components/ui/SearchInput';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import StockUpdateModal from '@/components/modals/StockUpdateModal';
import AddProductModal from '@/components/modals/AddProductModal';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { useProductStore } from '@/store/useProductStore';

type SortBy = 'name' | 'stock' | 'price' | 'status';

export default function ProductsPage() {
  const router = useRouter();
  const { addNotification } = useUIStore();
  
  // Get from store
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateStock = useProductStore((state) => state.updateStock);
  const getStats = useProductStore((state) => state.getStats);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.sku.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

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
  }, [products, debouncedSearch, statusFilter, sortBy]);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const stockStats = getStats();

  const handleStockUpdate = (productId: string, newStock: number, reason: string) => {
    updateStock(productId, newStock, reason);
    addNotification('success', `Stock updated successfully!`);
  };

  const handleOpenStockModal = (product: any) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProduct(productId);
      addNotification('success', `${productName} deleted successfully`);
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
            Stock
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage your product inventory • {filteredProducts.length} of {stockStats.total} items
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Products Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
          className="relative glass-effect rounded-xl p-5 border border-border dark:border-border overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-4 h-4 text-accent" />
              </motion.div>
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary mb-1 font-medium">Total Products</p>
            <p className="text-3xl font-bold text-primary dark:text-primary">{stockStats.total}</p>
          </div>
        </motion.div>

        {/* In Stock Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
          className="relative glass-effect rounded-xl p-5 border border-border dark:border-border overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                <Package className="w-5 h-5 text-success" />
              </div>
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <TrendingUp className="w-4 h-4 text-success" />
              </motion.div>
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary mb-1 font-medium">In Stock</p>
            <p className="text-3xl font-bold text-success">{stockStats.inStock}</p>
          </div>
        </motion.div>

        {/* Low Stock Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
          className="relative glass-effect rounded-xl p-5 border border-border dark:border-border overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <TrendingDown className="w-4 h-4 text-warning" />
              </motion.div>
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary mb-1 font-medium">Low Stock</p>
            <p className="text-3xl font-bold text-warning">{stockStats.lowStock}</p>
          </div>
        </motion.div>

        {/* Out of Stock Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
          className="relative glass-effect rounded-xl p-5 border border-border dark:border-border overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-error/10 group-hover:bg-error/20 transition-colors">
                <Package className="w-5 h-5 text-error" />
              </div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <AlertCircle className="w-4 h-4 text-error" />
              </motion.div>
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary mb-1 font-medium">Out of Stock</p>
            <p className="text-3xl font-bold text-error">{stockStats.outOfStock}</p>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="w-full">
          <SearchInput
            placeholder="Search products by name, SKU, or category..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:flex-none min-w-[140px] px-4 py-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="flex-1 sm:flex-none min-w-[140px] px-4 pr-10 py-2 gap-2 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all appearance-none"
            >
              <option value="name">Sort by Name</option>
              <option value="stock">Sort by Stock</option>
              <option value="price">Sort by Price</option>
              <option value="status">Sort by Status</option>
            </select>

          </div>
          
          <div className="flex border border-border dark:border-border rounded-lg overflow-hidden self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent text-white'
                  : 'hover:bg-sidebar-hover text-text-primary dark:text-text-primary'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-all ${
                viewMode === 'list'
                  ? 'bg-accent text-white'
                  : 'hover:bg-sidebar-hover text-text-primary dark:text-text-primary'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description="Try adjusting your search or filters, or add a new product."
          action={{
            label: 'Add Product',
            onClick: () => setIsAddModalOpen(true),
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <AnimatedProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={() => router.push(`/dashboard/products/${product.id}`)}
              onStockUpdate={handleOpenStockModal}
              onDelete={handleDeleteProduct}
              getStatusVariant={getStatusVariant}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect rounded-xl border border-border dark:border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background-secondary dark:bg-background-secondary">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">Per Unit Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">On Hand</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">Free to Use</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-text-primary dark:text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02 * index }}
                    whileHover={{ backgroundColor: 'var(--sidebar-hover)', scale: 1.01 }}
                    className="transition-all cursor-pointer"
                    onClick={() => router.push(`/dashboard/products/${product.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="p-2 rounded-lg bg-accent/10"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Package className="w-5 h-5 text-accent" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-text-primary dark:text-text-primary">{product.name}</p>
                          <p className="text-sm text-text-tertiary dark:text-text-tertiary">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-primary dark:text-text-primary font-medium">{formatCurrency(product.unitPrice)}</p>
                      <p className="text-xs text-text-tertiary dark:text-text-tertiary">per {product.unit}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-semibold ${
                        product.stock <= product.minStockLevel ? 'text-error' : 
                        product.stock <= product.minStockLevel * 2 ? 'text-warning' : 'text-success'
                      }`}>
                        {product.stock}
                      </p>
                      <p className="text-xs text-text-tertiary dark:text-text-tertiary">Min: {product.minStockLevel}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-primary dark:text-text-primary font-medium">{product.stock}</p>
                      <p className="text-xs text-text-tertiary dark:text-text-tertiary">{product.warehouse}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(product.status)}>
                        {product.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenStockModal(product);
                          }}
                          className="p-2 rounded-lg hover:bg-info/10 transition-colors"
                          title="Update Stock"
                        >
                          <Edit2 className="w-4 h-4 text-info" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: -15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id, product.name);
                          }}
                          className="p-2 rounded-lg hover:bg-error/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-background-secondary dark:bg-background-secondary border-t border-border dark:border-border">
            <p className="text-sm text-text-secondary dark:text-text-secondary">
              Showing {filteredProducts.length} of {stockStats.total} products
            </p>
          </div>
        </motion.div>
      )}

      {/* Stock Update Modal */}
      {selectedProduct && (
        <StockUpdateModal
          isOpen={isStockModalOpen}
          onClose={() => {
            setIsStockModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdate={handleStockUpdate}
        />
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

// AnimatedProductCard Component
function AnimatedProductCard({ product, index, onClick, onStockUpdate, onDelete, getStatusVariant }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.05 * index, type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3, type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.98 }}
      className="relative glass-effect rounded-2xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent hover:shadow-large transition-all cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100"
        initial={false}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.6 }}
      />

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onStockUpdate(product);
          }}
          className="p-2 rounded-lg bg-info text-white shadow-medium hover:bg-info/90"
          title="Update Stock"
        >
          <Edit2 className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id, product.name);
          }}
          className="p-2 rounded-lg bg-error text-white shadow-medium hover:bg-error/90"
          title="Delete Product"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Package className="w-7 h-7 text-accent" />
          </motion.div>
          <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
            <Badge variant={getStatusVariant(product.status)}>
              {product.status.replace('-', ' ')}
            </Badge>
          </motion.div>
        </div>

        <h3 className="text-lg font-bold text-primary dark:text-primary mb-1 truncate group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
          {product.sku} • {product.category}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-2 rounded-lg">
            <span className="text-text-secondary dark:text-text-secondary">Stock:</span>
            <span className={`font-bold text-base ${
              product.stock <= product.minStockLevel ? 'text-error' : 'text-primary dark:text-primary'
            }`}>
              {product.stock} / {product.maxStockLevel}
            </span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-lg">
            <span className="text-text-secondary dark:text-text-secondary">Location:</span>
            <span className="text-primary dark:text-primary font-medium">{product.warehouse}</span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-lg">
            <span className="text-text-secondary dark:text-text-secondary">Unit Price:</span>
            <span className="font-bold text-primary dark:text-primary">
              {formatCurrency(product.unitPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border dark:border-border p-2 rounded-lg bg-accent/5">
            <span className="text-text-secondary dark:text-text-secondary font-medium">Total Value:</span>
            <span className="font-bold text-lg text-accent">
              {formatCurrency(product.totalValue)}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
