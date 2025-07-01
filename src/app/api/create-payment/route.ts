import { db } from '@/app/_lib/db';
import { vnpay } from '@/app/services/config-vnpay';
import { NextResponse } from 'next/server';
import { ProductCode, VnpLocale, dateFormat } from 'vnpay';
export async function POST(request: Request) {
  // const origin = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000';
  // const vnp_ReturnUrl = `${origin}/api/vnpay-return`;
  const headers = request.headers;
  const protocol = headers.get('x-forwarded-proto') || 'http';
  const host = headers.get('host');
  const origin = `${protocol}://${host}`;

  const vnp_ReturnUrl = `${origin}/api/vnpay-return`;

  try {
    const { userId, address, phone, items, cartId, amount, orderInfo } = await request.json();

    if (!userId || !amount || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing order data' }, { status: 400 });
    }
    // 1️⃣ Tạo order trước
    const [orderInsert] = await db.query(`INSERT INTO \`Order\` (userId, total, status, address, phone) VALUES (?, ?, 'Pending', ?, ?)`, [
      userId,
      amount,
      address,
      phone,
    ]) as any;

    const orderId = orderInsert.insertId;
    // 2️⃣ Tạo order items
    for (const item of items) {
      await db.query(`INSERT INTO OrderItem (orderId, productId, quantity, size, price) VALUES (?, ?, ?, ?, ?)`, [
        orderId,
        item.productId,
        item.quantity,
        item.size,
        item.price,
      ]);
    }
    const now = dateFormat(new Date(), 'yyyymmddHHMMss');
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: amount * 100,
      vnp_IpAddr: request.headers.get('x-forwarded-for') || '127.0.0.1',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo || `Thanh toán có giao dịch là ${cartId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: vnp_ReturnUrl,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: now,
    });

    return NextResponse.json({ paymentUrl }, { status: 200 });
  } catch (error) {
    console.error('Error creating VNPay payment URL:', error);
    return NextResponse.json({ error: 'Failed to create payment URL' }, { status: 500 });
  }
}
