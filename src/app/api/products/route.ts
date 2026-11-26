import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const categorySlug = searchParams.get('category');
    const brandSlug = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured');
    const all = searchParams.get('all') === 'true'; // for admin

    let products = all ? db.getAllProductsAdmin() : db.getProducts();

    if (q) {
      products = db.searchProducts(q);
      if (!all) products = products.filter((p) => p.status === 'published');
    }

    if (categorySlug) {
      products = products.filter((p) =>
        p.categories?.some((c) => c.slug === categorySlug)
      );
    }

    if (brandSlug) {
      products = products.filter((p) => p.brand?.slug === brandSlug);
    }

    if (minPrice) {
      products = products.filter(
        (p) => (p.sale_price ?? p.regular_price) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      products = products.filter(
        (p) => (p.sale_price ?? p.regular_price) <= Number(maxPrice)
      );
    }

    if (featured === 'true') {
      products = products.filter((p) => p.is_featured);
    }

    if (sort === 'price-asc') {
      products = [...products].sort(
        (a, b) => (a.sale_price ?? a.regular_price) - (b.sale_price ?? b.regular_price)
      );
    } else if (sort === 'price-desc') {
      products = [...products].sort(
        (a, b) => (b.sale_price ?? b.regular_price) - (a.sale_price ?? a.regular_price)
      );
    } else if (sort === 'best-selling') {
      products = [...products].sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.regular_price) {
      return NextResponse.json({ error: 'Product name and regular price are required' }, { status: 400 });
    }
    const created = db.createProduct(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
