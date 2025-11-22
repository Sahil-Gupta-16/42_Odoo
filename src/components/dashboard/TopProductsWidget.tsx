import React from 'react';
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import dummyData from "@/data/dummy.json";

interface TopProductsWidgetProps {
    router: any;
    isEditMode: boolean;
}

export default function TopProductsWidget({ router, isEditMode }: TopProductsWidgetProps) {
    // Fallback if topProducts is missing
    const topProducts = (dummyData as any).topProducts || [];

    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2 flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-success" />
                Top Products
            </h2>
            <div className="flex-1 overflow-auto space-y-4 pr-2">
                {topProducts.map((product: any, index: number) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-secondary transition-colors flex-shrink-0"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-bold text-white shadow-lg">
                            {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{product.name}</p>
                            <p className="text-xs text-text-secondary">{product.sales.toLocaleString()} units sold</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <p className="font-bold text-sm">${(product.revenue / 1000).toFixed(1)}K</p>
                            <span className="text-xs text-success font-medium">↑ {product.growth}%</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
