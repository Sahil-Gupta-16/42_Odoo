/**
 * Product Store - Centralized State Management
 * 
 * Purpose:
 * - Manage all product state globally
 * - Handle CRUD operations
 * - Automatic status calculations
 * - Persist data across components
 * 
 * Features:
 * - Add, update, delete products
 * - Stock updates with reason tracking
 * - Filter and search products
 * - Stats calculations
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dummyData from '@/data/dummy.json';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitPrice: number;
  totalValue: number;
  unit: string;
  warehouse: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface ProductStore {
  products: Product[];
  
  // Actions
  addProduct: (product: Omit<Product, 'id' | 'totalValue' | 'status'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number, reason: string) => void;
  
  // Getters
  getProductById: (id: string) => Product | undefined;
  getStats: () => {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

export const useProductStore = create<ProductStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      products: dummyData.products as Product[],

      // Add new product
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `PRD-${Date.now()}`,
          totalValue: product.stock * product.unitPrice,
          status: product.stock === 0 
            ? 'out-of-stock' 
            : product.stock <= product.minStockLevel 
            ? 'low-stock' 
            : 'in-stock',
        };

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      // Update existing product
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) => {
            if (product.id === id) {
              const updatedProduct = { ...product, ...updates };
              
              // Recalculate total value if stock or price changed
              if (updates.stock !== undefined || updates.unitPrice !== undefined) {
                updatedProduct.totalValue = updatedProduct.stock * updatedProduct.unitPrice;
              }
              
              // Recalculate status if stock or minStockLevel changed
              if (updates.stock !== undefined || updates.minStockLevel !== undefined) {
                if (updatedProduct.stock === 0) {
                  updatedProduct.status = 'out-of-stock';
                } else if (updatedProduct.stock <= updatedProduct.minStockLevel) {
                  updatedProduct.status = 'low-stock';
                } else {
                  updatedProduct.status = 'in-stock';
                }
              }
              
              return updatedProduct;
            }
            return product;
          }),
        }));
      },

      // Delete product
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      // Update stock with reason
      updateStock: (id, newStock, reason) => {
        set((state) => ({
          products: state.products.map((product) => {
            if (product.id === id) {
              const status = 
                newStock === 0 
                  ? 'out-of-stock' 
                  : newStock <= product.minStockLevel 
                  ? 'low-stock' 
                  : 'in-stock';

              return {
                ...product,
                stock: newStock,
                status,
                totalValue: newStock * product.unitPrice,
              };
            }
            return product;
          }),
        }));
        
        console.log('Stock updated:', { id, newStock, reason });
      },

      // Get product by ID
      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },

      // Get statistics
      getStats: () => {
        const products = get().products;
        return {
          total: products.length,
          inStock: products.filter((p) => p.status === 'in-stock').length,
          lowStock: products.filter((p) => p.status === 'low-stock').length,
          outOfStock: products.filter((p) => p.status === 'out-of-stock').length,
        };
      },
    }),
    { name: 'ProductStore' }
  )
);
