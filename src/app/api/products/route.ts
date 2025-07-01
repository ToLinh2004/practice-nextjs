import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id as productId,
        p.name,
        p.img,
        p.price,
        p.description,
        p.categoryName,
        p.status,
        p.discount,
        ps.size,
        ps.quantity
      FROM Product p
      LEFT JOIN ProductSize ps ON p.id = ps.productId
       ORDER BY
        p.created_at DESC
    `);

    // Gom các size vào từng sản phẩm
    const grouped = new Map<number, any>();

    for (const row of rows as any[]) {
      if (!grouped.has(row.productId)) {
        grouped.set(row.productId, {
          id: row.productId,
          name: row.name,
          img: row.img,
          price: row.price,
          description: row.description,
          categoryName: row.categoryName,
          status: row.status,
          discount: !!row.discount,
          sizes: [],
        });
      }

      if (row.size) {
        grouped.get(row.productId).sizes.push({
          size: row.size,
          quantity: row.quantity,
        });
      }
    }

    const products = Array.from(grouped.values());

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Error fetching products' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
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
      sizes, // mảng: [{ size: "40", quantity: 10 }, ...]
    } = body;

    if (!name || !price || !status || !Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Tạo product
    const [result]: any = await db.query(
      `INSERT INTO products (name, img, price, description, categoryName, status, discount)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, img, price, description, categoryName, status, discount],
    );

    const productId = result.insertId;

    // 2. Thêm các size vào product_sizes
    for (const size of sizes) {
      await db.query(`INSERT INTO product_sizes (product_id, size, quantity) VALUES (?, ?, ?)`, [productId, size.size, size.quantity]);
    }

    return NextResponse.json({ message: 'Product and sizes created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating product with sizes:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
