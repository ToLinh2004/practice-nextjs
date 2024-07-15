import SearchProduct from '@/app/dashboard/search/SearchProduct';
import SearchList from '@/app/dashboard/search/SearchList';

const SearchProductPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || '';

  return (
    <div>
      searchProduct
      <h1>
        <SearchProduct />
      </h1>
      <h1>
        <SearchList query={query} />{' '}
      </h1>
    </div>
  );
};

export default SearchProductPage;
