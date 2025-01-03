import Image from 'next/image';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

export default function FamousBrand() {
  const { language } = useLanguage();

  const images: string[] = ['/brandFirst.png', '/brandSecond.jpg', '/brandThird.png', '/brandFour.jpg', '/brandFive.png', '/brandSeven.jpg'];
  return (
    <>
      <div className="my-10 text-2xl sm:text-sm sm:my-5">
        <span className="font-bold uppercase hover:text-blue-600">{language === 'en' ? 'Famous brands' : 'Thương hiệu nổi tiếng'}</span>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-4 sm:gap-2">
        {images.map((src, index) => (
          <div className="relative h-40 sm:h-16 sm:w-20 transform border-r-2 bg-gray-300 transition duration-500 ease-in-out hover:scale-105" key={index}>
            <Image src={src} alt={`image ${index + 1}`} layout="fill" objectFit="center" className="" />
          </div>
        ))}
      </div>
    </>
  );
}
