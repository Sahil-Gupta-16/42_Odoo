import React from 'react';
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import dummyData from "@/data/dummy.json";

interface StockAlertsWidgetProps {
    router: any;
    isEditMode: boolean;
}

export default function StockAlertsWidget({ router, isEditMode }: StockAlertsWidgetProps) {
    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Stock Alerts
                </h2>
            </div>
            <div className="flex-1 overflow-auto space-y-2.5 pr-2 min-h-0">
                {dummyData.products.filter((p) => p.status !== "in-stock").map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={!isEditMode ? { x: 4 } : {}}
                        className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-warning/30 flex-shrink-0"
                        onClick={() => !isEditMode && router.push("/products")}
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`flex-shrink-0 p-2 rounded-lg ${product.status === "out-of-stock" ? "bg-error/10" : "bg-warning/10"}`}>
                                <AlertTriangle className={`w-5 h-5 ${product.status === "out-of-stock" ? "text-error" : "text-warning"}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{product.name}</p>
                                <p className="text-xs text-text-secondary truncate">{product.location}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-3">
                            <p className="font-semibold text-sm">{product.stock} {product.unit}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full inline-block ${product.status === "out-of-stock" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"}`}>
                                {product.status.replace("-", " ")}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button
                onClick={() => !isEditMode && router.push("/products")}
                className="w-full mt-4 py-2.5 text-warning hover:text-warning/80 font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
            >
                View All Products →
            </button>
        </div>
    );
}
