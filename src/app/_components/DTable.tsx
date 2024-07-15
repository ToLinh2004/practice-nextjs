'use client';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { Product, ProductProps } from '@/app/types';
import CreateModal from '@/app/_components/CreateProductModal';
import Link from 'next/link';
import UpdateModal from '@/app/_components/UpdateProductModal';
import DetailProductModal from '@/app/_components/DeleteProductModal';
import { Search } from '@/app/_components/Search';

export default function DTable({ products, query }: ProductProps) {
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    img: '',
    price: 0,
    quantity: 0,
    description: '',
  });
  const filterProduct = Array.isArray(products)
    ? products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];
  const displayedProducts =
    filterProduct.length >= 0 ? filterProduct : products;
  return (
    <>
      <section className="bg-blueGray-50 py-1">
        <div className="mx-auto mb-12 mt-10 w-full xl:mb-0 xl:w-full">
          <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="mb-0 rounded-t border-0 px-4">
              <div className="flex flex-wrap items-center">
                <div className="w-full max-w-full flex-1 flex-grow px-4">
                  <Search />
                </div>
                <div className="mb-4 mt-4 flex justify-end">
                  <button
                    className="mb-4 mt-4 h-10 w-full rounded bg-blue-600 text-white hover:scale-105 sm:w-40"
                    onClick={() => setShowModalCreate(true)}
                  >
                    <span className="ml-1">Add new product</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center bg-transparent">
                <thead className="bg-gray-200">
                  <tr>
                    {[
                      'ID',
                      'Image',
                      'Product Name',
                      'Description',
                      'Price',
                      'Quantity',
                      'Action',
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="cursor-pointer px-2 py-3 text-left text-sm  uppercase hover:text-blue-600 sm:px-6"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts?.map((item) => (
                    <tr
                      key={item.id}
                      className="transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900 sm:px-6">
                        {item.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 sm:px-6">
                        <Image src={item.img} alt="" height={180} width={180} />
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-900 sm:px-6">
                        {item.name}
                      </td>
                      <td className="max-h-14 max-w-80 overflow-hidden whitespace-normal px-2 py-4 text-sm text-gray-900 sm:px-6">
                        {item.description}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-900 sm:px-6">
                        {item.price}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-900 sm:px-6">
                        {item.quantity}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm font-medium sm:px-6">
                        <button
                          className="mx-2 rounded text-white transition-transform duration-200 hover:scale-150"
                          onClick={() => (
                            setShowModalUpdate(true), setProduct(item)
                          )}
                        >
                          <Image src="/update.png" className="w-6" />
                        </button>
                        <button
                          className="rounded text-white transition-transform duration-200 hover:scale-150"
                          onClick={() => (
                            setShowModalDelete(true), setProduct(item)
                          )}
                        >
                          <Image src="/delete.png" className="w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        product={product}
      />
      <DetailProductModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        product={product}
      />
    </>
  );
}
