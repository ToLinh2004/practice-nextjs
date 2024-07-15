'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
const SearchProduct = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
export default SearchProduct;
