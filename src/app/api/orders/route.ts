import { db } from '@/app/_lib/db';
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const [rows] = await db.query(`
        SELECT 
          o.id AS orderId,
          o.userId,
          o.createdAt,
          o.status,
          o.address,
          o.phone,
          o.total,
          oi.productId,
          oi.quantity,
          oi.size,
          oi.price,
          p.name AS productName,
          p.discount,
          p.img AS productImage
        FROM orders o
        JOIN order_items oi ON o.id = oi.orderId
        JOIN products p ON oi.productId = p.id
        ORDER BY o.createdAt DESC;
      `);

    // Group các item theo orderId
    const ordersMap = new Map();

    for (const row of rows as any[]) {
      if (!ordersMap.has(row.orderId)) {
        ordersMap.set(row.orderId, {
          id: row.orderId,
          userId: row.userId,
          createdAt: row.createdAt,
          status: row.status,
          address: row.address,
          phone: row.phone,
          total: row.total,
          order: [], // mảng sản phẩm
        });
      }

      ordersMap.get(row.orderId).order.push({
        productId: row.productId,
        quantity: row.quantity,
        size: row.size,
        price: row.price,
        productName: row.productName,
        discount: row.discount,
        img: row.productImage,
      });
    }

    const orders = Array.from(ordersMap.values());

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
  