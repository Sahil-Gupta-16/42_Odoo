import React from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Warehouse, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import dummyData from "@/data/dummy.json";

interface WarehousesWidgetProps {
    router: any;
    isEditMode: boolean;
    order: number[];
}

export default function WarehousesWidget({ router, isEditMode, order }: WarehousesWidgetProps) {
    const allWarehouses = dummyData.warehouses;
    const warehouses = order.map((index) => allWarehouses[index]);

    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2 flex-shrink-0">
                <Warehouse className="w-5 h-5 text-info" />
                Warehouse Status
            </h2>
            <Droppable droppableId="warehouses" type="WAREHOUSES" isDropDisabled={!isEditMode}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-1 overflow-auto pr-2 ${snapshot.isDraggingOver && isEditMode ? "bg-info/5 rounded-lg" : ""}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {warehouses.map((warehouse, index) => (
                                <Draggable key={`warehouse-${order[index]}`} draggableId={`warehouse-${order[index]}`} index={index} isDragDisabled={!isEditMode}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} className={`${snapshot.isDragging ? "z-50" : ""}`}>
                                            <div
                                                onClick={() => !isEditMode && router.push(`/settings`)}
                                                className={`p-5 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 border border-transparent hover:border-info/30 relative ${snapshot.isDragging ? "scale-105 shadow-2xl" : ""} ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                                            >
                                                {isEditMode && (
                                                    <div {...provided.dragHandleProps} className="absolute top-2 right-2 p-1 rounded bg-info/10 hover:bg-info/20 transition z-10">
                                                        <GripVertical className="w-4 h-4 text-info" />
                                                    </div>
                                                )}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-base mb-1">{warehouse.name}</h3>
                                                        <p className="text-xs text-text-secondary">{warehouse.location}</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">{warehouse.status}</span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-text-secondary">Capacity</span>
                                                        <span className="font-semibold">{warehouse.currentStock.toLocaleString()} / {warehouse.capacity.toLocaleString()}</span>
                                                    </div>
                                                    <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${warehouse.utilizationPercent}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className="bg-gradient-to-r from-info to-accent rounded-full h-2"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-text-secondary">Utilization</span>
                                                        <span className="font-semibold text-accent">{warehouse.utilizationPercent}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
