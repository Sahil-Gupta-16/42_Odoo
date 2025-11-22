import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Activity,
    CreditCard,
    DollarSign,
    Users,
    Package,
    AlertTriangle,
    Truck,
    ArrowLeftRight
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Low Stock Items
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">12</div>
                        <p className="text-xs text-muted-foreground">
                            Needs attention
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Incoming Receipts</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">
                            Expected today
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            To be shipped
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Recent Operations</CardTitle>
                            <CardDescription>
                                Recent stock movements from your store.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Placeholder for Activity Feed */}
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Received 50 Steel Rods</p>
                                    <p className="text-sm text-muted-foreground">
                                        PO-001 • 2 mins ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-green-600">
                                    +50
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Delivered 10 Chairs</p>
                                    <p className="text-sm text-muted-foreground">
                                        DO-005 • 1 hour ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-red-600">
                                    -10
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {/* Quick Action Buttons */}
                        <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                            <Truck className="h-6 w-6" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">New Receipt</p>
                                <p className="text-xs text-muted-foreground">Receive goods from vendor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                            <Package className="h-6 w-6" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">New Delivery</p>
                                <p className="text-xs text-muted-foreground">Ship items to customer</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
