// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Package,
//   TrendingUp,
//   AlertTriangle,
//   ShoppingCart,
//   ArrowUpRight,
//   ArrowDownRight,
//   Plus,
//   Clock,
//   DollarSign,
//   Warehouse,
//   TrendingDown,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import RollingText from "@/components/RollingText";
// import dummyData from "@/data/dummy.json";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         setCurrentUser(JSON.parse(user));
//       }
//     }
//   }, []);

//   const kpiCards = [
//     {
//       title: "Total Products",
//       value: dummyData.kpi.totalProducts,
//       change: `+${dummyData.kpi.monthlyGrowth}%`,
//       trend: "up",
//       icon: Package,
//       bgColor: "bg-accent/10 dark:bg-accent/5",
//       iconColor: "text-accent",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Low Stock Items",
//       value: dummyData.kpi.lowStock,
//       change: "Needs attention",
//       trend: "down",
//       icon: AlertTriangle,
//       bgColor: "bg-warning/10 dark:bg-warning/5",
//       iconColor: "text-warning",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Out of Stock",
//       value: dummyData.kpi.outOfStock,
//       change: "Critical",
//       trend: "up",
//       icon: AlertTriangle,
//       bgColor: "bg-error/10 dark:bg-error/5",
//       iconColor: "text-error",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Total Value",
//       value: `$${(dummyData.kpi.totalValue / 1000).toFixed(1)}K`,
//       change: `+${dummyData.kpi.monthlyGrowth}%`,
//       trend: "up",
//       icon: DollarSign,
//       bgColor: "bg-success/10 dark:bg-success/5",
//       iconColor: "text-success",
//       link: "/dashboard/history",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
//           {dummyData.labels.dashboard}
//         </h1>
//         <p className="text-text-secondary dark:text-text-secondary">
//           {dummyData.labels.welcome}, {currentUser?.name || "User"}! Here's your
//           inventory overview
//         </p>
//       </motion.div>

//       {/* Rolling Text Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.1 }}
//       >
//         <RollingText messages={dummyData.rollingTextMessages} />
//       </motion.div>

