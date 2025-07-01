import { db } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, quantity, size, price } = body;

    if (!userId || !productId || !quantity || !size || !price) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Kiểm tra đã có sản phẩm này trong giỏ chưa
    const [existingRows] = await db.query(
      `
          SELECT id, quantity
          FROM Cart
          WHERE userId = ? AND productId = ? AND size = ?
          `,
      [userId, productId, size],
    );

    if ((existingRows as any[]).length > 0) {
      // Nếu đã có, update quantity
      const existing = (existingRows as any[])[0];
      const newQuantity = existing.quantity + quantity;

      await db.query(
        `
            UPDATE Cart
            SET quantity = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
        [newQuantity, existing.id],
      );

      return NextResponse.json({
        success: true,
        message: 'Updated quantity in cart',
      });
    } else {
      // Nếu chưa có, insert mới
      await db.query(
        `
            INSERT INTO Cart (userId, productId, quantity, size, price)
            VALUES (?, ?, ?, ?, ?)
            `,
        [userId, productId, quantity, size, price],
      );

      return NextResponse.json({
        success: true,
        message: 'Added product to cart',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error adding to cart' }, { status: 500 });
  }
}
