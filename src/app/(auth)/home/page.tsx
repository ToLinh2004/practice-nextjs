'use client';
import Banner from '@/app/_components/Banner';
import Carousel from '@/app/_components/Carousel';
import ProductPropose from '@/app/_components/ProductPropose';
import FamousBrand from '@/app/_components/FamousBrand';
import { useState, useEffect } from 'react';
import { useSaleOff } from '@/app/context/SaleOffContext';
import { Product } from '@/app/types';
import { getAllProduct } from '@/app/services/config';
import Head from 'next/head';
const Home = () => {
  const [timeLeft, setTimeLeft] = useState(86400000); // 24 hours in milliseconds
  const { saleOffProducts, popularProducts } = useSaleOff();

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
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <>
      <Head>
        <title>Home - V-SPLUSH</title>
      </Head>
      <div className="mt-24 h-96">
        <Banner />
      </div>
      <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="mr-6 bg-blue-600 px-3 py-1">
              <span className="animate-pulse font-bold text-white">SALE OFF</span>
            </div>
            <div className="bg-blue-600 px-3 py-1">
              <span className="font-bold text-white">{hours}h</span>
            </div>
            <div className="text-xl font-bold text-blue-600">:</div>
            <div className="bg-blue-600 px-3 py-1">
              <span className="font-bold text-white">{minutes}m</span>
            </div>
            <div className="text-xl font-bold text-blue-600">:</div>
            <div className="bg-blue-600 px-3 py-1">
              <span className="font-bold text-white">{seconds}s</span>
            </div>
          </div>
          <div className="text-right">
            <button className="font-bold text-blue-600 hover:underline">VIEW ALL</button>
          </div>
        </div>
        <ProductPropose titleLeft="" titleRight="" items={saleOffProducts} href="/" />
        <div className="my-20 grid w-full grid-cols-2 gap-2">
          <Carousel title="Fahsion Shoes" category="fashion" />

          <Carousel title="Sport Shoes" category="sport" />
        </div>
        <ProductPropose titleLeft="Popular Products" titleRight="View All" items={popularProducts} href="/" />
        <FamousBrand />
      </div>
    </>
  );
};

export default Home;
