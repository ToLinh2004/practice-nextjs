
import Image from "next/image";

const SearchList = async ({query}:{query:string}) => {
    const allProduct = await  await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/`
      );
      const filterProduct = Array.isArray(allProduct) ?allProduct.filter((product)=>{
        return product.name.toLowerCase().include(query.toLowerCase());
      }):[];
  return (
    <>

    
      <table className="table-auto border-2 w-full">
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
            <tr key={item.id} className=" border text-center">
              <td className="border">{item.id}</td>
              <td className="border">{item.name}</td>
              <td className="grid place-items-center mt-2">
                
                <Image src={item.img}  alt="" height={200} width={100} />
              </td>
              <td className="border">{item.price}</td>
              <td className="border">{item.quantity}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  )
}

export default SearchList