import { db } from '@/lib/store/local-db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Package, Printer, ArrowRight, MapPin, Phone } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = db.getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const settings = db.getSettings();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 space-y-8">
      {/* Success Hero */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
          Thank you for shopping with {settings.general.brand_name || 'NS TechSphere'}. We have received your order and our fulfillment team is processing it.
        </p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono text-xs font-bold text-foreground">
          Order Ref: {order.order_number}
        </div>
      </div>

      {/* Invoice Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 p-6 sm:p-10 space-y-8 shadow-sm">
        {/* Header of Invoice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-amber-400/50 bg-white dark:bg-neutral-900 p-0.5">
              <Image
                src="/images/ns-logo.jpg"
                alt="NS TechSphere"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <div className="font-extrabold text-lg text-foreground uppercase tracking-tight">
                {settings.general.brand_name || 'NS TechSphere'}
              </div>
              <div className="text-xs text-neutral-400">{settings.general.tagline}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                {new Date(order.created_at).toLocaleDateString('en-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold uppercase tracking-wider">
              Status: {order.order_status}
            </span>
            <span className="text-xs text-neutral-400">
              Payment: <strong>{order.payment_method.toUpperCase()} ({order.payment_status})</strong>
            </span>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-500">
          <div className="space-y-1">
            <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block mb-1">
              Customer Information
            </span>
            <div className="font-semibold text-foreground">{order.customer_name}</div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>{order.customer_phone}</span>
            </div>
            {order.customer_email && <div>{order.customer_email}</div>}
          </div>

          <div className="space-y-1">
            <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block mb-1">
              Delivery Address
            </span>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
              <span>
                {order.full_address}, {order.area}, {order.district}, {order.division}
              </span>
            </div>
            {order.order_notes && (
              <div className="text-[11px] text-neutral-400 italic mt-1">
                Note: {order.order_notes}
              </div>
            )}
          </div>
        </div>

        {/* Order Items Table */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 text-left">Item Description</th>
                <th className="py-3 px-4 text-center">Unit Price</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3.5 px-4 font-medium text-foreground">
                    <div>{item.product_name}</div>
                    {item.variant_name && (
                      <div className="text-[11px] text-neutral-400">{item.variant_name}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center text-neutral-500">
                    {formatPrice(item.unit_price, settings.general.currency_symbol)}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-foreground">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-foreground">
                    {formatPrice(item.total_price, settings.general.currency_symbol)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Calculation */}
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-xs text-neutral-500">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-foreground">
                {formatPrice(order.subtotal, settings.general.currency_symbol)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-foreground font-semibold">
                <span>Discount:</span>
                <span>-{formatPrice(order.discount, settings.general.currency_symbol)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span className="font-semibold text-foreground">
                {formatPrice(order.shipping_charge, settings.general.currency_symbol)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-foreground pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span>Grand Total:</span>
              <span>{formatPrice(order.grand_total, settings.general.currency_symbol)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800 gap-4">
          <Link
            href="/products"
            className="text-xs font-semibold text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Continue Shopping</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/track-order?number=${order.order_number}`}
              className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Track Order Live
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
