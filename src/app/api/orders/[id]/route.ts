// /app/api/orders/[id]/route.ts
import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });
    }

    const [result]: any = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const userId = Number(params.userId);
  if (isNaN(userId)) {
    return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    // Lấy danh sách đơn hàng
    const [orderRows] = await db.query(
      `
      SELECT
        o.id,
        o.total,
        o.status,
        o.createdAt,
        o.address,
        o.phone
      FROM
        \`Order\` o
      WHERE
        o.userId = ?
      ORDER BY
        o.createdAt DESC
      `,
      [userId],
    );

    if ((orderRows as any[]).length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const orderIds = (orderRows as any[]).map((o) => o.id);

    // Lấy danh sách sản phẩm thuộc các đơn hàng này
    const [itemRows] = await db.query(
      `
      SELECT
        oi.orderId,
        oi.productId,
        oi.size,
        oi.quantity,
        oi.price,
        p.name AS productName,
        p.img AS productImg
      FROM
        OrderItem oi
      JOIN
        Product p
      ON
        oi.productId = p.id
      WHERE
        oi.orderId IN (${orderIds.map(() => '?').join(',')})
      `,
      orderIds,
    );

    // Gộp dữ liệu
    const ordersWithItems = (orderRows as any[]).map((order) => {
      const items = (itemRows as any[]).filter((i) => i.orderId === order.id);
      return {
        ...order,
        items,
      };
    });

    return NextResponse.json({
      success: true,
      data: ordersWithItems,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const orderId = params.id;

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
  }

  try {
    // Lấy đơn hàng và kiểm tra quyền
    const [rows] = await db.query(
      `
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
        p.img AS productImage,
        p.discount
      FROM \`Order\` o
      JOIN OrderItem oi ON o.id = oi.orderId
      JOIN Product p ON oi.productId = p.id
      WHERE o.id = ?
      `,
      [orderId],
    );

    const result = rows as any[];
    if (result.length === 0) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // Kiểm tra userId có khớp với đơn hàng không
    if (result[0].userId != userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    const order = {
      orderId: result[0].orderId,
      userId: result[0].userId,
      createdAt: result[0].createdAt,
      status: result[0].status,
      address: result[0].address,
      phone: result[0].phone,
      total: result[0].total,
      items: result.map((row) => ({
        productId: row.productId,
        productName: row.productName,
        productImage: row.productImage,
        quantity: row.quantity,
        size: row.size,
        price: row.price,
        discount: row.discount,
      })),
    };

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching order detail:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch order detail' }, { status: 500 });
  }
}
