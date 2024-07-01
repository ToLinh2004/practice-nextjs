"use client";
import { useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import { Product } from "@/app/interfaces/data";


interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
}
function DetailModal(props: IProps,{ params }: { params: { id: number } }) {
  const { showModalDelete, setShowModalDelete } = props;
  const router = useRouter();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    img: "",
    price: 0,
    quantity: 0,
  });
  useEffect(() => {
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/${params.id}`
      );
      const product = await res.json();
      setProduct(product);
      console.log(product);
    }
     catch (error) {
          console.log(error)
    }
    ;
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/${params.id}`,
        { method: "DELETE" }
      );
      router.push('/admin/products')
    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <>
      <Modal
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product.id}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of image"
                value={product.img}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={product.quantity}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailModal;
