'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, MapPin, Users, Package, TrendingUp } from 'lucide-react';
import { useInventoryStore } from '@/store/useInventoryStore';

export default function WarehouseDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { warehouses, products } = useInventoryStore();

    const warehouseId = params.id as string;
    const warehouse = warehouses.find(w => w.id === warehouseId);

    // Get products in this warehouse
    const warehouseProducts = products.filter(p => p.warehouseId === warehouseId);

    if (!warehouse) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold text-primary mb-2">Warehouse not found</h1>
                <button
                    onClick={() => router.push('/warehouse')}
                    className="text-accent hover:underline"
                >
                    Go back to warehouses
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-primary" />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">{warehouse.name}</h1>
                        <p className="text-sm text-text-secondary mt-1 capitalize">{warehouse.status}</p>
                    </div>
                </div>
                <button
                    onClick={() => router.push(`/warehouse/${warehouse.id}/edit`)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-text-inverse rounded-lg hover:bg-primary-light transition-colors text-sm font-medium shadow-sm"
                >
                    <Edit className="w-4 h-4" />
                    Edit Warehouse
                </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-effect rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-accent/10">
                            <Package className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-sm font-medium text-text-secondary">Capacity</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{warehouse.capacity}</p>
                    <p className="text-xs text-text-tertiary mt-1">units</p>
                </div>

                <div className="glass-effect rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-success/10">
                            <TrendingUp className="w-5 h-5 text-success" />
                        </div>
                        <h3 className="text-sm font-medium text-text-secondary">Current Stock</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{warehouse.currentStock}</p>
                    <p className="text-xs text-text-tertiary mt-1">units</p>
                </div>

                <div className="glass-effect rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-warning/10">
                            <TrendingUp className="w-5 h-5 text-warning" />
                        </div>
                        <h3 className="text-sm font-medium text-text-secondary">Utilization</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{warehouse.utilizationPercent}%</p>
                    <div className="w-full h-1.5 bg-background-secondary rounded-full mt-2">
                        <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${warehouse.utilizationPercent}%` }}
                        />
                    </div>
                </div>

                <div className="glass-effect rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-info/10">
                            <Package className="w-5 h-5 text-info" />
                        </div>
                        <h3 className="text-sm font-medium text-text-secondary">Products</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{warehouseProducts.length}</p>
                    <p className="text-xs text-text-tertiary mt-1">items</p>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-effect rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Location Details</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-accent mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-text-secondary">Location</p>
                                <p className="text-text-primary">{warehouse.location}</p>
                            </div>
                        </div>
                        {warehouse.address && (
                            <div className="flex items-start gap-3 pt-3 border-t border-border">
                                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Address</p>
                                    <p className="text-text-primary">{warehouse.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-effect rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                    <div className="space-y-3">
                        {warehouse.manager && (
                            <div className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-accent mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Manager</p>
                                    <p className="text-text-primary">{warehouse.manager}</p>
                                </div>
                            </div>
                        )}
                        {warehouse.phone && (
                            <div className="flex items-start gap-3 pt-3 border-t border-border">
                                <Users className="w-5 h-5 text-accent mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Phone</p>
                                    <p className="text-text-primary">{warehouse.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products in Warehouse */}
            {warehouseProducts.length > 0 && (
                <div className="glass-effect rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Products in this Warehouse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {warehouseProducts.map(product => (
                            <div key={product.id} className="p-4 border border-border rounded-lg hover:border-accent/50 transition-colors cursor-pointer"
                                onClick={() => router.push(`/products/${product.id}`)}>
                                <h4 className="font-medium text-primary mb-1">{product.name}</h4>
                                <p className="text-xs text-text-tertiary mb-2">{product.sku}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary">Stock: {product.stock} {product.unit}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${product.status === 'in-stock' ? 'bg-success/10 text-success' :
                                            product.status === 'low-stock' ? 'bg-warning/10 text-warning' :
                                                'bg-error/10 text-error'
                                        }`}>
                                        {product.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
