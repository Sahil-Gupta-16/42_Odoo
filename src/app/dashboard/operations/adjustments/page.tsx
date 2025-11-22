import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, ClipboardList } from "lucide-react";

const adjustments = [
    { id: "ADJ-001", product: "Steel Rods", location: "Main Warehouse", counted: 248, system: 250, diff: -2, date: "2024-11-22" },
    { id: "ADJ-002", product: "Wooden Chairs", location: "Showroom", counted: 47, system: 45, diff: +2, date: "2024-11-21" },
    { id: "ADJ-003", product: "LED Bulbs", location: "Storage A", counted: 337, system: 340, diff: -3, date: "2024-11-20" },
];

export default function AdjustmentsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Stock Adjustments</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Adjustment
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Inventory Adjustments</CardTitle>
                    <CardDescription>
                        Reconcile physical count with system records
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Adjustment ID</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Physical Count</TableHead>
                                <TableHead>System Count</TableHead>
                                <TableHead>Difference</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adjustments.map((adj) => (
                                <TableRow key={adj.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                                            {adj.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{adj.product}</TableCell>
                                    <TableCell>{adj.location}</TableCell>
                                    <TableCell>{adj.counted}</TableCell>
                                    <TableCell>{adj.system}</TableCell>
                                    <TableCell>
                                        <span className={adj.diff < 0 ? "text-red-600" : "text-green-600"}>
                                            {adj.diff > 0 ? "+" : ""}{adj.diff}
                                        </span>
                                    </TableCell>
                                    <TableCell>{adj.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
