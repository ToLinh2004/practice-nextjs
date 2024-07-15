'use client';
import DTable from '@/app/_components/DTable';
import MyPaginationComponent from '@/app/_components/Pagination';
import useSWR from 'swr';
import { useState } from 'react';


export default function ShowProduct({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    'https://6520d291906e276284c4b0d2.mockapi.io/api/1/products',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <>
      <DTable products={currentPageData} query={query} />

      <MyPaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
