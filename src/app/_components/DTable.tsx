'use client';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { Product, ProductProps } from '@/app/types';
import CreateProductModal from '@/app/_components/CreateProductModal';
import UpdateProductModal from '@/app/_components/UpdateProductModal';
import DetailProductModal from '@/app/_components/DeleteProductModal';
import NotSearch from '@/app/_components/NotSearch';
import { Search } from '@/app/_components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function DTable({ products, query, link }: ProductProps) {
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    img: '',
    price: 0,
    description: '',
    size: [],
    status: '',
    categoryName: '',
    discount: false,
  });

  return (
    <>
      {products.length === 0 ? (
        <NotSearch query={query} link={link} />
      ) : (
        <section className="pl-4 pt-20 sm:pl-0">
          <div className="xl:mb-0 xl:w-full mx-auto mb-12 mt-7 w-full sm:mb-4">
            <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded bg-gray-100">
              <div className="mb-0 rounded-t border-0 px-4 sm:h-16 sm:px-0">
                <div className="flex items-center sm:h-20">
                  <div className="ml-2 flex-1 flex-grow justify-start sm:h-10 md:px-4">
                    <Search />
                  </div>
                  <div className="my-4 flex justify-end sm:pb-2">
                    <button
                      className="h-10 w-10 rounded-full bg-blue-600 text-white hover:scale-105 sm:h-10 sm:w-10"
                      onClick={() => setShowModalCreate(true)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mx-2 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="w-full border-collapse items-center">
                  <thead className="">
                    <tr>
                      {['ID', 'Image', 'Product Name', 'Description', 'Price', 'Category', 'Action'].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600 "
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((item) => (
                      <tr key={item.id} className="border transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900 ">{item.id}</td>
                        <td className="whitespace-nowrap py-4 ">
                          <Image src={item.img} alt="Image" height={100} width={100} className=''/>
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-900 ">{item.name}</td>
                        <td className="max-h-14 max-w-80 overflow-hidden whitespace-normal py-4 text-sm text-gray-900 ">{item.description}</td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-900 ">{item.price}</td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-900 ">{item.categoryName}</td>
                        <td className="px-2py-4 whitespace-nowrap text-sm font-medium ">
                          <button
                            className="mr-2 rounded text-white transition-transform duration-200 hover:scale-105"
                            onClick={() => (setShowModalUpdate(true), setProduct(item))}
                          >
                            <Image src="/update.png" alt="icon update" height={24} width={24} />
                          </button>
                          <button
                            className="ml-2 rounded text-white transition-transform duration-200 hover:scale-105"
                            onClick={() => (setShowModalDelete(true), setProduct(item))}
                          >
                            <Image src="/delete.png" alt="icon delete" width={24} height={24} />
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
      )}
      <CreateProductModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
      <UpdateProductModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} product={product} />
      <DetailProductModal showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} product={product} />
    </>
  );
}
