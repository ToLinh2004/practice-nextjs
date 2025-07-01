import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT 
        o.id AS orderId,
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
        p.img AS productImage,
        p.discount
      FROM \`Order\` o
      JOIN OrderItem oi ON o.id = oi.orderId
      JOIN Product p ON oi.productId = p.id
      WHERE o.userId = ?
      ORDER BY o.createdAt DESC
      `,
      [userId],
    );

    const ordersMap: Record<number, any> = {};

    for (const row of rows as any[]) {
      const { orderId, createdAt, status, address, phone, total, productId, quantity, size, price, productName, productImage, discount } = row;

      if (!ordersMap[orderId]) {
        ordersMap[orderId] = {
          orderId,
          createdAt,
          status,
          address,
          phone,
          total,
          items: [],
        };
      }

      ordersMap[orderId].items.push({
        productId,
        productName,
        productImage,
        quantity,
        size,
        price,
        discount,
      });
    }

    const orders = Object.values(ordersMap);

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch orders' }, { status: 500 });
  }
}
