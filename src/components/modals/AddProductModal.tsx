/**
 * AddProductModal Component
 * 
 * Purpose:
 * - Create new products via modal
 * - Form validation
 * - Automatic calculations
 * - Clean, organized layout
 * 
 * Features:
 * - Multi-section form
 * - Real-time validation
 * - Auto SKU generation
 * - Responsive design
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Save, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useProductStore } from '@/store/useProductStore';
import { useUIStore } from '@/store/useUIStore';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const addProduct = useProductStore((state) => state.addProduct);
  const { addNotification } = useUIStore();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: 0,
    minStockLevel: 10,
    maxStockLevel: 1000,
    unitPrice: 0,
    unit: 'pcs',
    warehouse: 'Main Warehouse',
    location: 'A-01',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Electronics',
    'Furniture',
    'Office Supplies',
    'Tools',
    'Raw Materials',
    'Finished Goods',
    'Other',
  ];

  const warehouses = [
    'Main Warehouse',
    'Secondary Warehouse',
    'Distribution Center',
  ];

  const units = ['pcs', 'kg', 'ltr', 'box', 'carton', 'dozen'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 3).toUpperCase() || 'PRD';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}-${random}${timestamp}`;
  };

  const handleGenerateSKU = () => {
    setFormData(prev => ({ ...prev, sku: generateSKU() }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (formData.minStockLevel < 0) newErrors.minStockLevel = 'Min stock cannot be negative';
    if (formData.maxStockLevel <= formData.minStockLevel) {
      newErrors.maxStockLevel = 'Max stock must be greater than min stock';
    }
    if (formData.unitPrice <= 0) newErrors.unitPrice = 'Unit price must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification('error', 'Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addProduct(formData);
      addNotification('success', `${formData.name} added successfully!`);
      handleClose();
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      stock: 0,
      minStockLevel: 10,
      maxStockLevel: 1000,
      unitPrice: 0,
      unit: 'pcs',
      warehouse: 'Main Warehouse',
      location: 'A-01',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface dark:bg-surface rounded-2xl shadow-large border border-border dark:border-border w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border dark:border-border bg-background-secondary dark:bg-background-secondary">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary dark:text-primary">
                      Add New Product
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      Fill in the product details
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Form Content - Scrollable */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary uppercase tracking-wide">
                      Basic Information
                    </h3>
                    
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                        Product Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Wireless Mouse, Office Chair"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.name ? 'border-error' : 'border-border dark:border-border'
                        } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                      />
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs text-error"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* SKU & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* SKU */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          SKU <span className="text-error">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="Product SKU"
                            className={`flex-1 px-4 py-2.5 rounded-lg border ${
                              errors.sku ? 'border-error' : 'border-border dark:border-border'
                            } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                          />
                          <button
                            type="button"
                            onClick={handleGenerateSKU}
                            className="px-4 py-2.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                            title="Generate SKU"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                        {errors.sku && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.sku}
                          </motion.p>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Category <span className="text-error">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.category ? 'border-error' : 'border-border dark:border-border'
                          } bg-background dark:bg-background text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                        >
                          <option value="">Select category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.category}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stock Levels */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary uppercase tracking-wide">
                      Stock Levels
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* Initial Stock */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Initial Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          min="0"
                          placeholder="0"
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.stock ? 'border-error' : 'border-border dark:border-border'
                          } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                        />
                        {errors.stock && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.stock}
                          </motion.p>
                        )}
                      </div>

                      {/* Min Stock */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Min Stock <span className="text-error">*</span>
                        </label>
                        <input
                          type="number"
                          name="minStockLevel"
                          value={formData.minStockLevel}
                          onChange={handleChange}
                          min="0"
                          placeholder="10"
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.minStockLevel ? 'border-error' : 'border-border dark:border-border'
                          } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                        />
                        {errors.minStockLevel && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.minStockLevel}
                          </motion.p>
                        )}
                      </div>

                      {/* Max Stock */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Max Stock <span className="text-error">*</span>
                        </label>
                        <input
                          type="number"
                          name="maxStockLevel"
                          value={formData.maxStockLevel}
                          onChange={handleChange}
                          min="0"
                          placeholder="1000"
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.maxStockLevel ? 'border-error' : 'border-border dark:border-border'
                          } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                        />
                        {errors.maxStockLevel && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.maxStockLevel}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Unit */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary uppercase tracking-wide">
                      Pricing & Unit
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Unit Price */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Unit Price <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
                          <input
                            type="number"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className={`w-full pl-8 pr-4 py-2.5 rounded-lg border ${
                              errors.unitPrice ? 'border-error' : 'border-border dark:border-border'
                            } bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all`}
                          />
                        </div>
                        {errors.unitPrice && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-error"
                          >
                            {errors.unitPrice}
                          </motion.p>
                        )}
                      </div>

                      {/* Unit */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Unit <span className="text-error">*</span>
                        </label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-background dark:bg-background text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                        >
                          {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Storage Location */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary uppercase tracking-wide">
                      Storage Location
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Warehouse */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Warehouse <span className="text-error">*</span>
                        </label>
                        <select
                          name="warehouse"
                          value={formData.warehouse}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-background dark:bg-background text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                        >
                          {warehouses.map(wh => (
                            <option key={wh} value={wh}>{wh}</option>
                          ))}
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                          Location <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g., A-01, B-23"
                          className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-background dark:bg-background text-text-primary dark:text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-accent/5 border border-accent/20"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-text-tertiary dark:text-text-tertiary mb-1">Initial Value</p>
                        <p className="text-xl font-bold text-accent">
                          ${(formData.stock * formData.unitPrice).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-tertiary dark:text-text-tertiary mb-1">Initial Status</p>
                        <p className={`text-xl font-bold ${
                          formData.stock === 0 ? 'text-error' : 
                          formData.stock <= formData.minStockLevel ? 'text-warning' : 'text-success'
                        }`}>
                          {formData.stock === 0 ? 'Out of Stock' : 
                           formData.stock <= formData.minStockLevel ? 'Low Stock' : 'In Stock'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border dark:border-border bg-background-secondary dark:bg-background-secondary flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4" />
                    Add Product
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
