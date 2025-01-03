import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/app/types';

interface ProductPropose {
  titleLeft: string;
  href: string;
  items: Product[];
}

export default function ProductPropose({ titleLeft, items }: ProductPropose) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalPages;
      console.log('Next Slide - Current Index:', newIndex); // Check current index
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + totalPages) % totalPages;
      console.log('Previous Slide - Current Index:', newIndex); // Check current index
      return newIndex;
    });
  };
  const calculateDiscountedPrice = (price: number): number => {
    return Math.round(price * 0.8);
  };
  const displayedItems = items.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage);

  return (
    <>
      <div className="mb-10 flex items-center justify-between sm:mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-2xl sm:text-sm">
            <span className="font-bold uppercase hover:text-blue-600">{titleLeft}</span>
          </div>
        </div>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 ">
          {displayedItems?.map((product, index) => (
            <Link href={`/products/${product.id}`} key={index}>
              <div
                className="group relative h-72 w-full rounded-lg bg-gray-300 shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 sm:h-48"
                key={index}
              >
                <Image src={product.img} alt={product.name} layout='fill' objectFit='cover'/>
                <span className="absolute left-4 bg-opacity-50 px-2 pt-2 text-center sm:pt-0 sm:text-sm">{product.name}</span>
                <div className="absolute ml-6 mt-8 text-center sm:text-sm">
                  {product.discount ? <span className="mr-2">${calculateDiscountedPrice(product.price)}</span> : ''}
                  <span className="text-red-600 line-through">${product.price}</span>
                </div>
                {product.discount ? (
                  <div className="absolute right-0 bg-red-600 px-2 py-1 text-white sm:px-0 sm:text-sm">
                    <span className="text-md animate-pulse sm:text-sm">-10%</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-300 p-2 text-white shadow-lg hover:bg-blue-600"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-300 p-2 text-white shadow-lg hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>
    </>
  );
}
