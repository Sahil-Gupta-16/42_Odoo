'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Warehouse as WarehouseIcon, Edit, Trash2, Eye } from 'lucide-react';
import { useInventoryStore } from '@/store/useInventoryStore';
import { useUIStore } from '@/store/useUIStore';

export default function WarehousePage() {
    const router = useRouter();
    const { warehouses, deleteWarehouse } = useInventoryStore();
    const { addNotification } = useUIStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            deleteWarehouse(id);
            addNotification('success', `Warehouse "${name}" deleted successfully`);
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Page Header */}
            <div className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">Warehouses</h1>
                        <p className="text-sm text-text-secondary mt-1">
                            Manage your warehouse locations
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/warehouse/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-text-inverse rounded-lg hover:bg-primary-light transition-colors text-sm font-medium shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Warehouse
                    </button>
                </div>

                {/* Search */}
                <div className="mt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search warehouses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Warehouses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWarehouses.map((warehouse) => (
                    <div key={warehouse.id} className="glass-effect rounded-xl border border-border p-6 hover:border-accent/50 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                                    <WarehouseIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary">{warehouse.name}</h3>
                                    <p className="text-xs text-text-tertiary capitalize">{warehouse.status}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="text-sm">
                                <span className="text-text-secondary">Location:</span>
                                <span className="ml-2 text-primary">{warehouse.location}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-text-secondary">Capacity:</span>
                                <span className="ml-2 text-primary">{warehouse.capacity} units</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-text-secondary">Current Stock:</span>
                                <span className="ml-2 text-primary">{warehouse.currentStock} units</span>
                            </div>
                        </div>

                        {/* Utilization Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                                <span>Utilization</span>
                                <span className="font-medium text-primary">{warehouse.utilizationPercent}%</span>
                            </div>
                            <div className="w-full h-2 bg-background-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent rounded-full transition-all"
                                    style={{ width: `${warehouse.utilizationPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                            <button
                                onClick={() => router.push(`/warehouse/${warehouse.id}`)}
                                className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                                title="View"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => router.push(`/warehouse/${warehouse.id}/edit`)}
                                className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(warehouse.id, warehouse.name)}
                                className="p-2 rounded-lg hover:bg-error/10 text-text-secondary hover:text-error transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredWarehouses.length === 0 && (
                <div className="glass-effect rounded-xl border border-border p-12 text-center">
                    <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-text-tertiary" />
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-1">No warehouses found</h3>
                    <p className="text-text-secondary">
                        Try adjusting your search or add a new warehouse.
                    </p>
                </div>
            )}
        </div>
    );
}
