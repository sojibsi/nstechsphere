'use client';

import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Truck,
  Printer,
  ChevronDown,
  Eye,
  X,
  Phone,
  MapPin,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = () => {
    setIsLoading(true);
    fetch('/api/orders')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setOrders(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_status: newStatus }),
    });
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, order_status: newStatus });
    }
  };

  const handleUpdatePayment = async (orderId: string, newStatus: PaymentStatus) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_status: newStatus }),
    });
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, payment_status: newStatus });
    }
  };

  const handleUpdateTracking = async (orderId: string, trackingNumber: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking_number: trackingNumber }),
    });
    loadOrders();
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Order Fulfillment & Management
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Process customer orders, update tracking numbers, and manage invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-foreground outline-none cursor-pointer"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 max-w-sm">
        <Search className="w-4 h-4 text-neutral-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order #, phone, or name..."
          className="text-xs bg-transparent text-foreground outline-none w-full"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total (BDT)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                  <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                    {order.order_number}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                    {new Date(order.created_at).toLocaleDateString('en-BD', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-foreground">{order.customer_name}</div>
                    <div className="text-[11px] text-neutral-400">{order.customer_phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    {formatPrice(order.grand_total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.payment_status}
                      onChange={(e) => handleUpdatePayment(order.id, e.target.value as PaymentStatus)}
                      className="text-[11px] font-bold uppercase rounded-md border border-neutral-200 dark:border-neutral-800 bg-background px-2 py-1 outline-none"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className="text-[11px] font-bold uppercase rounded-md border border-neutral-200 dark:border-neutral-800 bg-background px-2 py-1 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal / Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass-elevated border border-neutral-300 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">
                  Order Details
                </span>
                <h2 className="text-base font-black text-foreground font-mono">
                  {selectedOrder.order_number}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-neutral-400 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-500">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background space-y-1">
                <span className="font-bold text-foreground block text-[11px] uppercase tracking-wider mb-1">
                  Customer Info
                </span>
                <div className="font-semibold text-foreground">{selectedOrder.customer_name}</div>
                <div>{selectedOrder.customer_phone}</div>
                {selectedOrder.customer_email && <div>{selectedOrder.customer_email}</div>}
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background space-y-1">
                <span className="font-bold text-foreground block text-[11px] uppercase tracking-wider mb-1">
                  Delivery Destination
                </span>
                <div className="text-foreground leading-normal">
                  {selectedOrder.full_address}, {selectedOrder.area}, {selectedOrder.district}
                </div>
                {selectedOrder.order_notes && (
                  <div className="text-[11px] text-neutral-400 italic mt-1">
                    Note: {selectedOrder.order_notes}
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Input */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background space-y-2">
              <label className="text-xs font-semibold text-neutral-500 block">
                Consignment / Tracking Number:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={selectedOrder.tracking_number || ''}
                  id="trackingInput"
                  placeholder="e.g. TRK-DH-84912"
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('trackingInput') as HTMLInputElement;
                    if (el) handleUpdateTracking(selectedOrder.id, el.value);
                  }}
                  className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-[10px] uppercase font-semibold text-neutral-500">
                  <tr>
                    <th className="py-2.5 px-4 text-left">Item</th>
                    <th className="py-2.5 px-4 text-center">Unit Price</th>
                    <th className="py-2.5 px-4 text-center">Qty</th>
                    <th className="py-2.5 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        <div>{item.product_name}</div>
                        {item.variant_name && (
                          <div className="text-[11px] text-neutral-400 font-normal">
                            {item.variant_name}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">{formatPrice(item.unit_price)}</td>
                      <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-4 text-right font-bold">
                        {formatPrice(item.total_price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-neutral-200 dark:border-neutral-800 text-foreground">
              <span>Grand Total:</span>
              <span className="text-base font-black">{formatPrice(selectedOrder.grand_total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
