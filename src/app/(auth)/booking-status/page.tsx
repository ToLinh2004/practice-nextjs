'use client';
import LoadingPage from '@/app/_components/Loading';
import { useLoginContext } from '@/app/context/UserContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

 function Booking() {
  const { user } = useLoginContext();
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        const { success, data, message } = await res.json();

        if (success) {
          setOrderDetail(data);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user.id]);
  function checkStatus(status: string) {
    switch (status) {
      case 'Pending':
        return 'Đang chờ xác nhận';
      case 'Confirmed':
        return 'Đã xác nhận';
      case 'Shipped':
        return 'Đã gửi hàng';
      case 'Cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  }
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!orderDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Không thể lấy thông tin đơn hàng</h2>
          <p className="mt-2 text-gray-500">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="relative z-10 mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-md">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-semibold">Thank you for ordering!</h2>
        {orderDetail.status === 'Confirmed'}
        <p className="mb-6 text-gray-500">Đơn hàng bạn đã đặt {checkStatus(orderDetail.status)}</p>
        <div className="flex flex-row justify-center space-x-4 space-y-0">
          <Link href="/order"  className="w-full rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 sm:w-auto">VIEW ORDER</Link >
          <Link href="/" className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-orange-600 sm:w-auto">CONTINUE SHOPPING</Link >
        </div>
      </div>
    </div>
  );
}


export default function BookingPage(){
     <Suspense fallback={<LoadingPage />}>
        <Booking />
      </Suspense>
}
