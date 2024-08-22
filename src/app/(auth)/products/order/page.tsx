'use client';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import { useSearchParams } from 'next/navigation';
import { deleteCartById, getAllOrder, getAllProduct } from '@/app/services/config';
import Link from 'next/link';
import { Order, OrderItem, Product } from '@/app/types';
import TitilePage from '@/app/_components/Titile';
import { useLoginContext } from '@/app/context/UserContext';
import LoadingPage from '@/app/_components/Loading';
import Footer from '@/app/_components/Footer';
export default function OrderHistoryPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useLoginContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getAllOrder();
      const orderUserItems = res.filter((order: Order) => order.userId === user.id);
      if (orderUserItems) {
        setOrders(orderUserItems);
        const productData = await getAllProduct();
        setProducts(productData);
        setLoading(false);
      } else {
        console.error('Fetch cart failed');
      }
    } catch (error) {
      console.error('Fetching cart failed:', error);
      setLoading(false);
    }
  };
  const saveOrder = async () => {
    try {
      if (typeof window !== undefined) {
        const newOrderString = localStorage.getItem('newOrders') || '';
        const newOrder = JSON.parse(newOrderString);
        await fetch('https://66beb4f642533c403143d546.mockapi.io/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
        });
        toast.success('Order saved successfully!');
          if (typeof window !== undefined) {
        const orderItems = localStorage.getItem('orderItems') || '';
        const orderItem = JSON.parse(orderItems);
        const cartId = orderItem.map((item: OrderItem) => {
          deleteCart(item.cartId);
        });
      }
        localStorage.removeItem('newOrders');
        localStorage.removeItem('orderItems');
      }
    } catch (error) {
      console.error('Failed to save order:', error);
      toast.error('Failed to save order.');
    }
  };

  const deleteCart = async (id: number) => {
    try {
      const res = await deleteCartById(id);
    } catch (error) {
      console.error('Delete cart failed:', error);
    }
  };

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    if (vnp_ResponseCode) {
      switch (vnp_ResponseCode) {
        case '00':
          // toast.success('Transaction successful.');
          saveOrder();
          break;
        case '07':
          toast.warning('Money deducted successfully. Transaction is suspected (related to fraud or unusual transactions).');
          break;
        case '09':
          toast.error("Transaction failed: The customer's card/account has not registered for Internet Banking service at the bank.");
          break;
        case '10':
          toast.error('Transaction failed: The customer entered incorrect card/account information more than 3 times.');
          break;
        case '11':
          toast.error('Transaction failed: Payment session expired. Please retry the transaction.');
          break;
        case '12':
          toast.error("Transaction failed: The customer's card/account is locked.");
          break;
        case '13':
          toast.error('Transaction failed: The customer entered the wrong transaction authentication password (OTP). Please retry the transaction.');
          break;
        case '24':
          toast.info('Transaction failed: The customer canceled the transaction.');
          break;
        case '51':
          toast.error("Transaction failed: Insufficient balance in the customer's account to complete the transaction.");
          break;
        case '65':
          toast.error("Transaction failed: The customer's account has exceeded the transaction limit for the day.");
          break;
        case '75':
          toast.error('The payment bank is under maintenance.');
          break;
        case '79':
          toast.error(
            'Transaction failed: The customer entered the wrong payment password more than the allowed number of times. Please retry the transaction.',
          );
          break;
        case '99':
          toast.error('Other errors occurred (remaining errors not listed).');
          break;
        default:
          toast.error('Unknown response code.');
          break;
      }
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);
  if (loading) return <LoadingPage />;

  return (
    <>
      <TitilePage name={language === 'en' ? 'All Orders' : 'Tất cả đơn hàng'} />
      <Suspense fallback={<LoadingPage />}>
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
                {orders?.map((items) =>
                  items.order?.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return product ? (
                      <tr key={item.productId}>
                        <td className="flex items-center px-4 py-2">
                          <Image src={product.img} alt={product.name} width={60} height={40} className="rounded object-cover" />
                        </td>
                        <td className="px-4 py-2">
                          <span className="font-semibold hover:text-blue-600">{product.name}</span>
                          <div className="text-sm text-gray-500">
                            {language === 'en' ? 'Size' : 'Kích thước'}: {item.size}
                          </div>
                          <span className="text-sm">
                            {language === 'en' ? 'Quantity' : 'Số lượng'}: {item.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          {product.discount ? (
                            <>
                              <span>${(product.price * 0.9).toFixed(2)}</span>
                              <span className="ml-2 text-red-600 line-through">${item.price}</span>
                            </>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center text-blue-600">{items.status}</td>
                        <td className="px-4 py-2 text-center">
                          <Link href={`../products/${item.productId}`}>
                            <button className="h-10 w-20 rounded-md bg-blue-600 text-sm text-white hover:bg-blue-700">
                              {language === 'en' ? 'Buy again' : 'Mua lại'}
                            </button>
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-right">
                          ${(product.discount ? product.price * item.quantity * 0.9 : product.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ) : null;
                  }),
                )}
              </tbody>
            </table>
          </div>
        )}
      </Suspense>
      <Footer />
    </>
  );
}
