import { PaginationComponentProps } from '@/app/types';
export default function PaginationComponent({ totalPages, currentPage, onPageChange }: PaginationComponentProps) {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    const isActive = number === currentPage;
    items.push(
      <button
        className={`ms-0 flex h-8 items-center justify-center border border-gray-600 px-3 leading-tight transition-transform duration-300 dark:border-gray-700 ${
          isActive
            ? 'bg-blue-600 text-gray-100 dark:bg-blue-600 dark:text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
        key={number}
        onClick={() => onPageChange(number)}
      >
        {number}
      </button>,
    );
  }

  return (
    <nav
      className="flex-column bottom-0 flex flex-wrap items-center justify-between sm:ml-3 "
      aria-label="Table navigation"
    >
      <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">{items?.map((page, index) => <li key={index}>{page}</li>)}</ul>
    </nav>
  );
}
