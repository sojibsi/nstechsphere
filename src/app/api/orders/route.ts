import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';
import { z } from 'zod';

const OrderItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().positive(),
});

const CreateOrderSchema = z.object({
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_email: z.string().email().optional().or(z.literal('')),
  customer_phone: z.string().min(10, 'Valid phone number required'),
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  area: z.string().min(1, 'Area is required'),
  full_address: z.string().min(5, 'Full street address is required'),
  order_notes: z.string().optional(),
  payment_method: z.enum(['cod', 'bkash', 'nagad', 'sslcommerz']),
  delivery_zone: z.enum(['inside_dhaka', 'outside_dhaka']),
  items: z.array(OrderItemSchema).min(1, 'Cart cannot be empty'),
  couponCode: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('number')?.trim();
    const phone = searchParams.get('phone')?.trim();

    const cleanPhone = (p: string) => {
      let cleaned = p.replace(/[^0-9]/g, '');
      if (cleaned.startsWith('880')) cleaned = cleaned.slice(2);
      if (cleaned.startsWith('88')) cleaned = cleaned.slice(2);
      if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
      return cleaned;
    };

    if (orderNumber || phone) {
      const orders = db.getOrders();
      let matchedOrder = undefined;

      if (orderNumber && phone) {
        const targetCleanPhone = cleanPhone(phone);
        matchedOrder = orders.find(
          (o) =>
            o.order_number.toUpperCase() === orderNumber.toUpperCase() &&
            cleanPhone(o.customer_phone) === targetCleanPhone
        );
        // Also allow matching if user made a typo with prefix
        if (!matchedOrder) {
          matchedOrder = orders.find(
            (o) => o.order_number.toUpperCase() === orderNumber.toUpperCase()
          );
        }
      } else if (orderNumber) {
        matchedOrder = orders.find(
          (o) => o.order_number.toUpperCase() === orderNumber.toUpperCase()
        );
      } else if (phone) {
        const targetCleanPhone = cleanPhone(phone);
        matchedOrder = orders
          .filter((o) => cleanPhone(o.customer_phone) === targetCleanPhone)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      }

      if (!matchedOrder) {
        return NextResponse.json(
          { error: 'Order not found with provided details' },
          { status: 404 }
        );
      }
      return NextResponse.json(matchedOrder);
    }

    const orders = db.getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validated = CreateOrderSchema.safeParse(json);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const order = db.createOrder(validated.data);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
