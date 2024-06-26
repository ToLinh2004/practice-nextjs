"use client";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Product, IProps } from "@/app/interfaces/data";
import Button from "react-bootstrap/Button";
import CreateModal from "@/app/_components/CreateModal";
import DetailModal from "@/app/_components/DetailModal";
import Link from "next/link";
import { mutate } from "swr";
import UpdateModal from "@/app/_components/UpdateModal";
function DTable(props: IProps) {
  const { products } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
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
      <Button variant="primary" onClick={() => setShowModalCreate(true)}>
        Add new product
      </Button>
      <br />
      <br />
      <Table
        striped
        bordered
        hover
        variant="light"
        style={{ textAlign: "center" }}
       
      >
        <thead>
          <tr>
            <th >ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {/* use ?  "code=undefine" => not error */}
          {products?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Image src={item.img} rounded alt="" height={150} width={100} />
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td >
                <Button variant="primary">
                  {" "}
                  <Link href={`/products/${item.id}`} type="btn">
                    Detail
                  </Link>
                </Button>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="danger"
                  onClick={() => (setShowModalUpdate(true), setProduct(item))}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <DetailModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
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
