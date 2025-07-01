import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/Product/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const [rows] = await db.query(
      `
      SELECT
        p.id ,
        p.name,
        p.img,
        p.price,
        p.description,
        p.categoryName,
        p.status,
        p.discount,
        s.size,
        s.quantity
      FROM
        Product p
      LEFT JOIN
        ProductSize s
      ON
        p.id = s.productId
      WHERE
        p.id = ?
      `,
      [id],
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    // Group dữ liệu
    const productData = {
      id: (rows as any[])[0].id,
      name: (rows as any[])[0].name,
      img: (rows as any[])[0].img,
      price: (rows as any[])[0].price,
      description: (rows as any[])[0].description,
      categoryName: (rows as any[])[0].categoryName,
      status: (rows as any[])[0].status,
      discount: !!(rows as any[])[0].discount,
      sizes: [] as { size: string; quantity: number }[],
    };

    for (const row of rows as any[]) {
      if (row.size) {
        productData.sizes.push({
          size: row.size,
          quantity: row.quantity,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: productData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching product' }, { status: 500 });
  }
}

// PUT /api/Product/:id
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
      `UPDATE Product SET name=?, img=?, price=?, description=?, categoryName=?, status=?, discount=?
       WHERE id=?`,
      [name, img, price, description, categoryName, status, discount, productId],
    );

    // Xóa size cũ
    await db.query('DELETE FROM ProductSize WHERE ProductId = ?', [productId]);

    // Thêm size mới
    for (const size of sizes) {
      await db.query('INSERT INTO ProductSize (ProductId, size, quantity) VALUES (?, ?, ?)', [productId, size.size, size.quantity]);
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/Product/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id;
  try {
    // Xóa size trước
    await db.query('DELETE FROM product_sizes WHERE product_id = ?', [productId]);

    // Xóa product
    const [result]: any = await db.query('DELETE FROM Product WHERE id = ?', [productId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
