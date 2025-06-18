// import { getBookingPaymentId } from '@/app/api/payment/payment-info/payment';
import { NextRequest, NextResponse } from 'next/server';
import { VerifyIpnCall } from 'vnpay';
import dayjs from 'dayjs';
// import { updateStatusBooking } from '@/app/api/booking';
import { vnpay } from '@/app/services/config-vnpay';
const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://gbalo.com';
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const rawQuery = Object.fromEntries(searchParams.entries());
  // const sessionData = await getBookingPaymentId();
  try {
    const verify = vnpay.verifyReturnUrl(rawQuery as unknown as VerifyIpnCall);

    if (verify.isSuccess && verify.isVerified) {
      const responseCode = rawQuery.vnp_ResponseCode;
      if (responseCode === '00') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 2,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: '',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '24') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Giao dịch đã bị hủy hoặc hết thời gian',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '15') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Quá thời gian thanh toán',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '10') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '11') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '13') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError:
        //     'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else if (responseCode === '51') {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      } else {
        // const response = await updateStatusBooking({
        //   paymentId: sessionData.paymentId,
        //   status: 3,
        //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //   transactionNo: rawQuery.vnp_TransactionNo,
        //   messageError: 'Giao dịch thất bại',
        // });
        return NextResponse.redirect(`${domainUrl}/booking-status`);
      }
    } else {
      // const response = await updateStatusBooking({
      //   paymentId: sessionData.paymentId,
      //   status: 3,
      //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      //   transactionNo: rawQuery.vnp_TransactionNo,
      //   messageError: 'Giao dịch thất bại',
      // });
      return NextResponse.redirect(`${domainUrl}/booking-status`);
    }
  } catch (err) {
    console.error('Verification error:', err);
    // const response = await updateStatusBooking({
    //   paymentId: sessionData.paymentId,
    //   status: 3,
    //   paidDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //   transactionNo: rawQuery.vnp_TransactionNo,
    //   messageError: 'Giao dịch thất bại',
    // });
    return NextResponse.redirect(`${domainUrl}/booking-status`);
  }
}
