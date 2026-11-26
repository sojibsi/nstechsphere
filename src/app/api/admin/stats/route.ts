import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function GET() {
  try {
    const orders = db.getOrders();
    const products = db.getAllProductsAdmin();
    const categories = db.getCategories();
    const coupons = db.getCoupons();

    const totalSales = orders.reduce((sum, o) => sum + (o.grand_total || 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.order_status === 'pending').length;
    const completedOrders = orders.filter((o) => o.order_status === 'delivered').length;
    const lowStockProducts = products.filter((p) => p.stock_quantity < 10);

    return NextResponse.json({
      totalSales,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalProducts: products.length,
      totalCategories: categories.length,
      totalCoupons: coupons.length,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      recentOrders: orders.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compute admin statistics' }, { status: 500 });
  }
}
