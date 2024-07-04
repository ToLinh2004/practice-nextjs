"use client";
import DTable from "@/app/components/DTable";
import MyPaginationComponent from "@/app/components/Pagination";
import useSWR from "swr";
import {useState } from "react";

function ShowTable() {
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    "https://6520d291906e276284c4b0d2.mockapi.io/api/1/products",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang

  // Tính tổng số trang
  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage); //Round up the number of pages

  // Xử lý sự kiện khi thay đổi trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <>
     <DTable products={currentPageData} />

      <MyPaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default ShowTable;
