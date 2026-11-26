'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg liquid-glass-elevated border border-neutral-300 dark:border-neutral-800 text-foreground shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-neutral-100 shrink-0" />
          )}
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
