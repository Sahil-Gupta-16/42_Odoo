'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Package, Save, X, Sparkles } from 'lucide-react';
import { useInventoryStore } from '@/store/useInventoryStore';
import { useUIStore } from '@/store/useUIStore';
import dummyData from '@/data/dummy.json';

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useInventoryStore();
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
    supplier: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Glass Products',
    'Hardware',
    'Tools',
    'Safety Equipment',
    'Electronics',
    'Furniture',
    'Office Supplies',
    'Raw Materials',
    'Finished Goods',
    'Other',
  ];

  const warehouses = [
    'Main Warehouse',
    'Secondary Warehouse',
    'Distribution Center',
  ];

  const units = ['sheets', 'pieces', 'pcs', 'kg', 'ltr', 'box', 'carton', 'dozen'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      return;
    }

    setIsLoading(true);

    // Create the product object
    const newProduct = {
      id: `prod${Date.now()}`,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      categoryId: formData.category.toLowerCase().replace(/\s+/g, '-'),
      warehouse: formData.warehouse,
      warehouseId: formData.warehouse.toLowerCase().replace(/\s+/g, '-'),
      location: formData.location,
      stock: formData.stock,
      minStockLevel: formData.minStockLevel,
      maxStockLevel: formData.maxStockLevel,
      unit: formData.unit,
      unitPrice: formData.unitPrice,
      totalValue: formData.stock * formData.unitPrice,
      supplier: formData.supplier,
      supplierContact: '',
      lastRestocked: new Date().toISOString().split('T')[0],
      status: (formData.stock === 0 ? 'out-of-stock' :
        formData.stock <= formData.minStockLevel ? 'low-stock' :
          'in-stock') as 'in-stock' | 'low-stock' | 'out-of-stock',
      description: '',
    };

    // Add to store
    addProduct(newProduct);
    addNotification('success', `Product "${formData.name}" added successfully!`);

    setIsLoading(false);
    router.push('/products');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      router.push('/products');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/products')}>Products</span>
          <span>/</span>
          <span className="font-medium text-primary">New</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-background-secondary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">Add New Product</h1>
              <p className="text-sm text-text-secondary">Fill in the product details below</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Product Name <span className="text-error">*</span>
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={`h-9 ${errors.name ? 'border-error' : ''}`}
                />
                {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
              </div>

              {/* SKU */}
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  SKU <span className="text-error">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Product SKU"
                    className={`h-9 flex-1 ${errors.sku ? 'border-error' : ''}`}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleGenerateSKU} className="h-9 px-3">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
                {errors.sku && <p className="mt-1 text-sm text-error">{errors.sku}</p>}
              </div>

              {/* Category */}
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Category <span className="text-error">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}>
                  <SelectTrigger className={`h-9 ${errors.category ? 'border-error' : ''}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="mt-1 text-sm text-error">{errors.category}</p>}
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Stock Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Initial Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`h-9 ${errors.stock ? 'border-error' : ''}`}
                />
                {errors.stock && <p className="mt-1 text-sm text-error">{errors.stock}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Minimum Stock Level <span className="text-error">*</span>
                </Label>
                <Input
                  type="number"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleChange}
                  min="0"
                  className={`h-9 ${errors.minStockLevel ? 'border-error' : ''}`}
                />
                {errors.minStockLevel && <p className="mt-1 text-sm text-error">{errors.minStockLevel}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Maximum Stock Level <span className="text-error">*</span>
                </Label>
                <Input
                  type="number"
                  name="maxStockLevel"
                  value={formData.maxStockLevel}
                  onChange={handleChange}
                  min="0"
                  className={`h-9 ${errors.maxStockLevel ? 'border-error' : ''}`}
                />
                {errors.maxStockLevel && <p className="mt-1 text-sm text-error">{errors.maxStockLevel}</p>}
              </div>
            </div>
          </div>

          {/* Pricing & Unit */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Pricing & Unit</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Unit Price <span className="text-error">*</span>
                </Label>
                <Input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`h-9 ${errors.unitPrice ? 'border-error' : ''}`}
                />
                {errors.unitPrice && <p className="mt-1 text-sm text-error">{errors.unitPrice}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Unit <span className="text-error">*</span>
                </Label>
                <Select value={formData.unit} onValueChange={(val) => setFormData(prev => ({ ...prev, unit: val }))}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Storage Location */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Storage Location</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Warehouse <span className="text-error">*</span>
                </Label>
                <Select value={formData.warehouse} onValueChange={(val) => setFormData(prev => ({ ...prev, warehouse: val }))}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map(wh => (
                      <SelectItem key={wh} value={wh}>{wh}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">
                  Location <span className="text-error">*</span>
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., A-01, B-23"
                  className="h-9"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-tertiary mb-1">Initial Value</p>
                <p className="text-xl font-bold text-accent">
                  ${(formData.stock * formData.unitPrice).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Status</p>
                <p className={`text-xl font-bold ${formData.stock === 0 ? 'text-error' :
                  formData.stock <= formData.minStockLevel ? 'text-warning' : 'text-success'
                  }`}>
                  {formData.stock === 0 ? 'Out of Stock' :
                    formData.stock <= formData.minStockLevel ? 'Low Stock' : 'In Stock'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-9"
            >
              <X className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-9"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1.5" />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
