/**
 * Add Product Page
 * 
 * Purpose:
 * - Create new products
 * - Form validation
 * - Automatic calculations
 * - Warehouse and category management
 * 
 * Features:
 * - Multi-step form
 * - Real-time validation
 * - Auto SKU generation
 * - Price calculations
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Save, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useProductStore } from '@/store/useProductStore';
import { useUIStore } from '@/store/useUIStore';
import AddProductModal from '@/components/modals/AddProductModal';
export default function AddProductPage() {
  const router = useRouter();
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      setErrors(prev => ({ ...prev, [name]: '' }));
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

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (formData.minStockLevel < 0) {
      newErrors.minStockLevel = 'Minimum stock level cannot be negative';
    }

    if (formData.maxStockLevel <= formData.minStockLevel) {
      newErrors.maxStockLevel = 'Maximum stock level must be greater than minimum';
    }

    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'Unit price must be greater than 0';
    }

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
      router.push('/dashboard/products');
    }, 1000);
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      router.push('/dashboard/products');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary mb-1">
              Add New Product
            </h1>
            <p className="text-sm text-text-secondary dark:text-text-secondary">
              Fill in the product details below
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass-effect rounded-2xl border border-border dark:border-border p-8 space-y-6"
      >
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-bold text-primary dark:text-primary mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                Product Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              />
              {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
            </div>

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
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    errors.sku ? 'border-error' : 'border-border dark:border-border'
                  } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
                />
                <Button type="button" variant="secondary" onClick={handleGenerateSKU}>
                  Generate
                </Button>
              </div>
              {errors.sku && <p className="mt-1 text-sm text-error">{errors.sku}</p>}
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-error">{errors.category}</p>}
            </div>
          </div>
        </div>

        {/* Stock Information */}
        <div>
          <h2 className="text-xl font-bold text-primary dark:text-primary mb-4">
            Stock Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.stock ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              />
              {errors.stock && <p className="mt-1 text-sm text-error">{errors.stock}</p>}
            </div>

            {/* Min Stock Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                Minimum Stock Level <span className="text-error">*</span>
              </label>
              <input
                type="number"
                name="minStockLevel"
                value={formData.minStockLevel}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.minStockLevel ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              />
              {errors.minStockLevel && <p className="mt-1 text-sm text-error">{errors.minStockLevel}</p>}
            </div>

            {/* Max Stock Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                Maximum Stock Level <span className="text-error">*</span>
              </label>
              <input
                type="number"
                name="maxStockLevel"
                value={formData.maxStockLevel}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.maxStockLevel ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              />
              {errors.maxStockLevel && <p className="mt-1 text-sm text-error">{errors.maxStockLevel}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Unit */}
        <div>
          <h2 className="text-xl font-bold text-primary dark:text-primary mb-4">
            Pricing & Unit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit Price */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                Unit Price <span className="text-error">*</span>
              </label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.unitPrice ? 'border-error' : 'border-border dark:border-border'
                } bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30`}
              />
              {errors.unitPrice && <p className="mt-1 text-sm text-error">{errors.unitPrice}</p>}
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
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-primary dark:text-primary mb-4">
            Storage Location
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Warehouse */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                Warehouse <span className="text-error">*</span>
              </label>
              <select
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
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
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
          <h3 className="font-semibold text-text-primary dark:text-text-primary mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-tertiary dark:text-text-tertiary">Initial Value:</p>
              <p className="text-lg font-bold text-accent">
                ${(formData.stock * formData.unitPrice).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-text-tertiary dark:text-text-tertiary">Status:</p>
              <p className="text-lg font-bold text-success">
                {formData.stock === 0 ? 'Out of Stock' : formData.stock <= formData.minStockLevel ? 'Low Stock' : 'In Stock'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            className="flex-1"
          >
            <X className="w-5 h-5" />
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1"
            
          >
            <Save className="w-5 h-5" />
            Add Product
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
