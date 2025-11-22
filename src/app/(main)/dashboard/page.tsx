"use client";

import { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import {
    DragDropContext,
    DropResult,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    ArrowRightLeft,
    History,
    AlertTriangle,
    TrendingUp,
    Settings,
    Plus,
    Grid3x3,
    Save,
    RotateCcw,
    Eye,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import dummyData from "@/data/dummy.json";

// Widgets
import KPIStatsWidget from "@/components/dashboard/KPIWidget";
import WarehousesWidget from "@/components/dashboard/WarehousesWidget";
import QuickActionsWidget from "@/components/dashboard/QuickActionsWidget";
import RecentActivityWidget from "@/components/dashboard/RecentActivityWidget";
import StockAlertsWidget from "@/components/dashboard/StockAlertsWidget";
import TopProductsWidget from "@/components/dashboard/TopProductsWidget";
import CategoriesWidget from "@/components/dashboard/CategoriesWidget";
import DeliveriesWidget from "@/components/dashboard/DeliveriesWidget";
import RollingText from "@/components/RollingText";

const ResponsiveGridLayout = WidthProvider(Responsive);

const WIDGETS = {
    kpi: { component: KPIStatsWidget, label: "Key Performance Indicators", icon: TrendingUp },
    warehouses: { component: WarehousesWidget, label: "Warehouses Overview", icon: Package },
    quickActions: { component: QuickActionsWidget, label: "Quick Actions", icon: Plus },
    recentActivity: { component: RecentActivityWidget, label: "Recent Activity", icon: History },
    stockAlerts: { component: StockAlertsWidget, label: "Stock Alerts", icon: AlertTriangle },
    topProducts: { component: TopProductsWidget, label: "Top Products", icon: Package },
    categories: { component: CategoriesWidget, label: "Categories", icon: LayoutDashboard },
    deliveries: { component: DeliveriesWidget, label: "Recent Deliveries", icon: ArrowRightLeft },
};

const DEFAULT_LAYOUTS: Layouts = {
    lg: [
        { i: "kpi", x: 0, y: 0, w: 12, h: 2, minW: 12, maxW: 12, minH: 2, maxH: 3 },
        { i: "warehouses", x: 0, y: 2, w: 12, h: 5, minW: 6, maxW: 12, minH: 4, maxH: 7 },
        { i: "quickActions", x: 0, y: 7, w: 12, h: 3, minW: 6, maxW: 12, minH: 2, maxH: 4 },
        { i: "recentActivity", x: 0, y: 10, w: 6, h: 6, minW: 4, maxW: 8, minH: 5, maxH: 10 },
        { i: "stockAlerts", x: 6, y: 10, w: 6, h: 6, minW: 4, maxW: 8, minH: 5, maxH: 10 },
        { i: "topProducts", x: 0, y: 16, w: 6, h: 5, minW: 4, maxW: 8, minH: 4, maxH: 8 },
        { i: "categories", x: 6, y: 16, w: 6, h: 4, minW: 4, maxW: 8, minH: 4, maxH: 7 },
        { i: "deliveries", x: 0, y: 20, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 10 },
    ],
    md: [
        { i: "kpi", x: 0, y: 0, w: 10, h: 2, minW: 10, maxW: 10, minH: 2, maxH: 3 },
        { i: "warehouses", x: 0, y: 2, w: 10, h: 5, minW: 6, maxW: 10, minH: 4, maxH: 7 },
        { i: "quickActions", x: 0, y: 7, w: 10, h: 3, minW: 6, maxW: 10, minH: 2, maxH: 4 },
        { i: "recentActivity", x: 0, y: 10, w: 5, h: 6, minW: 4, maxW: 8, minH: 5, maxH: 10 },
        { i: "stockAlerts", x: 5, y: 10, w: 5, h: 6, minW: 4, maxW: 8, minH: 5, maxH: 10 },
        { i: "topProducts", x: 0, y: 16, w: 5, h: 5, minW: 4, maxW: 8, minH: 4, maxH: 8 },
        { i: "categories", x: 5, y: 16, w: 5, h: 4, minW: 4, maxW: 8, minH: 4, maxH: 7 },
        { i: "deliveries", x: 0, y: 20, w: 5, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 10 },
    ],
    sm: [
        { i: "kpi", x: 0, y: 0, w: 6, h: 2, minW: 6, maxW: 6, minH: 2, maxH: 3 },
        { i: "warehouses", x: 0, y: 2, w: 6, h: 5, minW: 6, maxW: 6, minH: 4, maxH: 7 },
        { i: "quickActions", x: 0, y: 7, w: 6, h: 3, minW: 6, maxW: 6, minH: 2, maxH: 4 },
        { i: "recentActivity", x: 0, y: 10, w: 6, h: 6, minW: 4, maxW: 6, minH: 5, maxH: 10 },
        { i: "stockAlerts", x: 0, y: 16, w: 6, h: 6, minW: 4, maxW: 6, minH: 5, maxH: 10 },
        { i: "topProducts", x: 0, y: 22, w: 6, h: 5, minW: 4, maxW: 6, minH: 4, maxH: 8 },
        { i: "categories", x: 0, y: 27, w: 6, h: 4, minW: 4, maxW: 6, minH: 4, maxH: 7 },
        { i: "deliveries", x: 0, y: 31, w: 6, h: 6, minW: 4, maxW: 6, minH: 4, maxH: 10 },
    ],
};

export default function DashboardPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [layouts, setLayouts] = useState<Layouts>(DEFAULT_LAYOUTS);
    const [activeWidgets, setActiveWidgets] = useState<string[]>([
        "kpi", "warehouses", "quickActions", "recentActivity", "stockAlerts", "deliveries",
    ]);

    // Internal ordering state - using indices
    const [kpiOrder, setKpiOrder] = useState<number[]>([0, 1, 2, 3]);
    const [warehouseOrder, setWarehouseOrder] = useState<number[]>([0, 1]);
    const [quickActionsOrder, setQuickActionsOrder] = useState<number[]>([0, 1, 2, 3]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("currentUser");
            if (user) {
                setCurrentUser(JSON.parse(user));
            }

            // Load saved layout
            const savedLayouts = localStorage.getItem("dashboardLayouts");
            if (savedLayouts) {
                setLayouts(JSON.parse(savedLayouts));
            }

            const savedWidgets = localStorage.getItem("dashboardWidgets");
            if (savedWidgets) {
                setActiveWidgets(JSON.parse(savedWidgets));
            }
        }
    }, []);

    const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
        setLayouts(allLayouts);
    };

    const saveLayout = () => {
        localStorage.setItem("dashboardLayouts", JSON.stringify(layouts));
        localStorage.setItem("dashboardWidgets", JSON.stringify(activeWidgets));
        setIsEditMode(false);
    };

    const resetLayout = () => {
        setLayouts(DEFAULT_LAYOUTS);
        setActiveWidgets([
            "kpi", "warehouses", "quickActions", "recentActivity", "stockAlerts", "deliveries",
        ]);
    };

    const toggleWidget = (widgetId: string) => {
        if (activeWidgets.includes(widgetId)) {
            setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
        } else {
            setActiveWidgets([...activeWidgets, widgetId]);
        }
    };

    const handleInternalDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === "kpi-cards") {
            const newOrder = Array.from(kpiOrder);
            const [movedItem] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, movedItem);
            setKpiOrder(newOrder);
        } else if (source.droppableId === "warehouses") {
            const newOrder = Array.from(warehouseOrder);
            const [movedItem] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, movedItem);
            setWarehouseOrder(newOrder);
        } else if (source.droppableId === "quick-actions") {
            const newOrder = Array.from(quickActionsOrder);
            const [movedItem] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, movedItem);
            setQuickActionsOrder(newOrder);
        }
    };

    return (
        <DragDropContext onDragEnd={handleInternalDragEnd}>
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">{dummyData.labels.dashboard}</h1>
                        <p className="text-sm text-text-secondary">
                            {dummyData.labels.welcome}, {currentUser?.name || "User"}!
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {isEditMode ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={resetLayout}
                                    className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span className="hidden sm:inline">Reset</span>
                                </button>
                                <button
                                    onClick={saveLayout}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    <span className="hidden sm:inline">Save Layout</span>
                                </button>
                                <button
                                    onClick={() => setIsEditMode(false)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden sm:inline">Preview</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-colors"
                            >
                                <Grid3x3 className="w-4 h-4" />
                                <span className="hidden sm:inline">Customize Dashboard</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Banner */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <RollingText messages={dummyData.rollingTextMessages} />
                </motion.div>

                {/* Edit Mode Widget Library */}
                <AnimatePresence>
                    {isEditMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="glass-effect rounded-xl p-6 border-2 border-accent/50 bg-accent/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg text-primary">Available Widgets</h3>
                                <button onClick={() => setIsEditMode(false)} className="p-1 hover:bg-accent/10 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.entries(WIDGETS).map(([id, widget]) => {
                                    const isActive = activeWidgets.includes(id);
                                    const Icon = widget.icon;
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => toggleWidget(id)}
                                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${isActive
                                                ? "border-accent bg-accent/10 text-accent"
                                                : "border-border hover:border-accent/50 text-text-secondary"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{widget.label}</span>
                                            {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-accent" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dashboard Grid */}
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={100}
                    isDraggable={isEditMode}
                    isResizable={isEditMode}
                    onLayoutChange={handleLayoutChange}
                    margin={[16, 16]}
                    containerPadding={[0, 0]}
                    draggableHandle=".drag-handle"
                >
                    {activeWidgets.map((widgetId) => (
                        <div key={widgetId} className="h-full">
                            <div className="h-full relative group">
                                {isEditMode && (
                                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <div className="drag-handle p-1.5 bg-background/80 backdrop-blur rounded-md cursor-move hover:bg-accent hover:text-white transition-colors shadow-sm">
                                            <ArrowRightLeft className="w-4 h-4 rotate-45" />
                                        </div>
                                        <button
                                            onClick={() => toggleWidget(widgetId)}
                                            className="p-1.5 bg-background/80 backdrop-blur rounded-md hover:bg-error hover:text-white transition-colors shadow-sm"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                {renderWidget(widgetId, router, isEditMode, { kpiOrder, warehouseOrder, quickActionsOrder })}
                            </div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </DragDropContext>
    );
}

function renderWidget(
    id: string,
    router: any,
    isEditMode: boolean,
    orders: { kpiOrder: number[]; warehouseOrder: number[]; quickActionsOrder: number[] }
) {
    switch (id) {
        case "kpi":
            return <KPIStatsWidget order={orders.kpiOrder} isEditMode={isEditMode} router={router} />;
        case "warehouses":
            return <WarehousesWidget order={orders.warehouseOrder} isEditMode={isEditMode} router={router} />;
        case "quickActions":
            return <QuickActionsWidget order={orders.quickActionsOrder} isEditMode={isEditMode} router={router} />;
        case "recentActivity":
            return <RecentActivityWidget router={router} isEditMode={isEditMode} />;
        case "stockAlerts":
            return <StockAlertsWidget router={router} isEditMode={isEditMode} />;
        case "topProducts":
            return <TopProductsWidget router={router} isEditMode={isEditMode} />;
        case "categories":
            return <CategoriesWidget router={router} isEditMode={isEditMode} />;
        case "deliveries":
            return <DeliveriesWidget router={router} isEditMode={isEditMode} deliveries={dummyData.deliveries} />;
        default:
            return null;
    }
}
