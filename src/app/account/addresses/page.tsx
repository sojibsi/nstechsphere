'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Trash2, ChevronRight, Check } from 'lucide-react';

interface SavedAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  fullAddress: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      label: 'Home (Dhaka)',
      recipientName: 'Asif Mahmud',
      phone: '+8801711223344',
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Banani',
      fullAddress: 'House 22, Road 11, Block D, Banani',
      isDefault: true,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState('Office');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !fullAddress) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      label,
      recipientName: name,
      phone,
      division: 'Dhaka',
      district: 'Dhaka',
      area,
      fullAddress,
      isDefault: false,
    };

    setAddresses([...addresses, newAddr]);
    setIsAdding(false);
    setName('');
    setPhone('');
    setArea('');
    setFullAddress('');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-foreground">
          Account
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Saved Addresses</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Maintain quick delivery destinations for one-click checkout.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-smooth"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAdding ? 'Cancel' : 'Add New Address'}</span>
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 space-y-4 shadow-sm"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider">New Shipping Destination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Label (e.g. Home, Office)
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Thana / Area
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-500 block mb-1">
              Full Street & House Address
            </label>
            <textarea
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              rows={2}
              className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
          >
            Save Address
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-wider">
                {addr.label}
              </span>
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-neutral-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-bold text-foreground">{addr.recipientName}</div>
            <div className="text-xs text-neutral-500">{addr.phone}</div>
            <div className="text-xs text-neutral-400 leading-normal">
              {addr.fullAddress}, {addr.area}, {addr.district}
            </div>

            {addr.isDefault && (
              <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-semibold pt-2 border-t border-neutral-100 dark:border-neutral-900">
                <Check className="w-3 h-3 text-foreground" />
                <span>Default Delivery Location</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
