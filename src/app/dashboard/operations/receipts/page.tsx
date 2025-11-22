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
import { Plus, Truck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const initialReceipts = [
    { id: "RCP-001", supplier: "ABC Steel Co.", date: "2024-11-22", status: "Done", items: 3, total: "450 kg" },
    { id: "RCP-002", supplier: "Wood Suppliers Ltd.", date: "2024-11-21", status: "Waiting", items: 2, total: "120 Units" },
    { id: "RCP-003", supplier: "Plastic Industries", date: "2024-11-20", status: "Done", items: 5, total: "2000 Units" },
];

export default function ReceiptsPage() {
    const [receipts, setReceipts] = useState(initialReceipts);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        supplier: "",
        product: "",
        quantity: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReceipt = {
            id: `RCP-${String(receipts.length + 1).padStart(3, '0')}`,
            supplier: formData.supplier,
            date: new Date().toISOString().split('T')[0],
            status: "Waiting",
            items: 1,
            total: `${formData.quantity} Units`,
        };
        setReceipts([newReceipt, ...receipts]);
        setFormData({ supplier: "", product: "", quantity: "", notes: "" });
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Receipts (Incoming Stock)</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Receipt
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>New Receipt</DialogTitle>
                            <DialogDescription>
                                Record incoming goods from vendor
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="supplier">Supplier Name *</Label>
                                    <Input
                                        id="supplier"
                                        placeholder="e.g., ABC Steel Co."
                                        value={formData.supplier}
                                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="product">Product *</Label>
                                        <Input
                                            id="product"
                                            placeholder="e.g., Steel Rods"
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="quantity">Quantity Received *</Label>
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
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Additional notes..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Receipt</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Incoming Goods</CardTitle>
                    <CardDescription>
                        Track goods received from vendors
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Receipt ID</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total Quantity</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {receipts.map((receipt) => (
                                <TableRow key={receipt.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4 text-muted-foreground" />
                                            {receipt.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{receipt.supplier}</TableCell>
                                    <TableCell>{receipt.date}</TableCell>
                                    <TableCell>{receipt.items}</TableCell>
                                    <TableCell>{receipt.total}</TableCell>
                                    <TableCell>
                                        {receipt.status === "Done" ? (
                                            <Badge variant="secondary">Done</Badge>
                                        ) : (
                                            <Badge>Waiting</Badge>
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
