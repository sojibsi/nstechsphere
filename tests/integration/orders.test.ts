import { describe, it, expect } from 'vitest';
import { db } from '@/lib/store/local-db';

describe('Order Creation and Fulfillment Integration', () => {
  it('creates an order with server-calculated totals, shipping, and deducts inventory', () => {
    const products = db.getProducts();
    const testProduct = products[0];
    const initialStock = testProduct.stock_quantity;

    const order = db.createOrder({
      customer_name: 'Test Customer',
      customer_phone: '+8801700112233',
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Uttara Sector 3',
      full_address: 'House 5, Road 2, Sector 3',
      payment_method: 'cod',
      delivery_zone: 'inside_dhaka',
      items: [
        {
          productId: testProduct.id,
          quantity: 2,
        },
      ],
      couponCode: 'WELCOME10',
    });

    expect(order).toBeDefined();
    expect(order.order_number).toMatch(/^(NS|GG)-/);
    expect(order.shipping_charge).toBe(70); // Inside Dhaka shipping: ৳70
    expect(order.items.length).toBe(1);
    expect(order.items[0].quantity).toBe(2);
    expect(order.grand_total).toBeGreaterThan(0);
    expect(order.order_status).toBe('pending');

    // Stock should be reduced by 2
    expect(testProduct.stock_quantity).toBe(initialStock - 2);
  });

  it('updates order fulfillment and payment status successfully', () => {
    const orders = db.getOrders();
    const latestOrder = orders[0];

    const updated = db.updateOrderStatus(latestOrder.id, 'confirmed');
    expect(updated).toBe(true);
    expect(latestOrder.order_status).toBe('confirmed');

    const paymentUpdated = db.updateOrderPaymentStatus(latestOrder.id, 'paid');
    expect(paymentUpdated).toBe(true);
    expect(latestOrder.payment_status).toBe('paid');
  });
});
