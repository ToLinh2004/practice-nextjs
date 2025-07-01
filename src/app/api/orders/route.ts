import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';
export async function GET() {
  try {
    // Query lấy tất cả orders + join items
    const [orders] = await db.query<any[]>(`
      SELECT 
        o.id AS orderId,
        o.userId,
        o.total,
        o.phone,
        o.address,
        o.status,
        o.createdAt,
        oi.productId,
        p.name AS productName,
        p.image AS productImage,
        oi.quantity,
        oi.size,
        oi.price,
        p.discount
      FROM \`Order\` o
      LEFT JOIN OrderItem oi ON o.id = oi.orderId
      LEFT JOIN Product p ON oi.productId = p.id
      ORDER BY o.createdAt DESC
    `);

    // Gom theo orderId
    const grouped = orders.reduce<Record<number, any>>((acc, row) => {
      if (!acc[row.orderId]) {
        acc[row.orderId] = {
          orderId: row.orderId,
          userId: row.userId,
          total: row.total,
          phone: row.phone,
          address: row.address,
          status: row.status,
          createdAt: row.createdAt,
          items: [],
        };
      }
      acc[row.orderId].items.push({
        productId: row.productId,
        productName: row.productName,
        productImage: row.productImage,
        quantity: row.quantity,
        size: row.size,
        price: row.price,
        discount: row.discount,
      });
      return acc;
    }, {});

    // Convert object thành array
    const result = Object.values(grouped);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const { userId, address, phone, items, total } = body;

    if (!userId || !address || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const [orderResult] = await db.query(
      `INSERT INTO \`Order\` (userId, total, status, address, phone, createdAt, created_at, updated_at)
   VALUES (?, ?, 'Pending', ?, ?, NOW(), NOW(), NOW())`,
      [userId, total, address, phone],
    );

    const orderId = (orderResult as any).insertId;

    // Tạo OrderItem
    const insertPromises = items.map((item) =>
      db.query(
        `INSERT INTO OrderItem (orderId, productId, quantity, size, price, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [orderId, item.productId, item.quantity, item.size, item.price],
      ),
    );

    await Promise.all(insertPromises);
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error creating order' }, { status: 500 });
  } finally {
  }
}
  