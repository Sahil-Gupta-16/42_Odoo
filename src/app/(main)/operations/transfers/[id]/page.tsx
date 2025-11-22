'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Printer, X, Check, Plus, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import dummyData from '@/data/dummy.json';

// Types
type TransferStatus = 'draft' | 'ready' | 'done' | 'cancelled';

interface TransferItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    available: number;
}

interface TransferForm {
    fromWarehouse: string;
    toWarehouse: string;
    scheduleDate: string;
    responsible: string;
    notes: string;
}

export default function TransferDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // State
    const [status, setStatus] = useState<TransferStatus>('draft');
    const [formData, setFormData] = useState<TransferForm>({
        fromWarehouse: 'wh001',
        toWarehouse: 'wh002',
        scheduleDate: new Date().toISOString().split('T')[0],
        responsible: 'Mitchell Admin',
        notes: ''
    });

    const [items, setItems] = useState<TransferItem[]>([]);

    // Mock Data Loading
    useEffect(() => {
        if (id === 'new') {
            setStatus('draft');
        } else {
            const existingTransfer = dummyData.transfers.find(t => t.id === id);
            if (existingTransfer) {
                setStatus(existingTransfer.status as TransferStatus);
                setFormData({
                    fromWarehouse: existingTransfer.fromWarehouseId,
                    toWarehouse: existingTransfer.toWarehouseId,
                    scheduleDate: existingTransfer.scheduledDate,
                    responsible: existingTransfer.responsible,
                    notes: existingTransfer.notes
                });

                // Map items
                const mappedItems = existingTransfer.items.map((item, index) => {
                    const product = dummyData.products.find(p => p.id === item.productId);
                    return {
                        id: index.toString(),
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        available: product ? product.stock : 0 // Simplified logic: assumes stock in From Warehouse
                    };
                });
                setItems(mappedItems);
            }
        }
    }, [id]);

    // Actions
    const handleCheckAvailability = () => {
        // Simulate checking stock
        const allAvailable = items.every(item => item.quantity <= item.available);
        if (allAvailable) {
            setStatus('ready');
        } else {
            alert('Some items are not in stock.');
        }
    };

    const handleValidate = () => {
        if (status === 'ready') {
            setStatus('done');
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this transfer?')) {
            setStatus('cancelled');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const addItem = () => {
        const product = dummyData.products[0];
        setItems([...items, {
            id: Date.now().toString(),
            productId: product.id,
            productName: product.name,
            quantity: 1,
            available: product.stock
        }]);
    };

    const removeItem = (itemId: string) => {
        setItems(items.filter(i => i.id !== itemId));
    };

    const updateItem = (itemId: string, field: keyof TransferItem, value: any) => {
        setItems(items.map(i => {
            if (i.id === itemId) {
                const updated = { ...i, [field]: value };
                if (field === 'productId') {
                    const product = dummyData.products.find(p => p.id === value);
                    if (product) {
                        updated.productName = product.name;
                        updated.available = product.stock;
                    }
                }
                return updated;
            }
            return i;
        }));
    };

    // Status Badge Color
    const getStatusColor = (s: TransferStatus) => {
        switch (s) {
            case 'draft': return 'secondary';
            case 'ready': return 'purple';
            case 'done': return 'success';
            case 'cancelled': return 'destructive';
            default: return 'secondary';
        }
    };

    const transferNumber = id === 'new' ? 'New Transfer' :
        dummyData.transfers.find(t => t.id === id)?.transferNumber || 'WH/INT/0001';

    const isEditable = status === 'draft';

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                    <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/operations/transfers')}>Operations</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/operations/transfers')}>Transfers</span>
                    <span>/</span>
                    <span className="font-medium text-primary">{id === 'new' ? 'New' : transferNumber}</span>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
                {/* Header with Title, Status, Actions */}
                <div className="px-6 py-4 border-b border-border bg-background-secondary/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl font-bold text-primary">{transferNumber}</h1>
                            <Badge variant={getStatusColor(status)} className="text-xs capitalize px-2.5 py-0.5">
                                {status}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {status === 'draft' && (
                                <Button
                                    onClick={handleCheckAvailability}
                                    size="sm"
                                    className="h-9 text-sm bg-primary text-text-inverse hover:bg-primary-light"
                                >
                                    <RefreshCw className="h-4 w-4 mr-1.5" />
                                    Check Availability
                                </Button>
                            )}
                            {status === 'ready' && (
                                <Button
                                    onClick={handleValidate}
                                    size="sm"
                                    className="h-9 text-sm bg-primary text-text-inverse hover:bg-primary-light"
                                >
                                    <Check className="h-4 w-4 mr-1.5" />
                                    Validate
                                </Button>
                            )}
                            {status === 'done' && (
                                <Button variant="outline" size="sm" onClick={handlePrint} className="h-9">
                                    <Printer className="h-4 w-4 mr-1.5" />
                                    Print
                                </Button>
                            )}
                            {status !== 'done' && status !== 'cancelled' && (
                                <Button variant="destructive" size="sm" onClick={handleCancel} className="h-9">
                                    <X className="h-4 w-4 mr-1.5" />
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Progress Indicator */}
                <div className="px-6 py-3 bg-background-secondary/30 border-b border-border">
                    <div className="flex items-center gap-3 text-sm">
                        <span className={`font-medium transition-colors ${status === 'draft' ? 'text-primary' : status === 'cancelled' ? 'text-text-tertiary line-through' : 'text-success'}`}>
                            Draft
                        </span>
                        <div className={`h-px flex-1 max-w-[60px] ${status !== 'draft' && status !== 'cancelled' ? 'bg-success' : 'bg-border'}`} />
                        <span className={`font-medium transition-colors ${status === 'ready' ? 'text-purple' : status === 'done' ? 'text-success' : 'text-text-tertiary'}`}>
                            Ready
                        </span>
                        <div className={`h-px flex-1 max-w-[60px] ${status === 'done' ? 'bg-success' : 'bg-border'}`} />
                        <span className={`font-medium transition-colors ${status === 'done' ? 'text-success' : 'text-text-tertiary'}`}>
                            Done
                        </span>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-text-secondary">
                                From Warehouse <span className="text-error">*</span>
                            </Label>
                            <Select
                                disabled={!isEditable}
                                value={formData.fromWarehouse}
                                onValueChange={(val) => setFormData({ ...formData, fromWarehouse: val })}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select Warehouse" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="wh001">Main Warehouse</SelectItem>
                                    <SelectItem value="wh002">Secondary Warehouse</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-text-secondary">
                                To Warehouse <span className="text-error">*</span>
                            </Label>
                            <Select
                                disabled={!isEditable}
                                value={formData.toWarehouse}
                                onValueChange={(val) => setFormData({ ...formData, toWarehouse: val })}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select Warehouse" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="wh001">Main Warehouse</SelectItem>
                                    <SelectItem value="wh002">Secondary Warehouse</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-text-secondary">Schedule Date</Label>
                            <Input
                                type="date"
                                disabled={!isEditable}
                                value={formData.scheduleDate}
                                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                                className="h-9"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-text-secondary">Responsible</Label>
                            <Input
                                value={formData.responsible}
                                disabled
                                className="h-9 bg-background-secondary/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-primary">Products</h3>
                        {isEditable && (
                            <Button variant="outline" size="sm" onClick={addItem} className="h-8 text-xs">
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add Product
                            </Button>
                        )}
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-background-secondary/30 hover:bg-background-secondary/30">
                                    <TableHead className="h-10 text-xs font-semibold">Product</TableHead>
                                    <TableHead className="h-10 text-xs font-semibold w-[140px]">Quantity</TableHead>
                                    <TableHead className="h-10 text-xs font-semibold w-[140px]">Available (From)</TableHead>
                                    {isEditable && <TableHead className="h-10 w-[50px]"></TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isEditable ? 4 : 3} className="h-24 text-center text-text-tertiary text-sm">
                                            No products added yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item) => {
                                        const isOutOfStock = item.quantity > item.available;
                                        return (
                                            <TableRow key={item.id} className={isOutOfStock ? 'bg-error/5' : ''}>
                                                <TableCell className="py-2">
                                                    {isEditable ? (
                                                        <Select
                                                            value={item.productId}
                                                            onValueChange={(val) => updateItem(item.id, 'productId', val)}
                                                        >
                                                            <SelectTrigger className="h-8 border-none shadow-none focus:ring-0 text-sm">
                                                                <SelectValue placeholder="Select Product" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {dummyData.products.map(p => (
                                                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-primary">{item.productName}</span>
                                                            {isOutOfStock && (
                                                                <span className="text-xs text-error flex items-center gap-1">
                                                                    <AlertTriangle className="h-3 w-3" />
                                                                    Out of Stock
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-2">
                                                    {isEditable ? (
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                                            className={`h-8 w-full text-sm ${isOutOfStock ? 'border-error text-error' : ''}`}
                                                            min="1"
                                                        />
                                                    ) : (
                                                        <span className={`text-sm ${isOutOfStock ? 'text-error font-bold' : ''}`}>{item.quantity}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-2">
                                                    <span className={`text-sm ${item.available === 0 ? 'text-error' : 'text-text-secondary'}`}>
                                                        {item.available} Units
                                                    </span>
                                                </TableCell>
                                                {isEditable && (
                                                    <TableCell className="py-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeItem(item.id)}
                                                            className="h-7 w-7 p-0 text-text-tertiary hover:text-error hover:bg-error/10"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
