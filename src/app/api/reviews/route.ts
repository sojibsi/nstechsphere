import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const all = searchParams.get('all') === 'true';

    if (all) {
      return NextResponse.json(db.getAllReviewsAdmin());
    }

    if (productId) {
      return NextResponse.json(db.getReviewsByProduct(productId));
    }

    return NextResponse.json(db.getAllReviewsAdmin());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { productId, customerName, rating, comment } = await request.json();
    if (!productId || !customerName || !rating || !comment) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const review = db.addReview(productId, customerName, Number(rating), comment);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
