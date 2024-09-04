'use client';
import { Suspense } from 'react';
import FamousBrand from '@/app/_components/FamousBrand';
import { getAllProduct } from '@/app/services/config';
import { Product } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TitilePage from '@/app/_components/Titile';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import Footer from '@/app/_components/Footer';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('fashion');
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();

  useEffect(() => {
    fetchProducts('fashion');
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  const fetchProducts = async (category: string) => {
    setLoading(true);
    try {
      const data = await getAllProduct();
      const dataFashion = data.filter((product: Product) => product.categoryName === category && product.status === 'active');
      if (dataFashion) {
        setProducts(dataFashion);
        setActiveCategory(category);
      } else {
        console.error('Fetch product fashion that failed');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    setLoading(false);
  };

  const calculateDiscountedPrice = (price: number): number => {
    return Math.round(price * 0.8);
  };

  return (
    <>
      <TitilePage name="Product " />
      <Suspense>
        <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg sm:mx-0">
          <div className="my-10 flex items-center justify-between">
            <div className="mt-10 text-2xl sm:text-sm">
              <button
                className={`relative font-bold uppercase after:absolute after:bottom-[-4px] after:block after:h-[2px] after:w-[150%] ${activeCategory === 'fashion' ? 'after:bg-blue-600' : ''} after:content-[''] hover:text-blue-600`}
                onClick={() => fetchProducts('fashion')}
              >
                <span>{language === 'en' ? 'Fashion shoes' : 'Giày thời trang'}</span>
              </button>
            </div>
            <div className="mt-10 text-2xl sm:text-sm">
              <button
                className={`relative font-bold uppercase after:absolute after:bottom-[-4px] after:right-[0%] after:block after:h-[2px] after:w-[150%] ${activeCategory === 'sport' ? 'after:bg-blue-600' : ''} after:content-[''] hover:text-blue-600`}
                onClick={() => fetchProducts('sport')}
              >
                {language === 'en' ? 'Sport shoes' : 'Giày thể thao'}
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-xl">{language === 'en' ? 'Loading...' : 'Đang tải ...'}</span>
            </div>
          ) : (
            <div className="relative">
              {filteredProducts.length === 0 ? (
                <div className="flex h-28 items-center justify-center">
                  <span className="text-xl text-blue-600">
                    {language === 'en'
                      ? 'No products available for your search. Please try again'
                      : 'Không có sản phẩm nào cho tìm kiếm của bạn. Vui lòng thử lại'}
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 sm:gap-0">
                  {filteredProducts.map((product, index) => (
                    <div key={index} id="cart" className="group relative h-72 w-full rounded-lg bg-gray-300 shadow-lg sm:h-52">
                      <Image priority src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      <span className="absolute left-4 bg-opacity-50 px-2 text-center">{product.name}</span>
                      <div className="absolute ml-6 mt-4 text-center">
                        {product.discount ? <span className="mr-2">${calculateDiscountedPrice(product.price)}</span> : ''}
                        <span className="text-red-600 line-through">${product.price}</span>
                      </div>
                      {product.discount ? (
                        <div className="absolute right-0 top-0 animate-pulse bg-red-600 font-bold text-white shadow-lg">
                          <span className="text-md block px-1">-10%</span>
                        </div>
                      ) : null}
                      <Link
                        href={`/products/${product.id}`}
                        id="add-to-cart"
                        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 transform rounded-sm px-2 py-1 transition-transform duration-500 group-hover:translate-y-2"
                      >
                        <Image src="/cart.png" width={50} height={50} alt="Cart" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <FamousBrand />
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
