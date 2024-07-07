"use client";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Product, IProps } from "@/app/interfaces/data";
import CreateModal from "@/app/components/CreateModal";
import Link from "next/link";
import { mutate } from "swr";
import UpdateModal from "@/app/components/UpdateModal";
function DTable(props: IProps) {
  const { products } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    img: "",
    price: 0,
    quantity: 0,
  });

  const handleDelete = async (id: number) => {
    if (confirm(`Do you want to delete this product ${id} ?`)) {
      try {
        const res = await fetch(
          `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/${id}`,
          {
            method: "DELETE",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          mutate("https://6520d291906e276284c4b0d2.mockapi.io/api/1/products");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <>

      <button
        className="bg-blue-600 text-white h-10 w-40 mt-4 rounded float-left"
      
      >
        Product
      </button>
      <button
        className="bg-blue-600 text-white h-10 w-40 mt-4 mb-4  rounded float-right"
        onClick={() => setShowModalCreate(true)}
      >
        Add new product
      </button>
      

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
          {products?.map((item) => (
            <tr key={item.id} className=" border text-center">
              <td className="border">{item.id}</td>
              <td className="border">{item.name}</td>
              <td className="grid place-items-center mt-2">
                
                <Image src={item.img} rounded alt="" height={200} width={100} />
              </td>
              <td className="border">{item.price}</td>
              <td className="border">{item.quantity}</td>
              <td className="border">
                <button className="bg-blue-600 text-white h-10 w-20  mb-4 rounded">
                  <Link
                    href={`/admin/products/${item.id}`}
                    type="btn"
                    className="text-white no-underline"
                  >
                    Detail
                  </Link>
                </button>
                <button
                  className="bg-red-500 rounded mx-3 mt-4 w-20 h-10 text-white"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white rounded w-20 h-10"
                  onClick={() => (setShowModalUpdate(true), setProduct(item))}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        product={product}
      />
    </>
  );
}

export default DTable;



