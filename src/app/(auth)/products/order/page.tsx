'use client';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import Link from 'next/link';
import { Order} from '@/app/types';
import TitilePage from '@/app/_components/Titile';
import { useLoginContext } from '@/app/context/UserContext';
import LoadingPage from '@/app/_components/Loading';
import Footer from '@/app/_components/Footer';
function OrderHistory() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useLoginContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await fetch('/api/orders/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const { success, data } = await res.json();
      if (success) {
        setOrders(data);
        setLoading(false);
      } else {
        console.error('Fetch cart failed');
      }
    } catch (error) {
      console.error('Fetching cart failed:', error);
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <>
      <TitilePage name={language === 'en' ? 'All Orders' : 'Tất cả đơn hàng'} />
      {orders?.length === 0 ? (
        <div className="mx-20 mt-72 rounded-lg bg-gray-100 p-4 shadow-lg">
          <span className="flex justify-center text-center">{language === 'en' ? 'No orders found' : 'Không có đơn hàng'}</span>
          <Link href="/home" className="flex items-center justify-center text-lg text-blue-600 underline">
            {language === 'en' ? 'Go Back' : 'Quay lại'}
          </Link>
        </div>
      ) : (
        <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg">
          <table className="mt-20 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th colSpan={2} className="border-b px-4 py-2 uppercase text-gray-700">
                  {language === 'en' ? 'Product' : 'Sản phẩm'}
                </th>
                <th className="border-b px-4 py-2 text-center uppercase">{language === 'en' ? 'Price' : 'Giá'}</th>
                <th className="border-b px-4 py-2 text-center uppercase">{language === 'en' ? 'Status' : 'Trạng thái'}</th>
                <th className="border-b px-4 py-2 text-center uppercase">{language === 'en' ? 'Action' : 'Thao tác'}</th>
                <th className="border-b px-4 py-2 text-right uppercase">{language === 'en' ? 'Total' : 'Tổng'}</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order:Order) =>
                order.items.map((item) => (
                  <tr key={`${order.orderId}-${item.productId}`}>
                    <td className="flex items-center px-4 py-2">
                      <Image src={item.productImage} alt={item.productName} width={60} height={40} className="rounded object-cover" />
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-semibold hover:text-blue-600">{item.productName}</span>
                      <div className="text-sm text-gray-500">
                        {language === 'en' ? 'Size' : 'Kích thước'}: {item.size}
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? 'Quantity' : 'Số lượng'}: {item.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.discount ? (
                        <>
                          <span>${(item.price * 0.9)}</span>
                          <span className="ml-2 text-red-600 line-through">${item.price}</span>
                        </>
                      ) : (
                        <span>${item.price}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center text-blue-600">{order.status}</td>
                    <td className="px-4 py-2 text-center">
                      <Link href={`/products/${item.productId}`}>
                        <button className="h-10 w-20 rounded-md bg-blue-600 text-sm text-white hover:bg-blue-700">
                          {language === 'en' ? 'Buy again' : 'Mua lại'}
                        </button>
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right">${((item.discount ? item.price * 0.9 : item.price) * item.quantity)}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
      <Footer />
    </>
  );
}

export default function OrderHistoryPage(){
  return (
    <Suspense fallback={<LoadingPage />}>
      <OrderHistory />
    </Suspense>
  )
}
