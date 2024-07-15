import { getAllProduct } from '@/app/services/config';
import Image from 'next/image';

const SearchList = async ({ query }: { query: string }) => {
  const allProduct = await getAllProduct();
  const filterProduct = Array.isArray(allProduct)
    ? allProduct.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];
  return (
    <>
      <table className="w-full table-auto border-2">
        <thead>
          <tr className="text-center">
            <th className="border">ID</th>
            <th className="border">Product Name</th>
            <th className="border">Image</th>
            <th className="border">Price</th>
            <th className="border">Quantity</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* use ?  "code=undefine" => not error */}
          {filterProduct?.map((item) => (
            <tr key={item.id} className="border text-center">
              <td className="border">{item.id}</td>
              <td className="border">{item.name}</td>
              <td className="mt-2 grid place-items-center">
                <Image src={item.img} alt="" height={200} width={100} />
              </td>
              <td className="border">{item.price}</td>
              <td className="border">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchList;
