'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import FamousBrand from '@/app/_components/FamousBrand';
import { useSaleOff } from '@/app/context/SaleOffContext';
import TitilePage from '@/app/_components/Titile';
import Footer from '@/app/_components/Footer';

export default function ProductPage() {
  const { saleOffProducts } = useSaleOff();
  const [timeLeft, setTimeLeft] = useState(86400000); // 24 hour in milliseconds

  useEffect(() => {
    const endTime = new Date().getTime() + timeLeft;

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = endTime - now;

      if (remainingTime <= 0) {
        setTimeLeft(0);
        clearInterval(intervalId);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000); // update each seconds

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const calculateDiscountedPrice = (price: number): number => {
    return Math.round(price * 0.8);
  };
  return (
    <>
      {' '}
      <TitilePage name="Sale Off Product " />
      <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg sm:mx-0">
        <div className="my-10 flex items-center justify-between">
          <div className="mt-10 text-2xl">
            <button className="relative font-bold uppercase after:absolute after:bottom-[-4px] after:block after:h-[2px] after:w-[150%] after:bg-blue-600 after:content-[''] hover:text-blue-600">
              <span className="animate-pulse sm:text-sm">
                f<FontAwesomeIcon icon={faBolt} className="text-blue hover:bg-blue-600" />
                ash sale
              </span>
            </button>
          </div>
          <div className="mt-10 text-2xl sm:text-sm">
            <div className="flex items-center">
              <div className="bg-blue-600 px-1 py-1">
                <span className="text-white">{hours}h</span>
              </div>
              <div className="text-sm text-blue-600">:</div>
              <div className="bg-blue-600 px-1 py-1">
                <span className="text-white">{minutes}m</span>
              </div>
              <div className="text-sm text-blue-600">:</div>
              <div className="bg-blue-600 px-1 py-1">
                <span className="text-white">{seconds}s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-4 gap-4 sm:grid-cols-2 sm:gap-0">
          {saleOffProducts?.map((product, index) => (
            <div id="cart" className="group relative h-72 w-full bg-gray-300 shadow-lg sm:h-52" key={index}>
              <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} className="" />
              <span className="absolute left-4 bg-opacity-50 px-2 text-center">{product.name}</span>
              <div className="absolute ml-6 mt-4 text-center">
                <span className="mr-2">${calculateDiscountedPrice(product.price)}</span>
                <span className="ml-2 text-red-600 line-through">${product.price}</span>
              </div>
              <div className="absolute right-0 top-0 animate-pulse bg-red-600 font-bold text-white shadow-lg">
                <span className="text-md block px-1">-10%</span>
              </div>
              <Link
                href={`/products/${product.id}`}
                id="add-to-cart"
                className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 transform rounded-sm px-2 py-1 transition-transform duration-500 group-hover:translate-y-2"
              >
                <Image src="/cart.png" width={50} height={50} alt="icon card" />
              </Link>
            </div>
          ))}
        </div>

        <FamousBrand />
      </div>
      <Footer />
    </>
  );
}
