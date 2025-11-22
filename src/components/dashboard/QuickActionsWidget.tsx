import React from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, GripVertical } from "lucide-react";
import dummyData from "@/data/dummy.json";

interface QuickActionsWidgetProps {
    router: any;
    isEditMode: boolean;
    order: number[];
}

export default function QuickActionsWidget({ router, isEditMode, order }: QuickActionsWidgetProps) {
    const allActions = dummyData.quickActions;
    const actions = order.map((index) => allActions[index]);

    return (
        <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
            <h2 className="text-lg font-semibold text-primary mb-5 flex-shrink-0">Quick Actions</h2>
            <Droppable droppableId="quick-actions" direction="horizontal" type="QUICK_ACTIONS" isDropDisabled={!isEditMode}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 content-start ${snapshot.isDraggingOver && isEditMode ? "bg-accent/5 rounded-lg" : ""}`}>
                        {actions.map((action, index) => (
                            <Draggable key={`action-${order[index]}`} draggableId={`action-${order[index]}`} index={index} isDragDisabled={!isEditMode}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} className={`${snapshot.isDragging ? "z-50" : ""}`}>
                                        <button
                                            onClick={() => !isEditMode && router.push(action.link)}
                                            className={`p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 text-left border border-transparent hover:border-accent/30 h-full w-full relative ${snapshot.isDragging ? "scale-110 shadow-2xl" : ""} ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                                        >
                                            {isEditMode && (
                                                <div {...provided.dragHandleProps} className="absolute top-1 right-1 p-0.5 rounded bg-accent/10 hover:bg-accent/20 transition z-10">
                                                    <GripVertical className="w-3 h-3 text-accent" />
                                                </div>
                                            )}
                                            <div className={`inline-flex p-2.5 rounded-lg mb-3 ${action.color === "accent" ? "bg-accent/10" : action.color === "success" ? "bg-success/10" : action.color === "info" ? "bg-info/10" : "bg-warning/10"}`}>
                                                <Plus className={`w-5 h-5 ${action.color === "accent" ? "text-accent" : action.color === "success" ? "text-success" : action.color === "info" ? "text-info" : "text-warning"}`} />
                                            </div>
                                            <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                                            <p className="text-xs text-text-secondary line-clamp-2">{action.description}</p>
                                        </button>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
