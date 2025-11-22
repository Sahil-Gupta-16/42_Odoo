/**
 * StockUpdateModal Component
 * 
 * Purpose:
 * - Allow users to update product stock quickly
 * - Add or remove stock quantities
 * - Show current stock level and limits
 * - Record reason for stock adjustment
 * 
 * Features:
 * - Quick increment/decrement buttons
 * - Manual quantity input
 * - Stock limits validation
 * - Reason dropdown
 * - Animated transitions
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Package, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useUIStore } from '@/store/useUIStore';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unit: string;
}

interface StockUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onUpdate: (productId: string, newStock: number, reason: string) => void;
}

export default function StockUpdateModal({ isOpen, onClose, product, onUpdate }: StockUpdateModalProps) {
  const { addNotification } = useUIStore();
  const [quantity, setQuantity] = useState(product.stock);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const difference = quantity - product.stock;

  const handleIncrement = () => {
    if (quantity < product.maxStockLevel) {
      setQuantity(quantity + 1);
    } else {
      addNotification('warning', 'Maximum stock level reached');
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuickAdjust = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 0 && newQuantity <= product.maxStockLevel) {
      setQuantity(newQuantity);
    } else if (newQuantity > product.maxStockLevel) {
      addNotification('warning', 'Maximum stock level reached');
    } else {
      addNotification('warning', 'Stock cannot be negative');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      addNotification('error', 'Please select a reason for stock adjustment');
      return;
    }

    if (quantity === product.stock) {
      addNotification('info', 'No changes made to stock level');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onUpdate(product.id, quantity, reason);
      addNotification('success', `Stock updated successfully for ${product.name}`);
      setIsLoading(false);
      onClose();
    }, 1000);
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface dark:bg-surface rounded-2xl shadow-large border border-border dark:border-border w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border dark:border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary dark:text-primary">
                      Update Stock
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      {product.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Current Stock Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background-secondary dark:bg-background-secondary">
                    <p className="text-xs text-text-tertiary dark:text-text-tertiary mb-1">Current</p>
                    <p className="text-lg font-bold text-primary dark:text-primary">
                      {product.stock}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary dark:bg-background-secondary">
                    <p className="text-xs text-text-tertiary dark:text-text-tertiary mb-1">Min</p>
                    <p className="text-lg font-bold text-warning">
                      {product.minStockLevel}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary dark:bg-background-secondary">
                    <p className="text-xs text-text-tertiary dark:text-text-tertiary mb-1">Max</p>
                    <p className="text-lg font-bold text-success">
                      {product.maxStockLevel}
                    </p>
                  </div>
                </div>

                {/* Quick Adjust Buttons */}
                {/* <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-3">
                    Quick Adjust
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[-10, -5, +5, +10].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAdjust(amount)}
                        className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                          amount < 0
                            ? 'bg-error/10 text-error hover:bg-error/20'
                            : 'bg-success/10 text-success hover:bg-success/20'
                        }`}
                      >
                        {amount > 0 ? '+' : ''}{amount}
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                    New Stock Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="p-3 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                      min="0"
                      max={product.maxStockLevel}
                      className="flex-1 text-center text-2xl font-bold px-4 py-3 rounded-lg border border-border dark:border-border bg-background dark:bg-background text-primary dark:text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                    
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="p-3 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-text-tertiary dark:text-text-tertiary mt-2 text-center">
                    Unit: {product.unit}
                  </p>
                </div>

                {/* Difference Indicator */}
                {difference !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      difference > 0
                        ? 'bg-success/10 border border-success/20'
                        : 'bg-error/10 border border-error/20'
                    }`}
                  >
                    <AlertCircle className={`w-5 h-5 ${
                      difference > 0 ? 'text-success' : 'text-error'
                    }`} />
                    <div>
                      <p className={`font-semibold ${
                        difference > 0 ? 'text-success' : 'text-error'
                      }`}>
                        {difference > 0 ? 'Adding' : 'Removing'} {Math.abs(difference)} {product.unit}
                      </p>
                      <p className="text-sm text-text-secondary dark:text-text-secondary">
                        {product.stock} → {quantity}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Reason Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                    Reason for Adjustment <span className="text-error">*</span>
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <option value="">Select a reason</option>
                    <option value="Stock Receipt">Stock Receipt</option>
                    <option value="Stock Return">Stock Return</option>
                    <option value="Damaged Goods">Damaged Goods</option>
                    <option value="Theft/Loss">Theft/Loss</option>
                    <option value="Inventory Count Correction">Inventory Count Correction</option>
                    <option value="Customer Return">Customer Return</option>
                    <option value="Supplier Adjustment">Supplier Adjustment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={quantity === product.stock || !reason}
                    className="flex-1"
                  >
                    Update Stock
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
