import { db } from '@/lib/store/local-db';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Package, ArrowRight, ChevronRight } from 'lucide-react';

export default function CustomerOrdersPage() {
  const orders = db.getOrders();
  const settings = db.getSettings();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-foreground">
          Account
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">My Orders</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          My Order History
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Track and review all your electronics purchases with official warranty details.
        </p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 text-neutral-400 text-xs">
            No orders placed yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-3">
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">
                    Ref: {order.order_number}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Placed on{' '}
                    {new Date(order.created_at).toLocaleDateString('en-BD', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    {order.order_status}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({order.payment_method.toUpperCase()} - {order.payment_status})
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-foreground">{item.product_name}</span>
                      {item.variant_name && (
                        <span className="text-neutral-400 ml-2">({item.variant_name})</span>
                      )}
                    </div>
                    <div className="font-bold text-foreground">
                      {item.quantity} x {formatPrice(item.unit_price, settings.general.currency_symbol)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800 gap-3">
                <div className="text-xs font-bold text-foreground">
                  Grand Total: {formatPrice(order.grand_total, settings.general.currency_symbol)}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/order-confirmation/${order.order_number}`}
                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Invoice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/track-order?number=${order.order_number}`}
                    className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                  >
                    Track
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
