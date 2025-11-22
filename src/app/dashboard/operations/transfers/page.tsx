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
import { Plus, ArrowLeftRight } from "lucide-react";

const transfers = [
    { id: "TRF-001", from: "Main Warehouse", to: "Production Floor", date: "2024-11-22", status: "Done", items: 2 },
    { id: "TRF-002", from: "Warehouse 1", to: "Warehouse 2", date: "2024-11-21", status: "Ready", items: 3 },
    { id: "TRF-003", from: "Rack A", to: "Rack B", date: "2024-11-20", status: "Draft", items: 1 },
];

export default function TransfersPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Internal Transfers</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Transfer
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Stock Movements</CardTitle>
                    <CardDescription>
                        Transfer items between locations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transfer ID</TableHead>
                                <TableHead>From Location</TableHead>
                                <TableHead>To Location</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transfers.map((transfer) => (
                                <TableRow key={transfer.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                                            {transfer.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{transfer.from}</TableCell>
                                    <TableCell>{transfer.to}</TableCell>
                                    <TableCell>{transfer.date}</TableCell>
                                    <TableCell>{transfer.items}</TableCell>
                                    <TableCell>
                                        {transfer.status === "Done" ? (
                                            <Badge variant="secondary">Done</Badge>
                                        ) : transfer.status === "Ready" ? (
                                            <Badge>Ready</Badge>
                                        ) : (
                                            <Badge variant="outline">Draft</Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
