import { PaginationComponentProps } from '@/app/types';
export default function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationComponentProps) {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <button 
        className="ms-0 flex h-8 items-center justify-center border border-gray-600 bg-gray-100 px-3 leading-tight text-gray-500 hover:bg-blue-600 hover:scale-105 transition-transform duration-300 hover:text-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
        key={number}
        onClick={() => onPageChange(number)}
        // active={number === currentPage}
      >
        {number}
      </button>,
    );
  }

  return (
    <nav
      className="flex-column sticky bottom-0 flex flex-wrap items-center justify-between pt-2 md:flex-row"
      aria-label="Table navigation"
    >
      <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
        <li>
          <button
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-blue-600 bg-gray-100 px-3 leading-tight text-gray-500 hover:bg-blue-600 hover:scale-105 transition-transform duration-200 hover:text-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {items?.map((page, index) => <li key={index}>{page}</li>)}

        <li>
          <button
            className="ms-0 flex h-8 items-center justify-center rounded-e-lg border border-gray-600 bg-gray-100 px-3 leading-tight text-gray-500 hover:bg-blue-600 hover:scale-105 transition-transform duration-200 hover:text-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
