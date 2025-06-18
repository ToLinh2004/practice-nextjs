import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id;
  try {
    const [[product]]:any = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    const [sizes] = await db.query('SELECT * FROM product_sizes WHERE product_id = ?', [productId]);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ ...product, sizes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id;
  try {
    const body = await req.json();
    const {
      name,
      img,
      price,
      description,
      categoryName,
      status,
      discount,
      sizes, // [{ size: "40", quantity: 5 }]
    } = body;

    await db.query(
      `UPDATE products SET name=?, img=?, price=?, description=?, categoryName=?, status=?, discount=?
       WHERE id=?`,
      [name, img, price, description, categoryName, status, discount, productId],
    );

    // Xóa size cũ
    await db.query('DELETE FROM product_sizes WHERE product_id = ?', [productId]);

    // Thêm size mới
    for (const size of sizes) {
      await db.query('INSERT INTO product_sizes (product_id, size, quantity) VALUES (?, ?, ?)', [productId, size.size, size.quantity]);
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id;
  try {
    // Xóa size trước
    await db.query('DELETE FROM product_sizes WHERE product_id = ?', [productId]);

    // Xóa product
    const [result]: any = await db.query('DELETE FROM products WHERE id = ?', [productId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
