// components/Banner.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images: string[] = ['/bannerFirst.png', '/bannerThird.jpg', '/bannerFour.jpg', '/bannerFive.jpg', '/bannerSix.jpg', '/bannerSeven.jpg'];
const { language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="default-Banner" className="relative w-full">
      <div className="relative h-96 overflow-hidden sm:h-40">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out sm:top-20 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={src} alt={`Slide ${index + 1}`} className="object-cover w-full sm:h-40 sm:w-full" width={1519} height={1267} />
          </div>
        ))}
      </div>
      <span className="text-banner absolute left-72 top-10 ml-16 text-6xl text-white sm:left-0 sm:text-2xl">{language === 'en' ?"Step Into Comfort and Style" :"Bước Vào Sự Thoải Mái và Phong Cách"}</span>
      <span className="absolute left-1/3 top-32 ml-10 text-2xl text-white sm:left-12 sm:top-20 sm:ml-12 sm:text-sm ">
        {language === 'en' ? 'Discover Our Latest Collection Now' :'Khám Phá Bộ Sưu Tập Mới Nhất Của Chúng Tôi Ngay Bây Giờ'}
      </span>
      <Link
        href="/products/show"
        className="absolute left-1/3 top-1/2 ml-44 rounded-lg bg-blue-600 p-2 transition-transform duration-200 hover:scale-105 sm:left-0 sm:top-28 sm:ml-40 sm:scale-90  sm:text-sm"
      >
        <span className="text-lg uppercase text-white sm:text-sm ">{language === 'en' ? 'Shop Now' :'Mua Ngay'}</span>
      </Link>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 sm:bottom-0 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 rounded-full sm:h-2 sm:w-2 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
