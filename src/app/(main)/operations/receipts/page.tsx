'use client';

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Plus, Search, Filter, LayoutGrid, List as ListIcon, Calendar, User, Warehouse } from 'lucide-react'
import { useReceipts } from '@/contexts/ReceiptsContext'

export default function ReceiptsListPage() {
  const router = useRouter()
  const { receipts } = useReceipts()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')

  // Filter logic
  const filteredReceipts = receipts.filter(receipt =>
    receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Status Badge Helper
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'done': return 'success';
      case 'draft': return 'secondary';
      case 'ready': return 'purple'; // Vibrant color for Ready
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Receipts</h1>
          <p className="text-sm text-text-secondary mt-1">Manage incoming stock and supplier deliveries.</p>
        </div>
        <Button
          onClick={() => router.push('/operations/receipts/new')}
          className="h-9 px-4 text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New Receipt
        </Button>
      </div>

      {/* Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-background-secondary/30 px-4 py-3 rounded-lg border border-border/50">
        {/* Search Section */}
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
            <Input
              placeholder="Search by reference or contact..."
              className="h-9 pl-9 bg-surface border-border/50 focus:border-primary/30 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 shrink-0 border-border/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-0.5 bg-background-secondary p-0.5 rounded-md border border-border">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${viewMode === 'list'
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-secondary'
              }`}
          >
            <ListIcon className="h-3.5 w-3.5" />
            List
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${viewMode === 'kanban'
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-secondary'
              }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Kanban
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'list' ? (
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background-secondary/30 hover:bg-background-secondary/30">
                <TableHead className="h-11 text-xs font-semibold">Reference</TableHead>
                <TableHead className="text-xs font-semibold">From</TableHead>
                <TableHead className="text-xs font-semibold">To</TableHead>
                <TableHead className="text-xs font-semibold">Contact</TableHead>
                <TableHead className="text-xs font-semibold">Schedule Date</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-text-tertiary text-sm">
                    No receipts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceipts.map(receipt => (
                  <TableRow
                    key={receipt.id}
                    className="cursor-pointer hover:bg-background-secondary/20 transition-colors"
                    onClick={() => router.push(`/operations/receipts/${receipt.id}`)}
                  >
                    <TableCell className="font-medium text-primary text-sm">
                      {receipt.receiptNumber}
                    </TableCell>
                    <TableCell className="text-sm text-text-secondary">
                      {receipt.supplier}
                    </TableCell>
                    <TableCell className="text-sm text-text-secondary">
                      {receipt.warehouse}
                    </TableCell>
                    <TableCell className="text-sm text-text-secondary">
                      Azure Interior
                    </TableCell>
                    <TableCell className="text-sm text-text-secondary">
                      {receipt.date}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(receipt.status)} className="text-xs capitalize">
                        {receipt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {['draft', 'ready', 'done'].map(status => (
            <div key={status} className="space-y-3">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-text-secondary capitalize">{status}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-background-secondary text-text-tertiary">
                  {filteredReceipts.filter(r => r.status === status).length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5">
                {filteredReceipts.filter(r => r.status === status).length === 0 ? (
                  <div className="p-8 text-center text-text-tertiary text-xs bg-background-secondary/20 rounded-lg border border-dashed border-border">
                    No {status} receipts
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredReceipts.filter(r => r.status === status).map((receipt, index) => (
                      <motion.div
                        key={receipt.id}
                        initial={{ opacity: 0.6, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="p-3.5 rounded-lg border border-border bg-surface hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
                        onClick={() => router.push(`/operations/receipts/${receipt.id}`)}
                      >
                        <div className="flex justify-between items-start mb-2.5">
                          <span className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                            {receipt.receiptNumber}
                          </span>
                          <Badge variant={getStatusBadgeVariant(receipt.status)} className="text-xs capitalize">
                            {receipt.status}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-text-secondary">
                            <User className="h-3 w-3 text-text-tertiary" />
                            <span className="truncate">{receipt.supplier}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-text-secondary">
                            <Warehouse className="h-3 w-3 text-text-tertiary" />
                            <span className="truncate">{receipt.warehouse}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-text-tertiary text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{receipt.date}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
