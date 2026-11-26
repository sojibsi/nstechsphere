import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) {
      return NextResponse.json({ valid: false, message: 'Please enter a coupon code' }, { status: 400 });
    }
    const result = db.validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ valid: false, message: 'Coupon validation failed' }, { status: 500 });
  }
}
