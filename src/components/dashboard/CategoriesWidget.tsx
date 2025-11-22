import React from 'react';
import { motion } from "framer-motion";
import dummyData from "@/data/dummy.json";

interface CategoriesWidgetProps {
    router: any;
    isEditMode: boolean;
}

export default function CategoriesWidget({ router, isEditMode }: CategoriesWidgetProps) {
    const categories = dummyData.categories as any[];

    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-primary mb-5 flex-shrink-0">Categories</h2>
            <div className="flex-1 overflow-auto pr-2">
                <div className="grid grid-cols-2 gap-3 auto-rows-min">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={!isEditMode ? { scale: 1.05 } : {}}
                            className="p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-accent/30"
                            onClick={() => !isEditMode && router.push("/products/categories")}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: category.color || '#ccc' }} />
                                <h3 className="font-semibold text-sm truncate">{category.name}</h3>
                            </div>
                            <p className="text-xs text-text-secondary mb-2">{category.productCount} products</p>
                            <p className="text-lg font-bold">${((category.totalValue || 0) / 1000).toFixed(0)}K</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
