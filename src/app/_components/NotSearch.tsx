import Link from 'next/link';
import Image from 'next/image';
import { Search } from '@/app/types';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

export default function NotSearch({ query, link }: Search) {
  const { language } = useLanguage();

  return (
    <section className="fixed left-80 right-20 top-28 flex h-screen items-center justify-center rounded bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl lg:px-6 lg:py-16 mx-auto px-4">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 flex justify-center text-9xl">
            <Image src="/noResults.png" alt="No Results Found" height={100} width={100} />
          </h1>

          <h1 className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {language === 'en'
              ? `Sorry, No Results For '${query}'. Try again using more general search items`
              : `Xin lỗi, không có kết quả cho '${query}'. Thử lại với các từ khóa tìm kiếm chung hơn.`}
          </h1>
          <Link href={link} className="underline">
           {language === 'en'? 'GO BACK' :'Trở lại'}
          </Link>
        </div>
      </div>
    </section>
  );
}
