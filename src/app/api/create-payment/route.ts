import { vnpay } from '@/app/services/config-vnpay';
import { NextResponse } from 'next/server';
import { ProductCode, VnpLocale, dateFormat } from 'vnpay';
export async function POST(request: Request) {
  const origin = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000';
  const vnp_ReturnUrl = `${origin}/api/vnpay-return`;

  try {
    const { amount, orderId, orderInfo } = await request.json();

    if (!amount || !orderId) {
      return NextResponse.json({ error: 'Missing amount or orderId' }, { status: 400 });
    }
    const now = dateFormat(new Date(), 'yyyymmddHHMMss');
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: request.headers.get('x-forwarded-for') || '127.0.0.1',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo || `Thanh toán có giao dịch là ${orderId}`,
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
