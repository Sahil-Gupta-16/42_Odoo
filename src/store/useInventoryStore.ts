import { create } from 'zustand';
import dummyData from '@/data/dummy.json';

// Types
export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    categoryId: string;
    warehouse: string;
    warehouseId: string;
    location: string;
    stock: number;
    minStockLevel: number;
    maxStockLevel: number;
    unit: string;
    unitPrice: number;
    totalValue: number;
    supplier: string;
    supplierContact: string;
    lastRestocked: string;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
    description: string;
}

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    address: string;
    capacity: number;
    currentStock: number;
    utilizationPercent: number;
    zones: string[];
    manager: string;
    phone: string;
    status: 'active' | 'inactive';
}

export interface ReceiptItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Receipt {
    id: string;
    receiptNumber: string;
    warehouse: string;
    warehouseId: string;
    supplier: string;
    supplierContact: string;
    date: string;
    expectedDate: string;
    status: 'draft' | 'ready' | 'done';
    items: ReceiptItem[];
    totalValue: number;
    receivedBy: string;
    receivedByName: string;
    notes: string;
}

export interface DeliveryItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Delivery {
    id: string;
    deliveryNumber: string;
    warehouse: string;
    warehouseId: string;
    customer: string;
    customerContact: string;
    deliveryAddress: string;
    date: string;
    scheduledDate: string;
    status: 'draft' | 'ready' | 'waiting' | 'done';
    items: DeliveryItem[];
    totalValue: number;
    deliveredBy: string;
    deliveredByName: string;
    trackingNumber: string;
    notes: string;
}

export interface InventoryStore {
    products: Product[];
    warehouses: Warehouse[];
    receipts: Receipt[];
    deliveries: Delivery[];

    // Actions
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    addWarehouse: (warehouse: Warehouse) => void;
    updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void;
    deleteWarehouse: (id: string) => void;

    addReceipt: (receipt: Receipt) => void;
    updateReceipt: (id: string, receipt: Partial<Receipt>) => void;
    deleteReceipt: (id: string) => void;

    addDelivery: (delivery: Delivery) => void;
    updateDelivery: (id: string, delivery: Partial<Delivery>) => void;
    deleteDelivery: (id: string) => void;

    // Computed helpers (optional, but good for logic)
    updateStockLevels: (productId: string, quantityChange: number) => void;
}

export const useInventoryStore = create<InventoryStore>()((set, get) => ({
    products: dummyData.products as Product[],
    warehouses: dummyData.warehouses as Warehouse[],
    receipts: [],
    deliveries: [],

    addProduct: (product) => set((state) => ({
        products: [...state.products, product]
    })),

    updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
        )
    })),

    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
    })),

    addWarehouse: (warehouse) => set((state) => ({
        warehouses: [...state.warehouses, warehouse]
    })),

    updateWarehouse: (id, updatedWarehouse) => set((state) => ({
        warehouses: state.warehouses.map((w) =>
            w.id === id ? { ...w, ...updatedWarehouse } : w
        )
    })),

    deleteWarehouse: (id) => set((state) => ({
        warehouses: state.warehouses.filter((w) => w.id !== id)
    })),

    addReceipt: (receipt) => set((state) => ({
        receipts: [...state.receipts, receipt]
    })),

    updateReceipt: (id, updatedReceipt) => set((state) => ({
        receipts: state.receipts.map((r) =>
            r.id === id ? { ...r, ...updatedReceipt } : r
        )
    })),

    deleteReceipt: (id) => set((state) => ({
        receipts: state.receipts.filter((r) => r.id !== id)
    })),

    addDelivery: (delivery) => set((state) => ({
        deliveries: [...state.deliveries, delivery]
    })),

    updateDelivery: (id, updatedDelivery) => set((state) => ({
        deliveries: state.deliveries.map((d) =>
            d.id === id ? { ...d, ...updatedDelivery } : d
        )
    })),

    deleteDelivery: (id) => set((state) => ({
        deliveries: state.deliveries.filter((d) => d.id !== id)
    })),

    updateStockLevels: (productId, quantityChange) => set((state) => ({
        products: state.products.map((p) => {
            if (p.id === productId) {
                const newStock = p.stock + quantityChange;
                let status: Product['status'] = 'in-stock';
                if (newStock <= 0) status = 'out-of-stock';
                else if (newStock <= p.minStockLevel) status = 'low-stock';

                return { ...p, stock: newStock, status };
            }
            return p;
        })
    })),
}));
