"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Package } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const initialDeliveries = [
    { id: "DEL-001", customer: "XYZ Manufacturing", date: "2024-11-22", status: "Ready", items: 2, total: "10 Units" },
    { id: "DEL-002", customer: "Retail Store A", date: "2024-11-21", status: "Done", items: 4, total: "50 Units" },
    { id: "DEL-003", customer: "Wholesale Corp", date: "2024-11-20", status: "Draft", items: 1, total: "5 Units" },
];

export default function DeliveriesPage() {
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        customer: "",
        product: "",
        quantity: "",
        address: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDelivery = {
            id: `DEL-${String(deliveries.length + 1).padStart(3, '0')}`,
            customer: formData.customer,
            date: new Date().toISOString().split('T')[0],
            status: "Draft",
            items: 1,
            total: `${formData.quantity} Units`,
        };
        setDeliveries([newDelivery, ...deliveries]);
        setFormData({ customer: "", product: "", quantity: "", address: "" });
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Delivery Orders (Outgoing Stock)</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Delivery
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>New Delivery Order</DialogTitle>
                            <DialogDescription>
                                Create a new shipment to customer
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="customer">Customer Name *</Label>
                                    <Input
                                        id="customer"
                                        placeholder="e.g., XYZ Manufacturing"
                                        value={formData.customer}
                                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="product">Product *</Label>
                                        <Input
                                            id="product"
                                            placeholder="e.g., Wooden Chairs"
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="quantity">Quantity *</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            placeholder="0"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="address">Delivery Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Shipping address..."
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Delivery</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Outgoing Shipments</CardTitle>
                    <CardDescription>
                        Manage deliveries to customers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Delivery ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total Quantity</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deliveries.map((delivery) => (
                                <TableRow key={delivery.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            {delivery.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{delivery.customer}</TableCell>
                                    <TableCell>{delivery.date}</TableCell>
                                    <TableCell>{delivery.items}</TableCell>
                                    <TableCell>{delivery.total}</TableCell>
                                    <TableCell>
                                        {delivery.status === "Done" ? (
                                            <Badge variant="secondary">Done</Badge>
                                        ) : delivery.status === "Ready" ? (
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
