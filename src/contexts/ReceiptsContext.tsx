'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type ReceiptStatus = 'draft' | 'ready' | 'done' | 'cancelled';

export interface ReceiptItem {
    id: string;
    product: string;
    quantity: number;
}

export interface ReceiptForm {
    vendor: string;
    warehouse: string;
    scheduleDate: string;
    responsible: string;
    sourceDocument: string;
}

export interface Receipt {
    id: string;
    receiptNumber: string;
    formData: ReceiptForm;
    items: ReceiptItem[];
    status: ReceiptStatus;
    createdAt: string;
    updatedAt: string;
    supplier: string;
    warehouse: string;
    date: string;
}

interface ReceiptsContextType {
    receipts: Receipt[];
    addReceipt: (receipt: Receipt) => void;
    updateReceipt: (id: string, receipt: Receipt) => void;
    getReceipt: (id: string) => Receipt | undefined;
    deleteReceipt: (id: string) => void;
}

const ReceiptsContext = createContext<ReceiptsContextType | undefined>(undefined);

// Initial hardcoded receipt
const initialReceipts: Receipt[] = [
    {
        id: 'rec001',
        receiptNumber: 'WH/IN/0001',
        formData: {
            vendor: 'v1',
            warehouse: 'wh1',
            scheduleDate: '2025-11-22',
            responsible: 'Mitchell Admin',
            sourceDocument: 'PO-001'
        },
        items: [
            { id: '1', product: 'Steel Rod', quantity: 50 }
        ],
        status: 'done',
        createdAt: '2025-11-22T10:00:00',
        updatedAt: '2025-11-22T10:30:00',
        supplier: 'Azure Interior',
        warehouse: 'Main Warehouse',
        date: '2025-11-22'
    }
];

export function ReceiptsProvider({ children }: { children: ReactNode }) {
    const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);

    const addReceipt = (receipt: Receipt) => {
        setReceipts(prev => [...prev, receipt]);
    };

    const updateReceipt = (id: string, receipt: Receipt) => {
        setReceipts(prev => prev.map(r => r.id === id ? receipt : r));
    };

    const getReceipt = (id: string) => {
        return receipts.find(r => r.id === id);
    };

    const deleteReceipt = (id: string) => {
        setReceipts(prev => prev.filter(r => r.id !== id));
    };

    return (
        <ReceiptsContext.Provider value={{ receipts, addReceipt, updateReceipt, getReceipt, deleteReceipt }}>
            {children}
        </ReceiptsContext.Provider>
    );
}

export function useReceipts() {
    const context = useContext(ReceiptsContext);
    if (!context) {
        throw new Error('useReceipts must be used within ReceiptsProvider');
    }
    return context;
}
