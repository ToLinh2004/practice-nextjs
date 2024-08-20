// components/Carousel.tsx
import { useState, useEffect } from 'react';
import { Product } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

interface ProductCarousel {
  title: string;
  category: string;
}
const Carousel = ({ title, category }: ProductCarousel) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const { language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const allProducts: Product[] = await response.json();
        const filteredProducts = allProducts.filter((product) => product.categoryName.toLowerCase() === category.toLowerCase());
        const imageUrls = filteredProducts.map((product) => product.img);
        setProducts(imageUrls);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="default-carousel" className="relative w-full">
      <div className="relative h-96 sm:h-40 overflow-hidden">
        {products.map((src, index) => (
          <div
            key={index}
            className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={src} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" width={640} height={640} />
            <div className="absolute bottom-96 left-0">
              <span className="block rounded px-2 py-1 text-3xl font-bold text-black">{title}</span>
              <Link href="/products/show" className="mt-2 block px-2 py-1 text-2xl text-blue-600 underline">
                {language === 'en' ?"SHOP NOW" :"Mua Ngay"}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {products.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 sm:h-1 sm:w-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
