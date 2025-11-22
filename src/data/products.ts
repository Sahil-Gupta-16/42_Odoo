export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    uom: string;
    stock: number;
    status: 'active' | 'inactive';
}

export const sampleProducts: Product[] = [
    {
        id: '1',
        name: 'Steel Rod',
        sku: 'SR-001',
        category: 'Materials',
        uom: 'kg',
        stock: 120,
        status: 'active',
    },
    {
        id: '2',
        name: 'Aluminum Sheet',
        sku: 'AS-010',
        category: 'Materials',
        uom: 'm²',
        stock: 45,
        status: 'active',
    },
    {
        id: '3',
        name: 'Wooden Chair',
        sku: 'WC-100',
        category: 'Furniture',
        uom: 'pcs',
        stock: 30,
        status: 'inactive',
    },
];
