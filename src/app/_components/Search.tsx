'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams();
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery(value);
  }, 1000);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="float-left mb-2 h-10 rounded-md border border-gray-200 py-[9px] pl-8 text-sm focus:outline-none"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </>
  );
}
