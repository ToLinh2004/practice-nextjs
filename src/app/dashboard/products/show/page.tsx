'use client';
import { Suspense } from 'react';
import DTable from '@/app/_components/DTable';
import MyPaginationComponent from '@/app/_components/Pagination';
import useSWR from 'swr';
import { useState } from 'react';
import { Product } from '@/app/types';
import LoadingPage from '@/app/_components/Loading';
import { useLoginContext } from '@/app/context/UserContext';
import NotFound from '@/app/not-found';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

export default function ShowProduct({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { loggedIn, user } = useLoginContext();
  const { language } = useLanguage();

  const query = searchParams?.query || '';
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  let displayedProducts: Product[] = [];
  let totalPages = 0;
  let totalItems = 0;

  if (data && data.length > 0) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredProducts = data.filter((product: Product) => product.name.toLowerCase().includes(query.toLowerCase()));
    totalItems = filteredProducts.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    displayedProducts = filteredProducts.slice(startIndex, endIndex);
  }
  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  return (
    <>
      <Suspense fallback={<div>{language === 'en' ? 'Loading...' :'Đang tải ...'}</div>}>
        {loggedIn && user.role === 'admin' ? (
          <>
            <DTable products={displayedProducts} query={query} link="/dashboard/products/show" />
            <MyPaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />{' '}
          </>
        ) : (
          <NotFound />
        )}
      </Suspense>
    </>
  );
}
