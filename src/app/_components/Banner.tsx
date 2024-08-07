// components/Banner.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images: string[] = ['/bannerFirst.png', '/bannerThird.jpg', '/bannerFour.jpg', '/bannerFive.jpg', '/bannerSix.jpg', '/bannerSeven.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="default-Banner" className="relative w-full">
      <div className="relative h-96 overflow-hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={src} alt={`Slide ${index + 1}`} className="object-cover" width={1519} height={1267} />
          </div>
        ))}
      </div>
      <span className="text-banner absolute left-72 top-10 ml-16 text-6xl text-white">Step Into Comfort and Style</span>
      <span className="absolute left-1/3 top-32 ml-10 text-2xl text-white">Discover Our Latest Collection Now</span>
      <Link
        href="/products/show"
        className="absolute left-1/3 top-1/2 ml-44 rounded-lg bg-blue-600 p-2 transition-transform duration-200 hover:scale-105"
      >
        <span className="text-lg uppercase text-white">Shop Now</span>
      </Link>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
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
