import React from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Package, AlertTriangle, DollarSign, ArrowUpRight, ArrowDownRight, GripVertical } from "lucide-react";
import dummyData from "@/data/dummy.json";

interface KPIWidgetProps {
    router: any;
    isEditMode: boolean;
    order: number[];
}

export default function KPIWidget({ router, isEditMode, order }: KPIWidgetProps) {
    const allKpiCards = [
        { title: "Total Products", value: dummyData.kpi.totalProducts, change: `+${dummyData.kpi.monthlyGrowth}%`, trend: "up", icon: Package, iconColor: "text-accent", bgColor: "bg-accent/10", link: "/products" },
        { title: "Low Stock", value: dummyData.kpi.lowStock, change: "Alert", trend: "down", icon: AlertTriangle, iconColor: "text-warning", bgColor: "bg-warning/10", link: "/products" },
        { title: "Out of Stock", value: dummyData.kpi.outOfStock, change: "Critical", trend: "down", icon: AlertTriangle, iconColor: "text-error", bgColor: "bg-error/10", link: "/products" },
        { title: "Total Value", value: `$${(dummyData.kpi.totalValue / 1000).toFixed(0)}K`, change: `+${dummyData.kpi.monthlyGrowth}%`, trend: "up", icon: DollarSign, iconColor: "text-success", bgColor: "bg-success/10", link: "/history" },
    ];

    const kpiCards = order.map((index) => allKpiCards[index]);

    return (
        <Droppable droppableId="kpi-cards" direction="horizontal" type="KPI_CARDS" isDropDisabled={!isEditMode}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`h-full w-full p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 ${snapshot.isDraggingOver && isEditMode ? "bg-accent/5 rounded-xl" : ""}`}>
                    {kpiCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Draggable key={`kpi-${order[index]}`} draggableId={`kpi-${order[index]}`} index={index} isDragDisabled={!isEditMode}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} className={`${snapshot.isDragging ? "z-50" : ""}`}>
                                        <div
                                            onClick={() => !isEditMode && router.push(card.link)}
                                            className={`glass-effect rounded-xl p-5 border border-border hover:border-accent hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full relative ${snapshot.isDragging ? "rotate-2 scale-105 shadow-2xl" : ""} ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                                        >
                                            {isEditMode && (
                                                <div {...provided.dragHandleProps} className="absolute top-2 left-2 p-1 rounded bg-accent/10 hover:bg-accent/20 transition">
                                                    <GripVertical className="w-4 h-4 text-accent" />
                                                </div>
                                            )}
                                            <div className={`flex items-start justify-between ${isEditMode ? "mt-6" : "mb-4"}`}>
                                                <div className={`p-3 rounded-lg ${card.bgColor}`}><Icon className={`w-5 h-5 ${card.iconColor}`} /></div>
                                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.trend === "up" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                                                    {card.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                    {card.change}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-text-secondary text-xs font-medium mb-2 uppercase tracking-wide">{card.title}</h3>
                                                <p className="text-3xl font-bold text-primary">{card.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
