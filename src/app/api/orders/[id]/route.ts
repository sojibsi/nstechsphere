import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = db.getOrderByNumber(id) || db.getOrders().find((o) => o.id === id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const order = db.getOrderByNumber(id) || db.getOrders().find((o) => o.id === id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (body.order_status) {
      db.updateOrderStatus(order.id, body.order_status);
    }

    if (body.payment_status) {
      db.updateOrderPaymentStatus(order.id, body.payment_status);
    }

    if (body.tracking_number) {
      db.updateOrderTracking(order.id, body.tracking_number);
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
