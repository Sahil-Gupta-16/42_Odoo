'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
import { ArrowLeft, Printer, X, Check, Plus, Trash2, Save } from 'lucide-react';
import { useReceipts, Receipt, ReceiptItem, ReceiptForm, ReceiptStatus } from '@/contexts/ReceiptsContext';

export default function ReceiptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const { receipts, addReceipt, updateReceipt, getReceipt } = useReceipts();

  // State
  const [status, setStatus] = useState<ReceiptStatus>('draft');
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [formData, setFormData] = useState<ReceiptForm>({
    vendor: '',
    warehouse: '',
    scheduleDate: new Date().toISOString().split('T')[0],
    responsible: 'Mitchell Admin',
    sourceDocument: ''
  });

  const [items, setItems] = useState<ReceiptItem[]>([]);

  // Load receipt on mount
  useEffect(() => {
    if (isNew) {
      setReceiptNumber('New Receipt');
      setStatus('draft');
    } else {
      const receipt = getReceipt(id);
      if (receipt) {
        setFormData(receipt.formData);
        setItems(receipt.items);
        setStatus(receipt.status);
        setReceiptNumber(receipt.receiptNumber);
      }
    }
  }, [id, isNew, getReceipt]);

  // Generate receipt number
  const generateReceiptNumber = (): string => {
    const maxId = receipts.length > 0
      ? Math.max(...receipts.map(r => parseInt(r.receiptNumber.split('/')[2]) || 0))
      : 0;
    return `WH/IN/${String(maxId + 1).padStart(4, '0')}`;
  };

  // Get vendor name
  const getVendorName = (vendorId: string): string => {
    const vendors: Record<string, string> = {
      'v1': 'Azure Interior',
      'v2': 'Gemini Furniture',
      'v3': 'Deco Addict'
    };
    return vendors[vendorId] || vendorId;
  };

  // Get warehouse name
  const getWarehouseName = (warehouseId: string): string => {
    const warehouses: Record<string, string> = {
      'wh1': 'Main Warehouse',
      'wh2': 'Secondary Warehouse'
    };
    return warehouses[warehouseId] || warehouseId;
  };

  // Save as Draft
  const handleSaveDraft = () => {
    const receiptId = isNew ? `rec-${Date.now()}` : id;
    const number = isNew ? generateReceiptNumber() : receiptNumber;

    const receipt: Receipt = {
      id: receiptId,
      receiptNumber: number,
      formData,
      items,
      status: 'draft',
      createdAt: isNew ? new Date().toISOString() : getReceipt(id)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supplier: getVendorName(formData.vendor),
      warehouse: getWarehouseName(formData.warehouse),
      date: formData.scheduleDate
    };

    if (isNew) {
      addReceipt(receipt);
    } else {
      updateReceipt(id, receipt);
    }

    // Redirect to receipts list
    router.push('/operations/receipts');
  };

  // Validate and mark as Ready
  const handleValidate = () => {
    if (status === 'draft') {
      // Validate form
      if (!formData.vendor || !formData.warehouse || items.length === 0) {
        alert('Please fill all required fields and add at least one product');
        return;
      }

      const receiptId = isNew ? `rec-${Date.now()}` : id;
      const number = isNew ? generateReceiptNumber() : receiptNumber;

      const receipt: Receipt = {
        id: receiptId,
        receiptNumber: number,
        formData,
        items,
        status: 'ready',
        createdAt: isNew ? new Date().toISOString() : getReceipt(id)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        supplier: getVendorName(formData.vendor),
        warehouse: getWarehouseName(formData.warehouse),
        date: formData.scheduleDate
      };

      if (isNew) {
        addReceipt(receipt);
        router.push(`/operations/receipts/${receiptId}`);
      } else {
        updateReceipt(id, receipt);
        setStatus('ready');
        setReceiptNumber(number);
      }
    } else if (status === 'ready') {
      const receipt = getReceipt(id);
      if (receipt) {
        const updatedReceipt = { ...receipt, status: 'done' as ReceiptStatus, updatedAt: new Date().toISOString() };
        updateReceipt(id, updatedReceipt);
        setStatus('done');
      }
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this receipt?')) {
      if (!isNew) {
        const receipt = getReceipt(id);
        if (receipt) {
          const updatedReceipt = { ...receipt, status: 'cancelled' as ReceiptStatus, updatedAt: new Date().toISOString() };
          updateReceipt(id, updatedReceipt);
        }
      }
      setStatus('cancelled');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), product: '', quantity: 1 }]);
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  const updateItem = (itemId: string, field: keyof ReceiptItem, value: any) => {
    setItems(items.map(i => i.id === itemId ? { ...i, [field]: value } : i));
  };

  // Status Badge Color
  const getStatusColor = (s: ReceiptStatus) => {
    switch (s) {
      case 'draft': return 'secondary';
      case 'ready': return 'purple';
      case 'done': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const isEditable = status === 'draft';

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6"
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3"
      >
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/operations/receipts')}>Operations</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/operations/receipts')}>Receipts</span>
          <span>/</span>
          <span className="font-medium text-primary">{isNew ? 'New' : receiptNumber}</span>
        </div>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0.7, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="bg-surface border border-border rounded-lg overflow-hidden"
      >
        {/* Header with Title, Status, Actions */}
        <div className="px-6 py-4 border-b border-border bg-background-secondary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-primary">{receiptNumber}</h1>
                <Badge variant={getStatusColor(status)} className="text-xs capitalize px-2.5 py-0.5">
                  {status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {status === 'draft' && (
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  size="sm"
                  className="h-9 text-sm"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  Save as Draft
                </Button>
              )}
              {status !== 'done' && status !== 'cancelled' && (
                <Button
                  onClick={handleValidate}
                  size="sm"
                  className="h-9 text-sm"
                >
                  <Check className="h-4 w-4 mr-1.5" />
                  {status === 'draft' ? 'Mark as Ready' : 'Validate'}
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
                Receive From <span className="text-error">*</span>
              </Label>
              <Select
                disabled={!isEditable}
                value={formData.vendor}
                onValueChange={(val) => setFormData({ ...formData, vendor: val })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Azure Interior</SelectItem>
                  <SelectItem value="v2">Gemini Furniture</SelectItem>
                  <SelectItem value="v3">Deco Addict</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-text-secondary">
                Destination Warehouse <span className="text-error">*</span>
              </Label>
              <Select
                disabled={!isEditable}
                value={formData.warehouse}
                onValueChange={(val) => setFormData({ ...formData, warehouse: val })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wh1">Main Warehouse</SelectItem>
                  <SelectItem value="wh2">Secondary Warehouse</SelectItem>
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

          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm font-medium text-text-secondary">Source Document</Label>
            <Input
              placeholder="e.g. PO001"
              disabled={!isEditable}
              value={formData.sourceDocument}
              onChange={(e) => setFormData({ ...formData, sourceDocument: e.target.value })}
              className="h-9"
            />
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
                  <TableHead className="h-10 text-xs font-semibold w-[100px]">UOM</TableHead>
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
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-2">
                        {isEditable ? (
                          <Select
                            value={item.product}
                            onValueChange={(val) => updateItem(item.id, 'product', val)}
                          >
                            <SelectTrigger className="h-8 border-none shadow-none focus:ring-0 text-sm">
                              <SelectValue placeholder="Select Product" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Steel Rod">Steel Rod</SelectItem>
                              <SelectItem value="Aluminum Sheet">Aluminum Sheet</SelectItem>
                              <SelectItem value="Wooden Chair">Wooden Chair</SelectItem>
                              <SelectItem value="Glass Panel">Glass Panel</SelectItem>
                              <SelectItem value="Plastic Bucket">Plastic Bucket</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-sm font-medium text-primary">{item.product || '-'}</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        {isEditable ? (
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="h-8 w-full text-sm"
                            min="1"
                          />
                        ) : (
                          <span className="text-sm">{item.quantity}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-text-secondary py-2">Units</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
