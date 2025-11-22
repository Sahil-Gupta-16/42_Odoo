"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    ArrowRightLeft,
    Calendar,
    FileText,
    History
} from "lucide-react";
import dummyData from "@/data/dummy.json";

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Combine all movements into a single history list
    const historyItems = [
        ...(dummyData.receipts || []).map(r => ({
            id: r.id,
            type: "receipt",
            date: r.date,
            reference: r.receiptNumber,
            description: `Received from ${r.supplier}`,
            amount: r.totalValue,
            status: r.status,
            items: r.items.length
        })),
        ...(dummyData.deliveries || []).map(d => ({
            id: d.id,
            type: "delivery",
            date: d.date,
            reference: d.deliveryNumber,
            description: `Delivered to ${d.customer}`,
            amount: d.totalValue,
            status: d.status,
            items: d.items.length
        })),
        ...(dummyData.transfers || []).map(t => ({
            id: t.id,
            type: "transfer",
            date: t.date,
            reference: t.transferNumber,
            description: `Transfer to ${t.toWarehouse}`,
            amount: 0, // Transfers might not have a value in this context
            status: t.status,
            items: t.items.length
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const filteredHistory = historyItems.filter(item => {
        const matchesSearch =
            item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || item.type === filterType;
        return matchesSearch && matchesType;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "receipt": return <ArrowDownRight className="w-4 h-4 text-success" />;
            case "delivery": return <ArrowUpRight className="w-4 h-4 text-info" />;
            case "transfer": return <ArrowRightLeft className="w-4 h-4 text-warning" />;
            default: return <FileText className="w-4 h-4 text-text-secondary" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "done": return "bg-success/10 text-success";
            case "pending": return "bg-warning/10 text-warning";
            case "draft": return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
            default: return "bg-info/10 text-info";
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
            {/* Page Header */}
            <div className="pb-4 border-b border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">Stock Ledger</h1>
                        <p className="text-sm text-text-secondary mt-1">
                            View all inventory movements and transaction history
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-sidebar-hover transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Export History
                    </button>
                </div>

                {/* Filters */}
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search by reference or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "receipt", "delivery", "transfer"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filterType === type
                                    ? "bg-accent text-white"
                                    : "bg-background border border-border hover:bg-sidebar-hover text-text-secondary"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="glass-effect rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-secondary uppercase bg-background-secondary border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Reference</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Description</th>
                                <th className="px-6 py-4 font-semibold">Items</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredHistory.map((item) => (
                                <tr key={`${item.type}-${item.id}`} className="hover:bg-sidebar-hover/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary">
                                        {item.reference}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-md bg-background border border-border`}>
                                                {getTypeIcon(item.type)}
                                            </div>
                                            <span className="capitalize">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-text-secondary">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-text-primary">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 text-text-secondary">
                                        {item.items} items
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        {item.amount > 0 ? `$${item.amount.toFixed(2)}` : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredHistory.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <History className="w-8 h-8 text-text-tertiary" />
                        </div>
                        <h3 className="text-lg font-medium text-primary mb-1">No history found</h3>
                        <p className="text-text-secondary">
                            No transactions match your current filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
