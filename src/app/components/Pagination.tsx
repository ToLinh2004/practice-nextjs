import React from "react";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationComponentProps) {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <button
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        key={number}
        onClick={() => onPageChange(number)}
        
        // active={number === currentPage}
      >
        {number}
      </button>
    );
  }

  return (
    <>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {items?.map((page, index) => (
            <li key={index}>{page}</li>
          ))}

          <li>
            <button
             className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PaginationComponent;
