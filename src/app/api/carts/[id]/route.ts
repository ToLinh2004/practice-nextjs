import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/Product/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;
  try {
    const [rows] = await db.query(
      `
            SELECT
              c.id,
              c.productId,
              c.quantity,
              c.size,
              c.price,
              p.name AS productName,
              p.img AS productImg,
              p.categoryName,
              p.status
            FROM
              Cart c
            JOIN
              Product p
            ON
              c.productId = p.id
            WHERE
              c.userId = ?
            ORDER BY
              c.created_at DESC
            `,
      [userId],
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error fetching cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

  const cartId = params.id;

  try {
    // Xoá dòng cart
    const [result] = await db.query(`DELETE FROM Cart WHERE id = ?`, [cartId]);

    // Kiểm tra affectedRows để biết có xoá được không
    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'Cart item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cart item deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error deleting cart item' }, { status: 500 });
  } 
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

  const cartId = params.id;

  try {
    const body = await req.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json({ success: false, message: 'Quantity must be at least 1' }, { status: 400 });
    }


    const [result] = await db.query(
      `
        UPDATE Cart
        SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        `,
      [quantity, cartId],
    );

    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'Cart item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cart quantity updated successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error updating cart quantity' }, { status: 500 });
  } 
}
