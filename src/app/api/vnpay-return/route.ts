import { NextRequest, NextResponse } from 'next/server';
import { VerifyIpnCall } from 'vnpay';
import { vnpay } from '@/app/services/config-vnpay';
import { db } from '@/app/_lib/db';
// const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000/';
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const rawQuery = Object.fromEntries(searchParams.entries());
  const protocol = req.nextUrl.protocol;
  const host = req.nextUrl.host;
  const domainUrl = `${protocol}//${host}`;
  const orderId = parseInt(rawQuery.vnp_TxnRef, 10);

  try {
    const verify = vnpay.verifyReturnUrl(rawQuery as unknown as VerifyIpnCall);

    if (verify.isSuccess && verify.isVerified) {
      const responseCode = rawQuery.vnp_ResponseCode;
      if (responseCode === '00') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Confirmed', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '24') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '15') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '10') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '11') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '13') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else if (responseCode === '51') {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      } else {
        await db.query(
          `
            UPDATE \`Order\`
            SET status = ?
            WHERE id = ?
          `,
          ['Cancelled', orderId],
        );
        return NextResponse.redirect(`${domainUrl}/booking-status?orderId=${orderId}`);
      }
    } else {
      await db.query(
        `
          UPDATE \`Order\`
          SET status = ?
          WHERE id = ?
        `,
        ['Cancelled', orderId],
      );
      return NextResponse.redirect(`${domainUrl}/booking-status`);
    }
  } catch (err) {
    console.error('Verification error:', err);
    await db.query(
      `
        UPDATE \`Order\`
        SET status = ?
        WHERE id = ?
      `,
      ['Cancelled', orderId],
    );
    return NextResponse.redirect(`${domainUrl}/booking-status`);
  }
}
