'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { Boxes, Plus, Minus, AlertTriangle, Search, Check } from 'lucide-react';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Stock Replenishment');

  const loadData = () => {
    fetch('/api/products?all=true')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdjustStock = async (product: Product) => {
    const newStock = Math.max(0, product.stock_quantity + adjustmentAmount);
    await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock_quantity: newStock }),
    });
    setAdjustingId(null);
    setAdjustmentAmount(0);
    loadData();
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Inventory Control & Stock Adjustments
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Monitor warehouse stock, prevent overselling, and record adjustment audit reasons.
        </p>
      </div>

      <div className="flex items-center gap-2 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 max-w-sm">
        <Search className="w-4 h-4 text-neutral-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory by title or SKU..."
          className="text-xs bg-transparent text-foreground outline-none w-full"
        />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Device Name</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4">Threshold</th>
              <th className="py-3 px-4 text-right">Adjust Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filtered.map((product) => {
              const isLow = product.stock_quantity < 10;
              const isEditing = adjustingId === product.id;

              return (
                <tr key={product.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                  <td className="py-3.5 px-4 font-semibold text-foreground">{product.name}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400">{product.sku}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold inline-flex items-center gap-1.5 ${
                        isLow ? 'text-red-500' : 'text-foreground'
                      }`}
                    >
                      {isLow && <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{product.stock_quantity} units</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">10 units</td>
                  <td className="py-3.5 px-4 text-right">
                    {isEditing ? (
                      <div className="inline-flex items-center gap-2">
                        <input
                          type="number"
                          value={adjustmentAmount}
                          onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                          placeholder="+/-"
                          className="w-16 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-background text-xs font-mono outline-none"
                        />
                        <button
                          onClick={() => handleAdjustStock(product)}
                          className="px-2.5 py-1 rounded bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setAdjustingId(null)}
                          className="text-[11px] text-neutral-400 hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setAdjustingId(product.id);
                          setAdjustmentAmount(5);
                        }}
                        className="px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-semibold"
                      >
                        Adjust
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
