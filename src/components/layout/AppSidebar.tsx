"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ArrowLeftRight,
    ClipboardList,
    Settings,
    LogOut,
    Truck,
    ShoppingCart
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Operations",
        icon: ClipboardList,
        submenu: [
            { title: "Receipts", href: "/dashboard/operations/receipts", icon: ShoppingCart },
            { title: "Deliveries", href: "/dashboard/operations/deliveries", icon: Truck },
            { title: "Internal Transfers", href: "/dashboard/operations/transfers", icon: ArrowLeftRight },
            { title: "Adjustments", href: "/dashboard/operations/adjustments", icon: ClipboardList },
        ]
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block w-64 h-screen sticky top-0">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package className="h-6 w-6" />
                        <span className="">Inventory</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.submenu ? (
                                    <div className="mt-4 mb-2">
                                        <h4 className="mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            {item.title}
                                        </h4>
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                                    pathname === sub.href
                                                        ? "bg-muted text-primary"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                <sub.icon className="h-4 w-4" />
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                            pathname === item.href
                                                ? "bg-muted text-primary"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
