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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search } from "lucide-react";

// Mock data
const initialProducts = [
    { id: 1, name: "Steel Rods", sku: "STL-001", category: "Raw Materials", stock: 250, minStock: 100, uom: "kg" },
    { id: 2, name: "Wooden Chairs", sku: "FUR-002", category: "Furniture", stock: 45, minStock: 20, uom: "Units" },
    { id: 3, name: "Plastic Bottles", sku: "PKG-003", category: "Packaging", stock: 1200, minStock: 500, uom: "Units" },
    { id: 4, name: "Office Desks", sku: "FUR-004", category: "Furniture", stock: 8, minStock: 15, uom: "Units" },
    { id: 5, name: "LED Bulbs", sku: "ELC-005", category: "Electronics", stock: 340, minStock: 200, uom: "Units" },
];

export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        uom: "Units",
        minStock: "",
        initialStock: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            id: products.length + 1,
            name: formData.name,
            sku: formData.sku,
            category: formData.category,
            stock: parseInt(formData.initialStock) || 0,
            minStock: parseInt(formData.minStock) || 0,
            uom: formData.uom,
        };
        setProducts([...products, newProduct]);
        setFormData({
            name: "",
            sku: "",
            category: "",
            uom: "Units",
            minStock: "",
            initialStock: "",
        });
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>New Product</DialogTitle>
                            <DialogDescription>
                                Add a new product to your inventory
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Steel Rods"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sku">SKU / Code *</Label>
                                        <Input
                                            id="sku"
                                            placeholder="e.g., STL-001"
                                            value={formData.sku}
                                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Category *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                                                <SelectItem value="Furniture">Furniture</SelectItem>
                                                <SelectItem value="Electronics">Electronics</SelectItem>
                                                <SelectItem value="Packaging">Packaging</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="uom">Unit of Measure</Label>
                                        <Select
                                            value={formData.uom}
                                            onValueChange={(value) => setFormData({ ...formData, uom: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Units">Units</SelectItem>
                                                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                                                <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                                                <SelectItem value="litres">Litres</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="minStock">Min Stock Level</Label>
                                        <Input
                                            id="minStock"
                                            type="number"
                                            placeholder="0"
                                            value={formData.minStock}
                                            onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="initialStock">Initial Stock</Label>
                                        <Input
                                            id="initialStock"
                                            type="number"
                                            placeholder="0"
                                            value={formData.initialStock}
                                            onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Product</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Product Inventory</CardTitle>
                            <CardDescription>
                                Manage your product catalog and stock levels
                            </CardDescription>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by name or SKU..."
                                className="pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Min Stock</TableHead>
                                <TableHead>UoM</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.sku}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            {product.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.minStock}</TableCell>
                                    <TableCell>{product.uom}</TableCell>
                                    <TableCell>
                                        {product.stock <= product.minStock ? (
                                            <Badge variant="destructive">Low Stock</Badge>
                                        ) : (
                                            <Badge variant="secondary">In Stock</Badge>
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
