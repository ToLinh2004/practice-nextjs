'use client';
import Banner from '@/app/_components/Banner';
import Carousel from '@/app/_components/Carousel';
import ProductPropose from '@/app/_components/ProductPropose';
import FamousBrand from '@/app/_components/FamousBrand';
import { useState, useEffect } from 'react';
import { useSaleOff } from '@/app/context/SaleOffContext';
import TitilePage from '@/app/_components/Titile';
import { useCart } from '@/app/context/CartContext';
import { getCart } from '@/app/services/config';
import { CartItem } from '@/app/types';
import { useLoginContext } from '@/app/context/UserContext';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import Footer from '@/app/_components/Footer';


const Home = () => {
  const {user, loggedIn } = useLoginContext();
  const [timeLeft, setTimeLeft] = useState(86400000);
  const { saleOffProducts, popularProducts } = useSaleOff();
 const { setCartCount } = useCart();
const { language } = useLanguage();
const fashion = language === 'en' ? 'Fahsion Shoes' : 'Giày Thời Trang';
const sport = language === 'en' ? 'Sport Shoes' : 'Giày Thể Thao';
const popular_product = language === 'en' ? 'Popular Products' : 'Sản phẩm nổi bật';

 useEffect(() => {
   const getAllCart = async () => {
     try {
       const data = await getCart();
       const cartUserItems = data.filter((cart: CartItem) => cart.userId === user.id);
       if (cartUserItems) {
         setCartCount(cartUserItems.length);
       } else {
         console.error('Fetch cart failed');
       }
     } catch (error) {
       console.error('Fetching cart failed:', error);
     }
   };
   if (loggedIn) {
     getAllCart();
   }
 }, [loggedIn]);
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

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);
    

  return (
    <>
      <TitilePage name={language === 'en' ? "Home" :"Trang chủ"} />
      <div className="mt-24 h-96 sm:h-40">
        <Banner />
      </div>
      <div className="mx-20 my-10 rounded-lg bg-gray-100  p-4 shadow-lg sm:mx-0 sm:p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:text-sm">
            <div className="mr-6 bg-blue-600 px-3 py-1 sm:mr-2 sm:px-2">
              <span className="animate-pulse font-bold text-white">{language === 'en' ? 'SALE OFF' :'Giảm Giá'}</span>
            </div>
            <div className="bg-blue-600 px-3 py-1 sm:px-2">
              <span className="font-bold text-white">{hours}h</span>
            </div>
            <div className="text-xl font-bold text-blue-600">:</div>
            <div className="bg-blue-600 px-3 py-1 sm:px-2">
              <span className="font-bold text-white">{minutes}m</span>
            </div>
            <div className="text-xl font-bold text-blue-600">:</div>
            <div className="bg-blue-600 px-3 py-1 sm:px-2">
              <span className="font-bold text-white">{seconds}s</span>
            </div>
          </div>
        </div>
        <ProductPropose titleLeft="" items={saleOffProducts} href="/" />
        <div className="my-20 grid w-full grid-cols-2 gap-2 sm:my-10">
          <Carousel title={fashion} category="fashion" />

          <Carousel title={sport} category="sport" />
        </div>
        <ProductPropose titleLeft={popular_product} items={popularProducts} href="/" />
        <FamousBrand />
      </div>
      <Footer />
    </>
  );
};

export default Home;



