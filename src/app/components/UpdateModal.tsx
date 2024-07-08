"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Product } from "@/app/interfaces/data";
import { mutate } from "swr";
import { Errors } from "@/app/interfaces/data";
import { toast } from "react-toastify";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  product: Product;
}
function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, product } = props;
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [img, setImageFile] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (product && product.id) {
      setId(product.id),
        setName(product.name),
        setImageFile(product.img),
        setPrice(product.price),
        setQuantity(product.quantity);
    }
  }, [product]);

  const handleUpdateSubmit = async (e: any) => {
    e.preventDefault();
    let errors: Errors = {};
    if (!name) {
      errors.name = "Product name is required";
    }
    if (!img) {
      errors.img = "Image is required";
    }
    if (!price) {
      errors.price = "Price is required";
    } else if (price < 0) {
      errors.price = "Enter greater than 0";
    }
    if (!quantity) {
      errors.quantity = "Quantity is required";
    } else if (quantity < 0) {
      errors.quantity = "Enter greater than 0";
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const dataUpload = {
      name,
      img,
      price,
      quantity,
    };
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUpload),
        }
      );
      const data = await res.json();
      if (data) {
        toast.success("Updated the product successfully");
        setShowModalUpdate(false);
        mutate("https://6520d291906e276284c4b0d2.mockapi.io/api/1/products");
      } else {
        toast.error("Updated product failed");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const Cancel = () => {
    setShowModalUpdate(false);
    setErrors({});
  };
  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={() => setShowModalUpdate(false)}
        backdrop="static"
        keyboard={false}
        // size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>
            Update Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>ID</Form.Label>
              <Form.Control type="text" value={id} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {errors.name && <p className="text-red-600">{errors.name}</p>}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of image"
                value={img}
                onChange={(e) => setImageFile(e.target.value)}
              />
            </Form.Group>
            {errors.img && <p className="text-red-600">{errors.img}</p>}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
              />
            </Form.Group>
            {errors.price && <p className="text-red-600">{errors.price}</p>}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e: any) => setQuantity(e.target.value)}
              />
            </Form.Group>
            {errors.quantity && (
              <p className="text-red-600">{errors.quantity}</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Cancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
