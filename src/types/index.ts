export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  warehouse: string;
  phone?: string;
  department?: string;
  avatar?: string;
}

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

export interface Receipt {
  id: string;
  receiptNumber: string;
  warehouse: string;
  warehouseId: string;
  supplier: string;
  supplierContact: string;
  date: string;
  expectedDate: string;
  status: 'completed' | 'pending';
  items: ReceiptItem[];
  totalValue: number;
  receivedBy: string;
  receivedByName: string;
  notes: string;
}

export interface ReceiptItem {
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
  status: 'dispatched' | 'pending';
  items: DeliveryItem[];
  totalValue: number;
  deliveredBy: string;
  deliveredByName: string;
  trackingNumber: string;
  notes: string;
}

export interface DeliveryItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface StockMove {
  id: string;
  moveNumber: string;
  type: 'transfer' | 'adjustment';
  fromWarehouse?: string;
  fromWarehouseId?: string;
  toWarehouse?: string;
  toWarehouseId?: string;
  warehouse?: string;
  warehouseId?: string;
  fromLocation?: string;
  toLocation?: string;
  location?: string;
  product: string;
  productName: string;
  quantity: number;
  date: string;
  status: 'completed' | 'pending';
  initiatedBy: string;
  initiatedByName: string;
  reason: string;
  notes: string;
}

export interface KPI {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  pendingReceipts: number;
  pendingDeliveries: number;
  totalValue: number;
  warehouseUtilization: number;
  totalTransactions: number;
  monthlyGrowth: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  icon: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
}
