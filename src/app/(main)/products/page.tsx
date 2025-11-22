"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ArrowUpDown,
    Download,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Package,
    Edit,
    Trash2,
    Eye
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useInventoryStore } from "@/store/useInventoryStore";
import dummyData from "@/data/dummy.json";

export default function ProductsPage() {
    const router = useRouter();
    const { addNotification } = useUIStore();
    const { products, deleteProduct } = useInventoryStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "in-stock": return "text-success bg-success/10";
            case "low-stock": return "text-warning bg-warning/10";
            case "out-of-stock": return "text-error bg-error/10";
            default: return "text-text-secondary bg-gray-100 dark:bg-gray-800";
        }
    };

    const handleDelete = (productId: string, productName: string) => {
        if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
            deleteProduct(productId);
            addNotification("success", `Product "${productName}" deleted successfully`);
            // For now, we can't actually delete from the JSON file, but we simulate the action
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Page Header */}
            <div className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">Products</h1>
                        <p className="text-sm text-text-secondary mt-1">
                            Manage your inventory items and stock levels
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-sidebar-hover transition-colors text-sm font-medium">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={() => router.push("/products/new")}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-text-inverse rounded-lg hover:bg-primary-light transition-colors text-sm font-medium shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search products by name or SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {["All", ...dummyData.categories.map(c => c.name)].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? "bg-accent text-white"
                                    : "bg-background border border-border hover:bg-sidebar-hover text-text-secondary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="glass-effect rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-secondary uppercase bg-background-secondary border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product Details</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Stock Level</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-sidebar-hover/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-primary">{product.name}</div>
                                                <div className="text-xs text-text-tertiary">{product.sku}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background border border-border text-text-secondary">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-primary">
                                                {product.stock} {product.unit}
                                            </span>
                                            <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${product.stock <= product.minStockLevel ? "bg-error" : "bg-success"
                                                        }`}
                                                    style={{
                                                        width: `${Math.min((product.stock / product.maxStockLevel) * 100, 100)}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-primary">
                                        ${product.unitPrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                            {product.status === "in-stock" && <CheckCircle2 className="w-3.5 h-3.5" />}
                                            {product.status === "low-stock" && <AlertTriangle className="w-3.5 h-3.5" />}
                                            {product.status === "out-of-stock" && <XCircle className="w-3.5 h-3.5" />}
                                            <span className="capitalize">{product.status.replace("-", " ")}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => router.push(`/products/${product.id}`)}
                                                className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/products/${product.id}/edit`)}
                                                className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="p-2 rounded-lg hover:bg-error/10 text-text-secondary hover:text-error transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-text-tertiary" />
                        </div>
                        <h3 className="text-lg font-medium text-primary mb-1">No products found</h3>
                        <p className="text-text-secondary">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
