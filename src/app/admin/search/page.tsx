import SearchList from "@/app/admin/search/SearchList";
import SearchProduct from "@/app/admin/search/SearchProduct";

const  SearchProductPage = async ({
    searchParams,
}:{
    searchParams?:{
        query?:string;

    };
}) => {
    const query = searchParams?.query || '';

  return (
    <div>searchProduct

        <h1><SearchProduct /></h1>
        <h1><SearchList query ={query} /> </h1>
    </div>

  )
}

export default SearchProductPage;