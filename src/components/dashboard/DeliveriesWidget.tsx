import React from 'react';
import { Truck } from "lucide-react";

interface DeliveriesWidgetProps {
    deliveries: any[];
    router: any;
    isEditMode: boolean;
}

export default function DeliveriesWidget({ deliveries, router, isEditMode }: DeliveriesWidgetProps) {
    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Truck className="w-5 h-5 text-info" />
                    Deliveries
                </h2>
            </div>
            <div className="flex-1 overflow-auto space-y-2.5 pr-2 min-h-0">
                {deliveries.slice(0, 5).map((delivery) => (
                    <div
                        key={delivery.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-info/30 flex-shrink-0"
                        onClick={() => !isEditMode && router.push(`/operations/deliveries/${delivery.id}`)}
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-info/10">
                                <Truck className="w-5 h-5 text-info" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{delivery.deliveryNumber}</p>
                                <p className="text-xs text-text-secondary truncate">{delivery.customer}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-3">
                            <p className="font-semibold text-sm">{delivery.items.length} items</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full inline-block ${delivery.status === "dispatched" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                                {delivery.status.replace("-", " ")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => !isEditMode && router.push("/operations/deliveries")}
                className="w-full mt-4 py-2.5 text-info hover:text-info/80 font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
            >
                View All Deliveries
            </button>
        </div>
    );
}
