'use client';
import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import LoadingPage from '@/app/_components/Loading';
import { Contact, Order, Product } from '@/app/types';
import MyPaginationComponent from '@/app/_components/Pagination';
import UpdateContactModal from '@/app/_components/UpdateContactModal';
import Image from 'next/image';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import Link from 'next/link';
import { getAllProduct, updateOrder } from '@/app/services/config';
import { toast } from 'react-toastify';

export default function ShowOrder() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR('https://66beb4f642533c403143d546.mockapi.io/api/order', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  let displayedOrders: Order[] = [];
  let totalPages = 0;
  let totalItems = 0;

  if (data && data.length > 0) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    displayedOrders = data.slice(startIndex, endIndex);
    totalItems = data.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchProduct();
  }, [data]);

  const fetchProduct = async () => {
    try {
      const productData = await getAllProduct();
      if (productData) {
        setProducts(productData);
      }
    } catch (error) {}
  };
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await updateOrder(orderId, newStatus);

      if (res) {
        toast.success('update status order successfully');
        mutate('https://66beb4f642533c403143d546.mockapi.io/api/order');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );
  return (
    <>
      <section className="pl-4 pt-20 sm:pl-0">
        <div className="xl:mb-0 xl:w-full mx-auto mb-12 mt-7 w-full sm:mb-4">
          <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded bg-gray-100">
            <div className="mb-0 mt-2 rounded-t border-0 px-2 sm:mb-6 sm:h-16 sm:px-0">
              <button className="my-4 h-10 rounded bg-blue-600 text-white">
                <span className="mx-1 sm:pb-1 sm:text-sm">Orders</span>
              </button>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center">
                <thead className="">
                  <tr>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'ID' : 'ID'}
                    </th>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'User Id' : 'User Id'}
                    </th>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Product Name' : 'Sản Phẩm'}
                    </th>

                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Total' : 'Tổng'}
                    </th>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Phone' : 'Điện Thoại'}
                    </th>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Address' : 'Địa Chỉ'}
                    </th>
                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Created ' : 'Ngày Đặt'}
                    </th>

                    <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Status' : 'Trạng Thái'}
                    </th>
                    {/* <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                      {language === 'en' ? 'Action' : 'Thao Tác'}
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders?.map((item) => (
                    <tr key={item.id} className="border-1 transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900">{item.userId}</td>
                      <td className="whitespace-nowrap text-sm text-gray-900 sm:pr-4">
                        <ul className="">
                          {item.order.map((orderItem, index) => {
                            const product = products.find((p) => p.id === orderItem.productId);
                            return product ? (
                              <li key={index} className="mb-2 flex items-center space-x-4">
                                <Image src={product.img} alt={product.name} width={80} height={40} className="rounded object-cover" />
                                <div className="flex flex-col">
                                  <span className="ml-2">
                                    {' '}
                                    {language === 'en' ? 'Quantity' : 'Số lượng'}: {orderItem.quantity}
                                  </span>
                                  <span className="ml-2">
                                    {' '}
                                    {language === 'en' ? 'Name' : 'Tên'}: {product.name}
                                  </span>
                                  {product.discount ? (
                                    <div className="flex flex-row">
                                      <span className="ml-2">${(product.price * 0.9).toFixed(2)}</span>
                                      <span className="ml-2 text-red-600 line-through">${orderItem.price}</span>
                                    </div>
                                  ) : (
                                    <span className="ml-2">${product.price.toFixed(2)}</span>
                                  )}
                                </div>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-900 sm:pr-4">{item.total}</td>
                      <td className="whitespace-nowrap text-sm text-gray-900 sm:pr-4">{item.phone}</td>
                      <td className="whitespace-nowrap text-sm text-gray-900 sm:pr-4">{item.address}</td>

                      <td className="max-h-14 max-w-80 overflow-hidden whitespace-normal text-sm text-gray-900 sm:pr-4">{item.createdAt}</td>

                      <td className="whitespace-nowrap sm:pr-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id!, e.target.value)}
                          className="ms-2 rounded border border-gray-300 bg-white py-1 text-sm text-blue-600"
                        >
                          <option value="Pending">{language === 'en' ? 'Pending' : 'Chờ xử lý'}</option>
                          <option value="Processing" className="text-red-600">
                            {language === 'en' ? 'Processing' : 'Đang xử lý'}
                          </option>
                          <option value="Success" className="text-green-500">
                            {language === 'en' ? 'Success' : 'Thành công'}
                          </option>
                        </select>
                      </td>
                      {/* <td className="whitespace-nowrap  sm:pr-4">
                        <Link
                          href={`../orders/${item.id}`}
                          className=" rounded  transition-transform duration-200 hover:scale-105"
                          //   onClick={() => (setShowModalUpdate(true), setContact(item))}
                        >
                          <Image src="/view-details.png" alt="Image" width={28} height={28} />
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* <UpdateContactModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} contact={contact} /> */}
      <MyPaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
