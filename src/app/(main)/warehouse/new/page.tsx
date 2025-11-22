'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { useInventoryStore, Warehouse } from '@/store/useInventoryStore';
import { useUIStore } from '@/store/useUIStore';

export default function NewWarehousePage() {
    const router = useRouter();
    const { addWarehouse } = useInventoryStore();
    const { addNotification } = useUIStore();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        address: '',
        capacity: 0,
        manager: '',
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newWarehouse: Warehouse = {
            id: `wh${Date.now()}`,
            ...formData,
            currentStock: 0,
            utilizationPercent: 0,
            zones: [],
            status: 'active',
        };

        addWarehouse(newWarehouse);
        addNotification('success', `Warehouse "${newWarehouse.name}" added successfully`);
        router.push('/warehouse');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 pb-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-sidebar-hover rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-primary">Add New Warehouse</h1>
                    <p className="text-sm text-text-secondary mt-1">Create a new warehouse location</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-effect rounded-xl border border-border p-6 space-y-6">
                {/* Warehouse Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-primary border-b border-border pb-2">
                        Warehouse Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Warehouse Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Capacity *
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Address
                            </label>
                            <textarea
                                rows={3}
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-primary border-b border-border pb-2">
                        Contact Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Manager Name
                            </label>
                            <input
                                type="text"
                                value={formData.manager}
                                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-border rounded-lg hover:bg-sidebar-hover transition-colors text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-text-inverse rounded-lg hover:bg-primary-light transition-colors text-sm font-medium shadow-sm"
                    >
                        <Save className="w-4 h-4" />
                        Save Warehouse
                    </button>
                </div>
            </form>
        </div>
    );
}
