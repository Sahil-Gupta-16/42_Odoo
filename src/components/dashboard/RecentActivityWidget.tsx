import React from 'react';
import { Clock, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import dummyData from "@/data/dummy.json";

interface RecentActivityWidgetProps {
    router: any;
    isEditMode: boolean;
}

export default function RecentActivityWidget({ router, isEditMode }: RecentActivityWidgetProps) {
    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Clock className="w-5 h-5 text-info" />
                    Recent Activity
                </h2>
            </div>
            <div className="flex-1 overflow-auto space-y-2.5 pr-2 min-h-0">
                {dummyData.receipts.slice(0, 5).map((receipt) => (
                    <motion.div
                        key={receipt.id}
                        whileHover={!isEditMode ? { x: 4 } : {}}
                        className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-success/30 flex-shrink-0"
                        onClick={() => !isEditMode && router.push("/operations/receipts")}
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-success/10">
                                <ShoppingCart className="w-5 h-5 text-success" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{receipt.receiptNumber}</p>
                                <p className="text-xs text-text-secondary truncate">{receipt.supplier}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-3">
                            <p className="font-semibold text-sm">${receipt.totalValue.toFixed(0)}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full inline-block ${receipt.status === "done" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                                {receipt.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button
                onClick={() => !isEditMode && router.push("/history")}
                className="w-full mt-4 py-2.5 text-accent hover:text-accent-dark font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
            >
                View All Activity →
            </button>
        </div>
    );
}