//       {/* KPI Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {kpiCards.map((card, index) => {
//           const Icon = card.icon;
//           return (
//             <motion.div
//               key={card.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: 0.1 * (index + 2) }}
//               whileHover={{ y: -4, transition: { duration: 0.2 } }}
//               onClick={() => router.push(card.link)}
//               className="glass-effect rounded-xl p-6 border border-border dark:border-border cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className={`p-3 rounded-lg ${card.bgColor}`}>
//                   <Icon className={`w-6 h-6 ${card.iconColor}`} />
//                 </div>
//                 <div
//                   className={`flex items-center gap-1 text-sm font-medium ${
//                     card.trend === "up" ? "text-success" : "text-error"
//                   }`}
//                 >
//                   {card.trend === "up" ? (
//                     <ArrowUpRight className="w-4 h-4" />
//                   ) : (
//                     <ArrowDownRight className="w-4 h-4" />
//                   )}
//                   <span className="text-xs">{card.change}</span>
//                 </div>
//               </div>
//               <h3 className="text-text-secondary dark:text-text-secondary text-sm font-medium mb-1">
//                 {card.title}
//               </h3>
//               <p className="text-3xl font-bold text-primary dark:text-primary">
//                 {card.value}
//               </p>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Warehouse Status */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.5 }}
//       >
//         <h2 className="text-xl font-semibold text-primary dark:text-primary mb-4">
//           Warehouse Status
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {dummyData.warehouses.map((warehouse) => (
//             <div
//               key={warehouse.id}
//               className="glass-effect rounded-xl p-6 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
//               onClick={() => router.push(`/dashboard/warehouses`)}
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-info/10">
//                     <Warehouse className="w-6 h-6 text-info" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-primary dark:text-primary">
//                       {warehouse.name}
//                     </h3>
//                     <p className="text-sm text-text-secondary dark:text-text-secondary">
//                       {warehouse.location}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full capitalize">
//                   {warehouse.status}
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-text-secondary dark:text-text-secondary">
//                     Capacity
//                   </span>
//                   <span className="font-medium text-primary dark:text-primary">
//                     {warehouse.currentStock} / {warehouse.capacity}
//                   </span>
//                 </div>

//                 <div className="w-full bg-background-secondary dark:bg-background-secondary rounded-full h-2">
//                   <div
//                     className="bg-accent rounded-full h-2 transition-all duration-300"
//                     style={{ width: `${warehouse.utilizationPercent}%` }}
//                   />
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-text-secondary dark:text-text-secondary">
//                     Utilization
//                   </span>
//                   <span className="font-medium text-accent">
//                     {warehouse.utilizationPercent}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Quick Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.6 }}
//       >
//         <h2 className="text-xl font-semibold text-primary dark:text-primary mb-4">
//           {dummyData.labels.quickActions}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {dummyData.quickActions.map((action) => (
//             <motion.button
//               key={action.id}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push(action.link)}
//               className="glass-effect rounded-lg p-4 border border-border dark:border-border text-left hover:border-accent dark:hover:border-accent transition-colors"
//             >
//               <div
//                 className={`inline-flex p-2 rounded-lg mb-3 ${
//                   action.color === "accent"
//                     ? "bg-accent/10"
//                     : action.color === "success"
//                     ? "bg-success/10"
//                     : action.color === "info"
//                     ? "bg-info/10"
//                     : "bg-warning/10"
//                 }`}
//               >
//                 <Plus
//                   className={`w-5 h-5 ${
//                     action.color === "accent"
//                       ? "text-accent"
//                       : action.color === "success"
//                       ? "text-success"
//                       : action.color === "info"
//                       ? "text-info"
//                       : "text-warning"
//                   }`}
//                 />
//               </div>
//               <h3 className="font-semibold text-primary dark:text-primary mb-1">
//                 {action.title}
//               </h3>
//               <p className="text-sm text-text-secondary dark:text-text-secondary">
//                 {action.description}
//               </p>
//             </motion.button>
//           ))}
//         </div>
//       </motion.div>

//       {/* Recent Activity & Stock Alerts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.7 }}
//           className="glass-effect rounded-xl p-6 border border-border dark:border-border"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-primary dark:text-primary">
//               {dummyData.labels.recentActivity}
//             </h2>
//             <Clock className="w-5 h-5 text-text-tertiary dark:text-text-tertiary" />
//           </div>
//           <div className="space-y-3">
//             {dummyData.receipts.slice(0, 3).map((receipt) => (
//               <div
//                 key={receipt.id}
//                 className="flex items-center justify-between p-4 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover dark:hover:bg-sidebar-hover transition-colors cursor-pointer"
//                 onClick={() => router.push("/dashboard/operations/receipts")}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-success/10">
//                     <ShoppingCart className="w-5 h-5 text-success" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-primary dark:text-primary text-sm">
//                       {receipt.receiptNumber}
//                     </p>
//                     <p className="text-xs text-text-secondary dark:text-text-secondary">
//                       {receipt.supplier}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-primary dark:text-primary text-sm">
//                     ${receipt.totalValue.toFixed(2)}
//                   </p>
//                   <span
//                     className={`text-xs px-2 py-0.5 rounded-full ${
//                       receipt.status === "completed"
//                         ? "bg-success/10 text-success"
//                         : "bg-warning/10 text-warning"
//                     }`}
//                   >
//                     {receipt.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={() => router.push("/dashboard/history")}
//             className="w-full mt-4 py-2 text-accent hover:text-accent-dark font-medium transition-colors text-sm"
//           >
//             View All Activity →
//           </button>
//         </motion.div>

//         {/* Stock Alerts */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.8 }}
//           className="glass-effect rounded-xl p-6 border border-border dark:border-border"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-primary dark:text-primary">
//               {dummyData.labels.stockAlerts}
//             </h2>
//             <AlertTriangle className="w-5 h-5 text-warning" />
//           </div>
//           <div className="space-y-3">
//             {dummyData.products
//               .filter((p) => p.status !== "in-stock")
//               .map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-4 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover dark:hover:bg-sidebar-hover transition-colors cursor-pointer"
//                   onClick={() => router.push("/dashboard/products")}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`p-2 rounded-lg ${
//                         product.status === "out-of-stock"
//                           ? "bg-error/10"
//                           : "bg-warning/10"
//                       }`}
//                     >
//                       <AlertTriangle
//                         className={`w-5 h-5 ${
//                           product.status === "out-of-stock"
//                             ? "text-error"
//                             : "text-warning"
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <p className="font-medium text-primary dark:text-primary text-sm">
//                         {product.name}
//                       </p>
//                       <p className="text-xs text-text-secondary dark:text-text-secondary">
//                         {product.location}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-primary dark:text-primary text-sm">
//                       {product.stock} {product.unit}
//                     </p>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${
//                         product.status === "out-of-stock"
//                           ? "bg-error/10 text-error"
//                           : "bg-warning/10 text-warning"
//                       }`}
//                     >
//                       {product.status.replace("-", " ")}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           <button
//             onClick={() => router.push("/dashboard/products")}
//             className="w-full mt-4 py-2 text-warning hover:text-warning/80 font-medium transition-colors text-sm"
//           >
//             View All Products →
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { Responsive, WidthProvider, Layout } from "react-grid-layout";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Package,
//   AlertTriangle,
//   ShoppingCart,
//   DollarSign,
//   Warehouse,
//   TrendingUp,
//   Clock,
//   Settings,
//   Plus,
//   X,
//   Grid3x3,
//   Save,
//   RotateCcw,
//   ArrowUpRight,
//   ArrowDownRight,
//   Eye,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import RollingText from "@/components/RollingText";
// import dummyData from "@/data/dummy.json";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// // Widget Configuration with proper constraints [web:30][web:105]
// const WIDGET_CONFIGS = {
//   kpi: {
//     title: "KPI Cards",
//     minW: 12,
//     maxW: 12, // Always full width
//     minH: 2,
//     maxH: 3,
//     defaultW: 12,
//     defaultH: 2,
//   },
//   warehouses: {
//     title: "Warehouse Status",
//     minW: 6,
//     maxW: 12,
//     minH: 3,
//     maxH: 6,
//     defaultW: 12,
//     defaultH: 4,
//   },
//   quickActions: {
//     title: "Quick Actions",
//     minW: 6,
//     maxW: 12,
//     minH: 2,
//     maxH: 3,
//     defaultW: 12,
//     defaultH: 2,
//   },
//   recentActivity: {
//     title: "Recent Activity",
//     minW: 4,
//     maxW: 8,
//     minH: 4,
//     maxH: 8,
//     defaultW: 6,
//     defaultH: 5,
//   },
//   stockAlerts: {
//     title: "Stock Alerts",
//     minW: 4,
//     maxW: 8,
//     minH: 4,
//     maxH: 8,
//     defaultW: 6,
//     defaultH: 5,
//   },
//   topProducts: {
//     title: "Top Products",
//     minW: 4,
//     maxW: 8,
//     minH: 3,
//     maxH: 6,
//     defaultW: 6,
//     defaultH: 4,
//   },
//   categories: {
//     title: "Categories",
//     minW: 4,
//     maxW: 8,
//     minH: 3,
//     maxH: 5,
//     defaultW: 6,
//     defaultH: 3,
//   },
//   stockMovements: {
//     title: "Stock Movements",
//     minW: 6,
//     maxW: 12,
//     minH: 4,
//     maxH: 7,
//     defaultW: 12,
//     defaultH: 5,
//   },
// };

// // Default layout with proper spacing [web:106][web:108]
// const DEFAULT_LAYOUTS = {
//   lg: [
//     { i: "kpi", x: 0, y: 0, w: 12, h: 2, minW: 12, maxW: 12, minH: 2, maxH: 3 },
//     {
//       i: "warehouses",
//       x: 0,
//       y: 2,
//       w: 12,
//       h: 4,
//       minW: 6,
//       maxW: 12,
//       minH: 3,
//       maxH: 6,
//     },
//     {
//       i: "quickActions",
//       x: 0,
//       y: 6,
//       w: 12,
//       h: 2,
//       minW: 6,
//       maxW: 12,
//       minH: 2,
//       maxH: 3,
//     },
//     {
//       i: "recentActivity",
//       x: 0,
//       y: 8,
//       w: 6,
//       h: 5,
//       minW: 4,
//       maxW: 8,
//       minH: 4,
//       maxH: 8,
//     },
//     {
//       i: "stockAlerts",
//       x: 6,
//       y: 8,
//       w: 6,
//       h: 5,
//       minW: 4,
//       maxW: 8,
//       minH: 4,
//       maxH: 8,
//     },
//   ],
//   md: [
//     { i: "kpi", x: 0, y: 0, w: 10, h: 2, minW: 10, maxW: 10, minH: 2, maxH: 3 },
//     {
//       i: "warehouses",
//       x: 0,
//       y: 2,
//       w: 10,
//       h: 4,
//       minW: 5,
//       maxW: 10,
//       minH: 3,
//       maxH: 6,
//     },
//     {
//       i: "quickActions",
//       x: 0,
//       y: 6,
//       w: 10,
//       h: 2,
//       minW: 5,
//       maxW: 10,
//       minH: 2,
//       maxH: 3,
//     },
//     {
//       i: "recentActivity",
//       x: 0,
//       y: 8,
//       w: 5,
//       h: 5,
//       minW: 4,
//       maxW: 7,
//       minH: 4,
//       maxH: 8,
//     },
//     {
//       i: "stockAlerts",
//       x: 5,
//       y: 8,
//       w: 5,
//       h: 5,
//       minW: 4,
//       maxW: 7,
//       minH: 4,
//       maxH: 8,
//     },
//   ],
//   sm: [
//     { i: "kpi", x: 0, y: 0, w: 6, h: 3, minW: 6, maxW: 6, minH: 3, maxH: 4 },
//     {
//       i: "warehouses",
//       x: 0,
//       y: 3,
//       w: 6,
//       h: 5,
//       minW: 6,
//       maxW: 6,
//       minH: 4,
//       maxH: 7,
//     },
//     {
//       i: "quickActions",
//       x: 0,
//       y: 8,
//       w: 6,
//       h: 3,
//       minW: 6,
//       maxW: 6,
//       minH: 3,
//       maxH: 4,
//     },
//     {
//       i: "recentActivity",
//       x: 0,
//       y: 11,
//       w: 6,
//       h: 5,
//       minW: 6,
//       maxW: 6,
//       minH: 4,
//       maxH: 8,
//     },
//     {
//       i: "stockAlerts",
//       x: 0,
//       y: 16,
//       w: 6,
//       h: 5,
//       minW: 6,
//       maxW: 6,
//       minH: 4,
//       maxH: 8,
//     },
//   ],
// };

// export default function DashboardPage() {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
//   const [activeWidgets, setActiveWidgets] = useState<string[]>([
//     "kpi",
//     "warehouses",
//     "quickActions",
//     "recentActivity",
//     "stockAlerts",
//   ]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) setCurrentUser(JSON.parse(user));

//       const savedLayout = localStorage.getItem("dashboardLayout");
//       const savedWidgets = localStorage.getItem("dashboardWidgets");
//       if (savedLayout) setLayouts(JSON.parse(savedLayout));
//       if (savedWidgets) setActiveWidgets(JSON.parse(savedWidgets));
//     }
//   }, []);

//   const handleLayoutChange = (layout: Layout[], allLayouts: any) => {
//     setLayouts(allLayouts);
//   };

//   const saveLayout = () => {
//     localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
//     localStorage.setItem("dashboardWidgets", JSON.stringify(activeWidgets));
//     setIsEditMode(false);
//   };

//   const resetLayout = () => {
//     setLayouts(DEFAULT_LAYOUTS);
//     setActiveWidgets([
//       "kpi",
//       "warehouses",
//       "quickActions",
//       "recentActivity",
//       "stockAlerts",
//     ]);
//     localStorage.removeItem("dashboardLayout");
//     localStorage.removeItem("dashboardWidgets");
//   };

//   const addWidget = (widgetId: string) => {
//     if (!activeWidgets.includes(widgetId)) {
//       const config = WIDGET_CONFIGS[widgetId as keyof typeof WIDGET_CONFIGS];
//       if (config) {
//         setActiveWidgets([...activeWidgets, widgetId]);

//         const newLayout = {
//           i: widgetId,
//           x: 0,
//           y: Infinity,
//           w: config.defaultW,
//           h: config.defaultH,
//           minW: config.minW,
//           maxW: config.maxW,
//           minH: config.minH,
//           maxH: config.maxH,
//         };

//         setLayouts({
//           ...layouts,
//           lg: [...(layouts.lg || []), newLayout],
//         });
//       }
//     }
//   };

//   const removeWidget = (widgetId: string) => {
//     setActiveWidgets(activeWidgets.filter((id) => id !== widgetId));
//     setLayouts({
//       ...layouts,
//       lg: (layouts.lg || []).filter((item) => item.i !== widgetId),
//     });
//   };

//   return (
//     <div className="space-y-6 pb-8">
//       {/* Header with Edit Controls - 8pt spacing [web:106][web:108] */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-border"
//       >
//         <div>
//           <h1 className="text-3xl font-bold text-primary mb-1">
//             {dummyData.labels.dashboard}
//           </h1>
//           <p className="text-sm text-text-secondary">
//             {dummyData.labels.welcome}, {currentUser?.name || "User"}!
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <AnimatePresence mode="wait">
//             {isEditMode ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="flex items-center gap-2"
//               >
//                 <button
//                   onClick={resetLayout}
//                   className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-all duration-200"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                   <span className="hidden sm:inline">Reset</span>
//                 </button>
//                 <button
//                   onClick={saveLayout}
//                   className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/20"
//                 >
//                   <Save className="w-4 h-4" />
//                   <span className="hidden sm:inline">Save Layout</span>
//                 </button>
//                 <button
//                   onClick={() => setIsEditMode(false)}
//                   className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-all duration-200"
//                 >
//                   <Eye className="w-4 h-4" />
//                   <span className="hidden sm:inline">Preview</span>
//                 </button>
//               </motion.div>
//             ) : (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 onClick={() => setIsEditMode(true)}
//                 className="flex items-center gap-2 px-4 py-2 text-sm border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-200"
//               >
//                 <Grid3x3 className="w-4 h-4" />
//                 <span className="hidden sm:inline">Customize Dashboard</span>
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>

//       {/* Rolling Text Banner - 8pt margin [web:106] */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <RollingText messages={dummyData.rollingTextMessages} />
//       </motion.div>

//       {/* Widget Library (Edit Mode) - 16pt padding [web:106][web:108] */}
//       <AnimatePresence>
//         {isEditMode && (
//           <motion.div
//             initial={{ opacity: 0, height: 0, marginBottom: 0 }}
//             animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
//             exit={{ opacity: 0, height: 0, marginBottom: 0 }}
//             className="glass-effect rounded-xl p-6 border-2 border-accent/50 bg-accent/5"
//           >
//             <h3 className="text-base font-semibold mb-4 flex items-center gap-2 text-accent">
//               <Plus className="w-5 h-5" />
//               Add Widgets to Dashboard
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {Object.entries(WIDGET_CONFIGS).map(([key, config]) => (
//                 <button
//                   key={key}
//                   onClick={() => addWidget(key)}
//                   disabled={activeWidgets.includes(key)}
//                   className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
//                     activeWidgets.includes(key)
//                       ? "border-border bg-sidebar-hover text-text-tertiary cursor-not-allowed opacity-50"
//                       : "border-accent/30 text-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
//                   }`}
//                 >
//                   <div className="flex items-center justify-center gap-2">
//                     {activeWidgets.includes(key) && (
//                       <span className="text-xs">✓</span>
//                     )}
//                     {config.title}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <p className="text-xs text-text-tertiary mt-4 text-center">
//               💡 Drag widgets to reposition, resize from bottom-right corner
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Grid Layout with enhanced spacing [web:30][web:105] */}
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={layouts}
//         breakpoints={{ lg: 1200, md: 996, sm: 768 }}
//         cols={{ lg: 12, md: 10, sm: 6 }}
//         rowHeight={70} // Increased for better spacing [web:106]
//         margin={[16, 16]} // 16pt gutters (8pt grid system) [web:106][web:108]
//         containerPadding={[0, 0]}
//         isDraggable={isEditMode}
//         isResizable={isEditMode}
//         onLayoutChange={handleLayoutChange}
//         draggableHandle=".drag-handle"
//         compactType="vertical"
//         preventCollision={false}
//         useCSSTransforms={true}
//       >
//         {activeWidgets.map((widgetId) => (
//           <div key={widgetId} className="relative group">
//             {/* Edit Controls Overlay */}
//             <AnimatePresence>
//               {isEditMode && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute -top-3 right-2 z-20 flex gap-2"
//                 >
//                   <div className="drag-handle cursor-move p-2 bg-accent rounded-lg shadow-lg hover:bg-accent-dark transition-all duration-200 hover:scale-110">
//                     <Grid3x3 className="w-4 h-4 text-white" />
//                   </div>
//                   <button
//                     onClick={() => removeWidget(widgetId)}
//                     className="p-2 bg-error rounded-lg shadow-lg hover:bg-error/80 transition-all duration-200 hover:scale-110"
//                   >
//                     <X className="w-4 h-4 text-white" />
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Widget Border Highlight in Edit Mode */}
//             <div
//               className={`h-full transition-all duration-200 ${
//                 isEditMode
//                   ? "ring-2 ring-accent/30 ring-offset-2 ring-offset-background rounded-xl"
//                   : ""
//               }`}
//             >
//               <div
//                 className={`h-full ${isEditMode ? "pointer-events-none" : ""}`}
//               >
//                 {renderWidget(widgetId, router)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </ResponsiveGridLayout>
//     </div>
//   );
// }

// // Enhanced Widget Components with 8pt spacing [web:106][web:108]

// function renderWidget(widgetId: string, router: any) {
//   const widgets = {
//     kpi: <KPIWidget router={router} />,
//     warehouses: <WarehousesWidget router={router} />,
//     quickActions: <QuickActionsWidget router={router} />,
//     recentActivity: <RecentActivityWidget router={router} />,
//     stockAlerts: <StockAlertsWidget router={router} />,
//     topProducts: <TopProductsWidget router={router} />,
//     categories: <CategoriesWidget router={router} />,
//     stockMovements: <StockMovementsWidget router={router} />,
//   };

//   return widgets[widgetId as keyof typeof widgets] || null;
// }

// // KPI Widget with responsive grid [web:106]
// function KPIWidget({ router }: { router: any }) {
//   const kpiCards = [
//     {
//       title: "Total Products",
//       value: dummyData.kpi.totalProducts,
//       change: `+${dummyData.kpi.monthlyGrowth}%`,
//       trend: "up",
//       icon: Package,
//       iconColor: "text-accent",
//       bgColor: "bg-accent/10",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Low Stock",
//       value: dummyData.kpi.lowStock,
//       change: "Alert",
//       trend: "down",
//       icon: AlertTriangle,
//       iconColor: "text-warning",
//       bgColor: "bg-warning/10",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Out of Stock",
//       value: dummyData.kpi.outOfStock,
//       change: "Critical",
//       trend: "down",
//       icon: AlertTriangle,
//       iconColor: "text-error",
//       bgColor: "bg-error/10",
//       link: "/dashboard/products",
//     },
//     {
//       title: "Total Value",
//       value: `$${(dummyData.kpi.totalValue / 1000).toFixed(0)}K`,
//       change: `+${dummyData.kpi.monthlyGrowth}%`,
//       trend: "up",
//       icon: DollarSign,
//       iconColor: "text-success",
//       bgColor: "bg-success/10",
//       link: "/dashboard/history",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full p-4">
//       {kpiCards.map((card) => {
//         const Icon = card.icon;
//         return (
//           <motion.div
//             key={card.title}
//             whileHover={{ y: -4, scale: 1.02 }}
//             onClick={() => router.push(card.link)}
//             className="glass-effect rounded-xl p-5 border border-border cursor-pointer hover:border-accent hover:shadow-xl transition-all duration-200"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className={`p-3 rounded-lg ${card.bgColor}`}>
//                 <Icon className={`w-5 h-5 ${card.iconColor}`} />
//               </div>
//               <div
//                 className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
//                   card.trend === "up"
//                     ? "bg-success/10 text-success"
//                     : "bg-error/10 text-error"
//                 }`}
//               >
//                 {card.trend === "up" ? (
//                   <ArrowUpRight className="w-3 h-3" />
//                 ) : (
//                   <ArrowDownRight className="w-3 h-3" />
//                 )}
//                 {card.change}
//               </div>
//             </div>
//             <h3 className="text-text-secondary text-xs font-medium mb-2 uppercase tracking-wide">
//               {card.title}
//             </h3>
//             <p className="text-3xl font-bold text-primary">{card.value}</p>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }

// // Warehouses Widget with enhanced padding [web:106]
// function WarehousesWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full overflow-auto">
//       <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2">
//         <Warehouse className="w-5 h-5 text-info" />
//         Warehouse Status
//       </h2>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {dummyData.warehouses.map((warehouse) => (
//           <motion.div
//             key={warehouse.id}
//             whileHover={{ scale: 1.02 }}
//             className="p-5 rounded-xl bg-background-secondary cursor-pointer hover:bg-sidebar-hover transition-all duration-200 border border-transparent hover:border-info/30"
//             onClick={() => router.push(`/dashboard/warehouses`)}
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h3 className="font-semibold text-base mb-1">
//                   {warehouse.name}
//                 </h3>
//                 <p className="text-xs text-text-secondary">
//                   {warehouse.location}
//                 </p>
//               </div>
//               <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
//                 {warehouse.status}
//               </span>
//             </div>

//             <div className="space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-text-secondary">Capacity</span>
//                 <span className="font-semibold">
//                   {warehouse.currentStock.toLocaleString()} /{" "}
//                   {warehouse.capacity.toLocaleString()}
//                 </span>
//               </div>

//               <div className="w-full bg-background rounded-full h-2 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${warehouse.utilizationPercent}%` }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                   className="bg-gradient-to-r from-info to-accent rounded-full h-2"
//                 />
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-text-secondary">Utilization</span>
//                 <span className="font-semibold text-accent">
//                   {warehouse.utilizationPercent}%
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Quick Actions with better spacing [web:106]
// function QuickActionsWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full">
//       <h2 className="text-lg font-semibold text-primary mb-5">Quick Actions</h2>
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         {dummyData.quickActions.map((action) => (
//           <motion.button
//             key={action.id}
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => router.push(action.link)}
//             className="p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 text-left border border-transparent hover:border-accent/30"
//           >
//             <div
//               className={`inline-flex p-2.5 rounded-lg mb-3 ${
//                 action.color === "accent"
//                   ? "bg-accent/10"
//                   : action.color === "success"
//                   ? "bg-success/10"
//                   : action.color === "info"
//                   ? "bg-info/10"
//                   : "bg-warning/10"
//               }`}
//             >
//               <Plus
//                 className={`w-5 h-5 ${
//                   action.color === "accent"
//                     ? "text-accent"
//                     : action.color === "success"
//                     ? "text-success"
//                     : action.color === "info"
//                     ? "text-info"
//                     : "text-warning"
//                 }`}
//               />
//             </div>
//             <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
//             <p className="text-xs text-text-secondary line-clamp-2">
//               {action.description}
//             </p>
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Recent Activity with 8pt spacing [web:106][web:108]
// function RecentActivityWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full flex flex-col">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
//           <Clock className="w-5 h-5 text-info" />
//           Recent Activity
//         </h2>
//       </div>
//       <div className="flex-1 overflow-auto space-y-2.5 pr-2">
//         {dummyData.receipts.slice(0, 5).map((receipt) => (
//           <motion.div
//             key={receipt.id}
//             whileHover={{ x: 4 }}
//             className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-success/30"
//             onClick={() => router.push("/dashboard/operations/receipts")}
//           >
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="flex-shrink-0 p-2 rounded-lg bg-success/10">
//                 <ShoppingCart className="w-5 h-5 text-success" />
//               </div>
//               <div className="min-w-0">
//                 <p className="font-medium text-sm truncate">
//                   {receipt.receiptNumber}
//                 </p>
//                 <p className="text-xs text-text-secondary truncate">
//                   {receipt.supplier}
//                 </p>
//               </div>
//             </div>
//             <div className="flex-shrink-0 text-right ml-3">
//               <p className="font-semibold text-sm">
//                 ${receipt.totalValue.toFixed(0)}
//               </p>
//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full inline-block ${
//                   receipt.status === "completed"
//                     ? "bg-success/10 text-success"
//                     : "bg-warning/10 text-warning"
//                 }`}
//               >
//                 {receipt.status}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//       <button
//         onClick={() => router.push("/dashboard/history")}
//         className="w-full mt-4 py-2.5 text-accent hover:text-accent-dark font-medium transition-colors text-sm border-t border-border pt-4"
//       >
//         View All Activity →
//       </button>
//     </div>
//   );
// }

// // Stock Alerts with proper spacing [web:106]
// function StockAlertsWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full flex flex-col">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
//           <AlertTriangle className="w-5 h-5 text-warning" />
//           Stock Alerts
//         </h2>
//       </div>
//       <div className="flex-1 overflow-auto space-y-2.5 pr-2">
//         {dummyData.products
//           .filter((p) => p.status !== "in-stock")
//           .map((product) => (
//             <motion.div
//               key={product.id}
//               whileHover={{ x: 4 }}
//               className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-warning/30"
//               onClick={() => router.push("/dashboard/products")}
//             >
//               <div className="flex items-center gap-3 flex-1 min-w-0">
//                 <div
//                   className={`flex-shrink-0 p-2 rounded-lg ${
//                     product.status === "out-of-stock"
//                       ? "bg-error/10"
//                       : "bg-warning/10"
//                   }`}
//                 >
//                   <AlertTriangle
//                     className={`w-5 h-5 ${
//                       product.status === "out-of-stock"
//                         ? "text-error"
//                         : "text-warning"
//                     }`}
//                   />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="font-medium text-sm truncate">{product.name}</p>
//                   <p className="text-xs text-text-secondary truncate">
//                     {product.location}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-shrink-0 text-right ml-3">
//                 <p className="font-semibold text-sm">
//                   {product.stock} {product.unit}
//                 </p>
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded-full inline-block ${
//                     product.status === "out-of-stock"
//                       ? "bg-error/10 text-error"
//                       : "bg-warning/10 text-warning"
//                   }`}
//                 >
//                   {product.status.replace("-", " ")}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//       </div>
//       <button
//         onClick={() => router.push("/dashboard/products")}
//         className="w-full mt-4 py-2.5 text-warning hover:text-warning/80 font-medium transition-colors text-sm border-t border-border pt-4"
//       >
//         View All Products →
//       </button>
//     </div>
//   );
// }

// // Top Products Widget [web:106]
// function TopProductsWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full overflow-auto">
//       <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2">
//         <TrendingUp className="w-5 h-5 text-success" />
//         Top Products
//       </h2>
//       <div className="space-y-4">
//         {dummyData.topProducts.map((product, index) => (
//           <motion.div
//             key={product.id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-secondary transition-colors"
//           >
//             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-bold text-white shadow-lg">
//               {index + 1}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-semibold text-sm truncate">{product.name}</p>
//               <p className="text-xs text-text-secondary">
//                 {product.sales.toLocaleString()} units sold
//               </p>
//             </div>
//             <div className="flex-shrink-0 text-right">
//               <p className="font-bold text-sm">
//                 ${(product.revenue / 1000).toFixed(1)}K
//               </p>
//               <span className="text-xs text-success font-medium">
//                 ↑ {product.growth}%
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Categories Widget [web:106]
// function CategoriesWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full overflow-auto">
//       <h2 className="text-lg font-semibold text-primary mb-5">Categories</h2>
//       <div className="grid grid-cols-2 gap-3">
//         {dummyData.categories.map((category) => (
//           <motion.div
//             key={category.id}
//             whileHover={{ scale: 1.05 }}
//             className="p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-accent/30"
//             onClick={() => router.push("/dashboard/categories")}
//           >
//             <div className="flex items-center gap-2 mb-3">
//               <div
//                 className="w-4 h-4 rounded-full shadow-lg"
//                 style={{ backgroundColor: category.color }}
//               />
//               <h3 className="font-semibold text-sm truncate">
//                 {category.name}
//               </h3>
//             </div>
//             <p className="text-xs text-text-secondary mb-2">
//               {category.productCount} products
//             </p>
//             <p className="text-lg font-bold">
//               ${(category.totalValue / 1000).toFixed(0)}K
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Stock Movements Widget [web:106]
// function StockMovementsWidget({ router }: { router: any }) {
//   return (
//     <div className="glass-effect rounded-xl p-6 border border-border h-full overflow-auto">
//       <h2 className="text-lg font-semibold text-primary mb-5">
//         Recent Stock Movements
//       </h2>
//       <div className="space-y-3">
//         {dummyData.stockMovements.map((movement) => (
//           <motion.div
//             key={movement.id}
//             whileHover={{ x: 4 }}
//             className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer"
//             onClick={() => router.push("/dashboard/history")}
//           >
//             <div
//               className={`flex-shrink-0 p-2 rounded-lg ${
//                 movement.type === "receipt"
//                   ? "bg-success/10"
//                   : movement.type === "delivery"
//                   ? "bg-info/10"
//                   : "bg-warning/10"
//               }`}
//             >
//               <Package
//                 className={`w-5 h-5 ${
//                   movement.type === "receipt"
//                     ? "text-success"
//                     : movement.type === "delivery"
//                     ? "text-info"
//                     : "text-warning"
//                 }`}
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-medium text-sm truncate">{movement.product}</p>
//               <p className="text-xs text-text-secondary">
//                 {movement.warehouse}
//               </p>
//             </div>
//             <div className="flex-shrink-0 text-right">
//               <p
//                 className={`font-semibold text-sm ${
//                   movement.quantity > 0 ? "text-success" : "text-error"
//                 }`}
//               >
//                 {movement.quantity > 0 ? "+" : ""}
//                 {movement.quantity}
//               </p>
//               <span className="text-xs text-text-tertiary capitalize">
//                 {movement.type}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
  Warehouse,
  TrendingUp,
  Clock,
  Plus,
  X,
  Grid3x3,
  Save,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  GripVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import RollingText from "@/components/RollingText";
import dummyData from "@/data/dummy.json";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Truck } from "lucide-react"; // If using lucide-react for icons

function DeliveriesWidget({ deliveries, router, isEditMode }) {
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
            className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-info-30 flex-shrink-0"
            onClick={() =>
              !isEditMode && router.push(`/dashboard/deliveries/${delivery.id}`)
            }
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 p-2 rounded-lg bg-info-10">
                <Truck className="w-5 h-5 text-info" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {delivery.deliveryNumber}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {delivery.customer}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 text-right ml-3">
              <p className="font-semibold text-sm">
                {delivery.items.length} items
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                  delivery.status === "dispatched"
                    ? "bg-success-10 text-success"
                    : "bg-warning-10 text-warning"
                }`}
              >
                {delivery.status.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => !isEditMode && router.push("/dashboard/deliveries")}
        className="w-full mt-4 py-2.5 text-info hover:text-info-dark font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
      >
        View All Deliveries
      </button>
    </div>
  );
}

const ResponsiveGridLayout = WidthProvider(Responsive);

// Helper to reorder arrays
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// // Widget Configuration - FIXED SIZING
// const WIDGET_CONFIGS = {
//   kpi: {
//     title: "KPI Cards",
//     minW: 12,
//     maxW: 12,
//     minH: 2,
//     maxH: 3,
//     defaultW: 12,
//     defaultH: 2,
//   },
//   warehouses: {
//     title: "Warehouse Status",
//     minW: 6,
//     maxW: 12,
//     minH: 4,
//     maxH: 7,
//     defaultW: 12,
//     defaultH: 5,
//   },
//   quickActions: {
//     title: "Quick Actions",
//     minW: 6,
//     maxW: 12,
//     minH: 2,
//     maxH: 4,
//     defaultW: 12,
//     defaultH: 3,
//   },
//   recentActivity: {
//     title: "Recent Activity",
//     minW: 4,
//     maxW: 8,
//     minH: 5,
//     maxH: 10,
//     defaultW: 6,
//     defaultH: 6,
//   },
//   stockAlerts: {
//     title: "Stock Alerts",
//     minW: 4,
//     maxW: 8,
//     minH: 5,
//     maxH: 10,
//     defaultW: 6,
//     defaultH: 6,
//   },
//   topProducts: {
//     title: "Top Products",
//     minW: 4,
//     maxW: 8,
//     minH: 4,
//     maxH: 8,
//     defaultW: 6,
//     defaultH: 5,
//   },
//   categories: {
//     title: "Categories",
//     minW: 4,
//     maxW: 8,
//     minH: 4,
//     maxH: 7,
//     defaultW: 6,
//     defaultH: 4,
//   },
// };

// // Default layout
// const DEFAULT_LAYOUTS = {
//   lg: [
//     { i: "kpi", x: 0, y: 0, w: 12, h: 2, minW: 12, maxW: 12, minH: 2, maxH: 3 },
//     {
//       i: "warehouses",
//       x: 0,
//       y: 2,
//       w: 12,
//       h: 5,
//       minW: 6,
//       maxW: 12,
//       minH: 4,
//       maxH: 7,
//     },
//     {
//       i: "quickActions",
//       x: 0,
//       y: 7,
//       w: 12,
//       h: 3,
//       minW: 6,
//       maxW: 12,
//       minH: 2,
//       maxH: 4,
//     },
//     {
//       i: "recentActivity",
//       x: 0,
//       y: 10,
//       w: 6,
//       h: 6,
//       minW: 4,
//       maxW: 8,
//       minH: 5,
//       maxH: 10,
//     },
//     {
//       i: "stockAlerts",
//       x: 6,
//       y: 10,
//       w: 6,
//       h: 6,
//       minW: 4,
//       maxW: 8,
//       minH: 5,
//       maxH: 10,
//     },
//   ],
// };
const WIDGET_CONFIGS = {
  kpi: {
    title: "KPI Cards",
    minW: 12,
    maxW: 12,
    minH: 2,
    maxH: 3,
    defaultW: 12,
    defaultH: 2,
  },
  warehouses: {
    title: "Warehouse Status",
    minW: 6,
    maxW: 12,
    minH: 4,
    maxH: 7,
    defaultW: 12,
    defaultH: 5,
  },
  quickActions: {
    title: "Quick Actions",
    minW: 6,
    maxW: 12,
    minH: 2,
    maxH: 4,
    defaultW: 12,
    defaultH: 3,
  },
  deliveries: {
    title: "Deliveries",
    minW: 4,
    maxW: 8,
    minH: 4,
    maxH: 10,
    defaultW: 6,
    defaultH: 6,
  },
  recentActivity: {
    title: "Recent Activity",
    minW: 4,
    maxW: 8,
    minH: 5,
    maxH: 10,
    defaultW: 6,
    defaultH: 6,
  },
  stockAlerts: {
    title: "Stock Alerts",
    minW: 4,
    maxW: 8,
    minH: 5,
    maxH: 10,
    defaultW: 6,
    defaultH: 6,
  },
  topProducts: {
    title: "Top Products",
    minW: 4,
    maxW: 8,
    minH: 4,
    maxH: 8,
    defaultW: 6,
    defaultH: 5,
  },
  categories: {
    title: "Categories",
    minW: 4,
    maxW: 8,
    minH: 4,
    maxH: 7,
    defaultW: 6,
    defaultH: 4,
  },
};
const DEFAULT_LAYOUTS = {
  lg: [
    {
      i: "kpi",
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      minW: 12,
      maxW: 12,
      minH: 2,
      maxH: 3,
    },
    {
      i: "warehouses",
      x: 0,
      y: 2,
      w: 12,
      h: 5,
      minW: 6,
      maxW: 12,
      minH: 4,
      maxH: 7,
    },
    {
      i: "quickActions",
      x: 0,
      y: 7,
      w: 12,
      h: 3,
      minW: 6,
      maxW: 12,
      minH: 2,
      maxH: 4,
    },
    {
      i: "recentActivity",
      x: 0,
      y: 10,
      w: 6,
      h: 6,
      minW: 4,
      maxW: 8,
      minH: 5,
      maxH: 10,
    },
    {
      i: "stockAlerts",
      x: 6,
      y: 10,
      w: 6,
      h: 6,
      minW: 4,
      maxW: 8,
      minH: 5,
      maxH: 10,
    },
    {
      i: "topProducts",
      x: 0,
      y: 16,
      w: 6,
      h: 5,
      minW: 4,
      maxW: 8,
      minH: 4,
      maxH: 8,
    },
    {
      i: "categories",
      x: 6,
      y: 16,
      w: 6,
      h: 4,
      minW: 4,
      maxW: 8,
      minH: 4,
      maxH: 7,
    },
    {
      i: "deliveries",
      x: 0,
      y: 20,
      w: 6,
      h: 6,
      minW: 4,
      maxW: 8,
      minH: 4,
      maxH: 10,
    },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    "kpi",
    "warehouses",
    "quickActions",
    "recentActivity",
    "stockAlerts",
    "deliveries",
  ]);

  // Internal ordering state
  const [kpiOrder, setKpiOrder] = useState([0, 1, 2, 3]);
  const [warehouseOrder, setWarehouseOrder] = useState([0, 1]);
  const [quickActionsOrder, setQuickActionsOrder] = useState([0, 1, 2, 3]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user) setCurrentUser(JSON.parse(user));

      const savedLayout = localStorage.getItem("dashboardLayout");
      const savedWidgets = localStorage.getItem("dashboardWidgets");
      if (savedLayout) setLayouts(JSON.parse(savedLayout));
      if (savedWidgets) setActiveWidgets(JSON.parse(savedWidgets));

      // Load internal ordering
      const savedKpiOrder = localStorage.getItem("kpiOrder");
      const savedWarehouseOrder = localStorage.getItem("warehouseOrder");
      const savedQuickActionsOrder = localStorage.getItem("quickActionsOrder");
      if (savedKpiOrder) setKpiOrder(JSON.parse(savedKpiOrder));
      if (savedWarehouseOrder)
        setWarehouseOrder(JSON.parse(savedWarehouseOrder));
      if (savedQuickActionsOrder)
        setQuickActionsOrder(JSON.parse(savedQuickActionsOrder));
    }
  }, []);

  const handleLayoutChange = (layout: Layout[], allLayouts: any) => {
    setLayouts(allLayouts);
  };

  const saveLayout = () => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
    localStorage.setItem("dashboardWidgets", JSON.stringify(activeWidgets));
    localStorage.setItem("kpiOrder", JSON.stringify(kpiOrder));
    localStorage.setItem("warehouseOrder", JSON.stringify(warehouseOrder));
    localStorage.setItem(
      "quickActionsOrder",
      JSON.stringify(quickActionsOrder)
    );
    setIsEditMode(false);
  };

  const resetLayout = () => {
    setLayouts(DEFAULT_LAYOUTS);
    setActiveWidgets([
      "kpi",
      "warehouses",
      "quickActions",
      "recentActivity",
      "stockAlerts",
    ]);
    setKpiOrder([0, 1, 2, 3]);
    setWarehouseOrder([0, 1]);
    setQuickActionsOrder([0, 1, 2, 3]);
    localStorage.removeItem("dashboardLayout");
    localStorage.removeItem("dashboardWidgets");
    localStorage.removeItem("kpiOrder");
    localStorage.removeItem("warehouseOrder");
    localStorage.removeItem("quickActionsOrder");
  };

  const addWidget = (widgetId: string) => {
    if (!activeWidgets.includes(widgetId)) {
      const config = WIDGET_CONFIGS[widgetId as keyof typeof WIDGET_CONFIGS];
      if (config) {
        setActiveWidgets([...activeWidgets, widgetId]);

        // Create new layout with PROPER default size
        const newLayout = {
          i: widgetId,
          x: 0,
          y: Infinity, // Places at bottom
          w: config.defaultW, // FIXED: Use defaultW
          h: config.defaultH, // FIXED: Use defaultH
          minW: config.minW,
          maxW: config.maxW,
          minH: config.minH,
          maxH: config.maxH,
        };

        // Add to all breakpoints
        setLayouts({
          lg: [...(layouts.lg || []), newLayout],
          md: [
            ...(layouts.md || []),
            { ...newLayout, w: Math.min(config.defaultW, 10) },
          ],
          sm: [...(layouts.sm || []), { ...newLayout, w: 6 }],
        });
      }
    }
  };

  const removeWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter((id) => id !== widgetId));
    setLayouts({
      lg: (layouts.lg || []).filter((item) => item.i !== widgetId),
      md: (layouts.md || []).filter((item) => item.i !== widgetId),
      sm: (layouts.sm || []).filter((item) => item.i !== widgetId),
    });
  };

  // Handle internal drag and drop
  const handleInternalDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === "KPI_CARDS") {
      const newOrder = reorder(kpiOrder, source.index, destination.index);
      setKpiOrder(newOrder);
    } else if (type === "WAREHOUSES") {
      const newOrder = reorder(warehouseOrder, source.index, destination.index);
      setWarehouseOrder(newOrder);
    } else if (type === "QUICK_ACTIONS") {
      const newOrder = reorder(
        quickActionsOrder,
        source.index,
        destination.index
      );
      setQuickActionsOrder(newOrder);
    }
  };

  return (
    <DragDropContext onDragEnd={handleInternalDragEnd}>
      <div className="space-y-6 pb-8">
        {/* Header with Edit Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-border"
        >
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">
              {dummyData.labels.dashboard}
            </h1>
            <p className="text-sm text-text-secondary">
              {dummyData.labels.welcome}, {currentUser?.name || "User"}!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {isEditMode ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={resetLayout}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                  <button
                    onClick={saveLayout}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/20"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save Layout</span>
                  </button>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-sidebar-hover transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-200"
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Customize Dashboard</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Rolling Text Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RollingText messages={dummyData.rollingTextMessages} />
        </motion.div>

        {/* Widget Library (Edit Mode) */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="glass-effect rounded-xl p-6 border-2 border-accent/50 bg-accent/5"
            >
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 text-accent">
                <Plus className="w-5 h-5" />
                Add Widgets to Dashboard
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.entries(WIDGET_CONFIGS).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => addWidget(key)}
                    disabled={activeWidgets.includes(key)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                      activeWidgets.includes(key)
                        ? "border-border bg-sidebar-hover text-text-tertiary cursor-not-allowed opacity-50"
                        : "border-accent/30 text-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {activeWidgets.includes(key) && (
                        <span className="text-xs">✓</span>
                      )}
                      {config.title}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-tertiary mt-4 text-center">
                💡 Drag widgets to reposition • Drag cards inside to reorder •
                Resize from corner
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Layout */}
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 10, sm: 6 }}
          rowHeight={80}
          margin={isEditMode ? [40, 40] : [16, 16]}
          containerPadding={[0, 0]}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle"
          compactType="vertical"
          preventCollision={false}
          useCSSTransforms={true}
        >
          {activeWidgets.map((widgetId) => (
            <div key={widgetId} className="relative group">
              <AnimatePresence>
                {isEditMode && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-3 right-2 z-20 flex gap-2"
                  >
                    <div className="drag-handle cursor-move p-2 bg-accent rounded-lg shadow-lg hover:bg-accent-dark transition-all duration-200 hover:scale-110">
                      <Grid3x3 className="w-4 h-4 text-white" />
                    </div>
                    <button
                      onClick={() => removeWidget(widgetId)}
                      className="p-2 bg-error rounded-lg shadow-lg hover:bg-error/80 transition-all duration-200 hover:scale-110"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`h-full w-full transition-all duration-200 ${
                  isEditMode
                    ? "ring-2 ring-accent/30 ring-offset-2 ring-offset-background rounded-xl"
                    : ""
                }`}
              >
                {renderWidget(widgetId, router, isEditMode, {
                  kpiOrder,
                  warehouseOrder,
                  quickActionsOrder,
                })}
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </DragDropContext>
  );
}

// Render widget with edit mode and ordering
function renderWidget(
  widgetId: string,
  router: any,
  isEditMode: boolean,
  orderState: {
    kpiOrder: number[];
    warehouseOrder: number[];
    quickActionsOrder: number[];
  }
) {
  const widgets = {
    kpi: (
      <KPIWidget
        router={router}
        isEditMode={isEditMode}
        order={orderState.kpiOrder}
      />
    ),
    deliveries: (
      <DeliveriesWidget
        deliveries={dummyData.deliveries}
        router={router}
        isEditMode={isEditMode}
      />
    ),
    warehouses: (
      <WarehousesWidget
        router={router}
        isEditMode={isEditMode}
        order={orderState.warehouseOrder}
      />
    ),
    quickActions: (
      <QuickActionsWidget
        router={router}
        isEditMode={isEditMode}
        order={orderState.quickActionsOrder}
      />
    ),
    recentActivity: (
      <RecentActivityWidget router={router} isEditMode={isEditMode} />
    ),
    stockAlerts: <StockAlertsWidget router={router} isEditMode={isEditMode} />,
    topProducts: <TopProductsWidget router={router} isEditMode={isEditMode} />,
    categories: <CategoriesWidget router={router} isEditMode={isEditMode} />,
  };

  return widgets[widgetId as keyof typeof widgets] || null;
}

// KPI Widget with Internal Drag & Drop
function KPIWidget({
  router,
  isEditMode,
  order,
}: {
  router: any;
  isEditMode: boolean;
  order: number[];
}) {
  const allKpiCards = [
    {
      title: "Total Products",
      value: dummyData.kpi.totalProducts,
      change: `+${dummyData.kpi.monthlyGrowth}%`,
      trend: "up",
      icon: Package,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      link: "/dashboard/products",
    },
    {
      title: "Low Stock",
      value: dummyData.kpi.lowStock,
      change: "Alert",
      trend: "down",
      icon: AlertTriangle,
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      link: "/dashboard/products",
    },
    {
      title: "Out of Stock",
      value: dummyData.kpi.outOfStock,
      change: "Critical",
      trend: "down",
      icon: AlertTriangle,
      iconColor: "text-error",
      bgColor: "bg-error/10",
      link: "/dashboard/products",
    },
    {
      title: "Total Value",
      value: `$${(dummyData.kpi.totalValue / 1000).toFixed(0)}K`,
      change: `+${dummyData.kpi.monthlyGrowth}%`,
      trend: "up",
      icon: DollarSign,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      link: "/dashboard/history",
    },
  ];

  const kpiCards = order.map((index) => allKpiCards[index]);

  return (
    <Droppable
      droppableId="kpi-cards"
      direction="horizontal"
      type="KPI_CARDS"
      isDropDisabled={!isEditMode}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`h-full w-full p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 ${
            snapshot.isDraggingOver && isEditMode
              ? "bg-accent/5 rounded-xl"
              : ""
          }`}
        >
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Draggable
                key={`kpi-${order[index]}`}
                draggableId={`kpi-${order[index]}`}
                index={index}
                isDragDisabled={!isEditMode}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${snapshot.isDragging ? "z-50" : ""}`}
                  >
                    <div
                      onClick={() => !isEditMode && router.push(card.link)}
                      className={`glass-effect rounded-xl p-5 border border-border hover:border-accent hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full relative ${
                        snapshot.isDragging
                          ? "rotate-2 scale-105 shadow-2xl"
                          : ""
                      } ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                    >
                      {isEditMode && (
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-2 left-2 p-1 rounded bg-accent/10 hover:bg-accent/20 transition"
                        >
                          <GripVertical className="w-4 h-4 text-accent" />
                        </div>
                      )}
                      <div
                        className={`flex items-start justify-between ${
                          isEditMode ? "mt-6" : "mb-4"
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${card.bgColor}`}>
                          <Icon className={`w-5 h-5 ${card.iconColor}`} />
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                            card.trend === "up"
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          {card.trend === "up" ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {card.change}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-text-secondary text-xs font-medium mb-2 uppercase tracking-wide">
                          {card.title}
                        </h3>
                        <p className="text-3xl font-bold text-primary">
                          {card.value}
                        </p>
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

// Warehouses Widget with Internal Drag
function WarehousesWidget({
  router,
  isEditMode,
  order,
}: {
  router: any;
  isEditMode: boolean;
  order: number[];
}) {
  const allWarehouses = dummyData.warehouses;
  const warehouses = order.map((index) => allWarehouses[index]);

  return (
    <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2 flex-shrink-0">
        <Warehouse className="w-5 h-5 text-info" />
        Warehouse Status
      </h2>
      <Droppable
        droppableId="warehouses"
        type="WAREHOUSES"
        isDropDisabled={!isEditMode}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-auto pr-2 ${
              snapshot.isDraggingOver && isEditMode
                ? "bg-info/5 rounded-lg"
                : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {warehouses.map((warehouse, index) => (
                <Draggable
                  key={`warehouse-${order[index]}`}
                  draggableId={`warehouse-${order[index]}`}
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${snapshot.isDragging ? "z-50" : ""}`}
                    >
                      <div
                        onClick={() =>
                          !isEditMode && router.push(`/dashboard/warehouses`)
                        }
                        className={`p-5 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 border border-transparent hover:border-info/30 relative ${
                          snapshot.isDragging ? "scale-105 shadow-2xl" : ""
                        } ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                      >
                        {isEditMode && (
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-2 right-2 p-1 rounded bg-info/10 hover:bg-info/20 transition z-10"
                          >
                            <GripVertical className="w-4 h-4 text-info" />
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-base mb-1">
                              {warehouse.name}
                            </h3>
                            <p className="text-xs text-text-secondary">
                              {warehouse.location}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                            {warehouse.status}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">
                              Capacity
                            </span>
                            <span className="font-semibold">
                              {warehouse.currentStock.toLocaleString()} /{" "}
                              {warehouse.capacity.toLocaleString()}
                            </span>
                          </div>

                          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${warehouse.utilizationPercent}%`,
                              }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-info to-accent rounded-full h-2"
                            />
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">
                              Utilization
                            </span>
                            <span className="font-semibold text-accent">
                              {warehouse.utilizationPercent}%
                            </span>
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

// Quick Actions with Internal Drag
function QuickActionsWidget({
  router,
  isEditMode,
  order,
}: {
  router: any;
  isEditMode: boolean;
  order: number[];
}) {
  const allActions = dummyData.quickActions;
  const actions = order.map((index) => allActions[index]);

  return (
    <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
      <h2 className="text-lg font-semibold text-primary mb-5 flex-shrink-0">
        Quick Actions
      </h2>
      <Droppable
        droppableId="quick-actions"
        direction="horizontal"
        type="QUICK_ACTIONS"
        isDropDisabled={!isEditMode}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 content-start ${
              snapshot.isDraggingOver && isEditMode
                ? "bg-accent/5 rounded-lg"
                : ""
            }`}
          >
            {actions.map((action, index) => (
              <Draggable
                key={`action-${order[index]}`}
                draggableId={`action-${order[index]}`}
                index={index}
                isDragDisabled={!isEditMode}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${snapshot.isDragging ? "z-50" : ""}`}
                  >
                    <button
                      onClick={() => !isEditMode && router.push(action.link)}
                      className={`p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 text-left border border-transparent hover:border-accent/30 h-full w-full relative ${
                        snapshot.isDragging ? "scale-110 shadow-2xl" : ""
                      } ${isEditMode ? "cursor-move" : "cursor-pointer"}`}
                    >
                      {isEditMode && (
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-1 right-1 p-0.5 rounded bg-accent/10 hover:bg-accent/20 transition z-10"
                        >
                          <GripVertical className="w-3 h-3 text-accent" />
                        </div>
                      )}
                      <div
                        className={`inline-flex p-2.5 rounded-lg mb-3 ${
                          action.color === "accent"
                            ? "bg-accent/10"
                            : action.color === "success"
                            ? "bg-success/10"
                            : action.color === "info"
                            ? "bg-info/10"
                            : "bg-warning/10"
                        }`}
                      >
                        <Plus
                          className={`w-5 h-5 ${
                            action.color === "accent"
                              ? "text-accent"
                              : action.color === "success"
                              ? "text-success"
                              : action.color === "info"
                              ? "text-info"
                              : "text-warning"
                          }`}
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-2">
                        {action.description}
                      </p>
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

// Keep other widgets (Recent Activity, Stock Alerts, Top Products, Categories) as-is from previous code...
// (Copy the remaining widget components from your existing code - they stay the same)

function RecentActivityWidget({
  router,
  isEditMode,
}: {
  router: any;
  isEditMode: boolean;
}) {
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
            onClick={() =>
              !isEditMode && router.push("/dashboard/operations/receipts")
            }
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 p-2 rounded-lg bg-success/10">
                <ShoppingCart className="w-5 h-5 text-success" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {receipt.receiptNumber}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {receipt.supplier}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 text-right ml-3">
              <p className="font-semibold text-sm">
                ${receipt.totalValue.toFixed(0)}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                  receipt.status === "completed"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {receipt.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => !isEditMode && router.push("/dashboard/history")}
        className="w-full mt-4 py-2.5 text-accent hover:text-accent-dark font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
      >
        View All Activity →
      </button>
    </div>
  );
}

function StockAlertsWidget({
  router,
  isEditMode,
}: {
  router: any;
  isEditMode: boolean;
}) {
  return (
    <div className="h-full w-full glass-effect rounded-xl p-6 border border-border flex flex-col">
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Stock Alerts
        </h2>
      </div>
      <div className="flex-1 overflow-auto space-y-2.5 pr-2 min-h-0">
        {dummyData.products
          .filter((p) => p.status !== "in-stock")
          .map((product) => (
            <motion.div
              key={product.id}
              whileHover={!isEditMode ? { x: 4 } : {}}
              className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-warning/30 flex-shrink-0"
              onClick={() => !isEditMode && router.push("/dashboard/products")}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`flex-shrink-0 p-2 rounded-lg ${
                    product.status === "out-of-stock"
                      ? "bg-error/10"
                      : "bg-warning/10"
                  }`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      product.status === "out-of-stock"
                        ? "text-error"
                        : "text-warning"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-text-secondary truncate">
                    {product.location}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right ml-3">
                <p className="font-semibold text-sm">
                  {product.stock} {product.unit}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                    product.status === "out-of-stock"
                      ? "bg-error/10 text-error"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {product.status.replace("-", " ")}
                </span>
              </div>
            </motion.div>
          ))}
      </div>
      <button
        onClick={() => !isEditMode && router.push("/dashboard/products")}
        className="w-full mt-4 py-2.5 text-warning hover:text-warning/80 font-medium transition-colors text-sm border-t border-border pt-4 flex-shrink-0"
      >
        View All Products →
      </button>
    </div>
  );
}

function TopProductsWidget({
  router,
  isEditMode,
}: {
  router: any;
  isEditMode: boolean;
}) {
  return (
    <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2 flex-shrink-0">
        <TrendingUp className="w-5 h-5 text-success" />
        Top Products
      </h2>
      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {dummyData.topProducts.map((product, index) => (
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
              <p className="text-xs text-text-secondary">
                {product.sales.toLocaleString()} units sold
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="font-bold text-sm">
                ${(product.revenue / 1000).toFixed(1)}K
              </p>
              <span className="text-xs text-success font-medium">
                ↑ {product.growth}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CategoriesWidget({
  router,
  isEditMode,
}: {
  router: any;
  isEditMode: boolean;
}) {
  return (
    <div className="h-full w-full glass-effect rounded-xl p-6 border border-border overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold text-primary mb-5 flex-shrink-0">
        Categories
      </h2>
      <div className="flex-1 overflow-auto pr-2">
        <div className="grid grid-cols-2 gap-3 auto-rows-min">
          {dummyData.categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={!isEditMode ? { scale: 1.05 } : {}}
              className="p-4 rounded-xl bg-background-secondary hover:bg-sidebar-hover transition-all duration-200 cursor-pointer border border-transparent hover:border-accent/30"
              onClick={() =>
                !isEditMode && router.push("/dashboard/categories")
              }
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-semibold text-sm truncate">
                  {category.name}
                </h3>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                {category.productCount} products
              </p>
              <p className="text-lg font-bold">
                ${(category.totalValue / 1000).toFixed(0)}K
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
