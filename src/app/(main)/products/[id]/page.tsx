'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Package, Save, X, Edit, Trash2 } from 'lucide-react';
import dummyData from '@/data/dummy.json';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isEditMode, setIsEditMode] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
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

  useEffect(() => {
    const foundProduct = dummyData.products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setFormData(foundProduct);
    }
  }, [id]);

  if (!product || !formData) {
    return (
      <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
        <div className="text-center py-12">
          <p className="text-text-tertiary">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;

    setFormData((prev: any) => ({ ...prev, [name]: parsedValue }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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

    // Simulate API call
    setTimeout(() => {
      console.log('Updating product:', formData);
      alert(`Product "${formData.name}" updated successfully!`);
      setProduct(formData);
      setIsEditMode(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(product);
    setErrors({});
    setIsEditMode(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      alert(`Product "${product.name}" deleted successfully!`);
      router.push('/products');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-6">
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
          <span className="font-medium text-primary">{product.name}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-background-secondary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">{product.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-text-secondary">{product.sku}</p>
                  <Badge variant={getStatusBadgeVariant(product.status)} className="text-xs">
                    {product.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)} className="h-9">
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete} className="h-9">
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Delete
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Form/Details */}
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
                {isEditMode ? (
                  <>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`h-9 ${errors.name ? 'border-error' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
                  </>
                ) : (
                  <p className="text-text-primary">{product.name}</p>
                )}
              </div>

              {/* SKU */}
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">SKU</Label>
                {isEditMode ? (
                  <>
                    <Input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      className={`h-9 ${errors.sku ? 'border-error' : ''}`}
                    />
                    {errors.sku && <p className="mt-1 text-sm text-error">{errors.sku}</p>}
                  </>
                ) : (
                  <p className="text-text-primary font-mono">{product.sku}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Category</Label>
                {isEditMode ? (
                  <Select value={formData.category} onValueChange={(val) => setFormData((prev: any) => ({ ...prev, category: val }))}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-text-primary">{product.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Stock Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Current Stock</Label>
                {isEditMode ? (
                  <Input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="h-9"
                  />
                ) : (
                  <p className={`text-text-primary font-semibold ${product.stock <= product.minStockLevel ? 'text-error' :
                      product.stock <= product.minStockLevel * 2 ? 'text-warning' : 'text-success'
                    }`}>
                    {product.stock} {product.unit}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Min Stock Level</Label>
                {isEditMode ? (
                  <Input
                    type="number"
                    name="minStockLevel"
                    value={formData.minStockLevel}
                    onChange={handleChange}
                    min="0"
                    className="h-9"
                  />
                ) : (
                  <p className="text-text-primary">{product.minStockLevel}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Max Stock Level</Label>
                {isEditMode ? (
                  <Input
                    type="number"
                    name="maxStockLevel"
                    value={formData.maxStockLevel}
                    onChange={handleChange}
                    min="0"
                    className="h-9"
                  />
                ) : (
                  <p className="text-text-primary">{product.maxStockLevel}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Unit */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Unit Price</Label>
                {isEditMode ? (
                  <Input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="h-9"
                  />
                ) : (
                  <p className="text-text-primary font-semibold">${product.unitPrice.toFixed(2)}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Unit</Label>
                {isEditMode ? (
                  <Select value={formData.unit} onValueChange={(val) => setFormData((prev: any) => ({ ...prev, unit: val }))}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-text-primary">{product.unit}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Total Value</Label>
                <p className="text-text-primary font-bold text-lg text-accent">
                  ${(formData.stock * formData.unitPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Storage Location */}
          <div>
            <h2 className="text-base font-semibold text-primary mb-4">Storage Location</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Warehouse</Label>
                {isEditMode ? (
                  <Select value={formData.warehouse} onValueChange={(val) => setFormData((prev: any) => ({ ...prev, warehouse: val }))}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map(wh => (
                        <SelectItem key={wh} value={wh}>{wh}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-text-primary">{product.warehouse}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-text-secondary mb-2">Location</Label>
                {isEditMode ? (
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="h-9"
                  />
                ) : (
                  <p className="text-text-primary">{product.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {isEditMode && (
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
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
