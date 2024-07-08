"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { mutate } from "swr";
import { Errors } from "@/app/interfaces/data";
import { toast } from "react-toastify";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateProductModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const [name, setName] = useState<string>("");
  const [img, setImageFile] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  const handelCreateSubmit = async (e: any) => {
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
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, img, price, quantity }),
        }
      );
      const data = await res.json();
      if (data) {
        toast.success("Create the product successfully");
        setShowModalCreate(false);
        mutate("https://6520d291906e276284c4b0d2.mockapi.io/api/1/products");
      } else {
        toast.error("Create the product that failed");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const Cancel = () => {
    setShowModalCreate(false);
    setErrors({});
  };
  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
        backdrop="static"
        keyboard={false}
        // size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>
            Create Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {errors.name && <p className="text-red-600">{errors.name}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of image"
                onChange={(e) => setImageFile(e.target.value)}
              />
            </Form.Group>
            {errors.img && <p className="text-red-600">{errors.img}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                onChange={(e: any) => setPrice(e.target.value)}
              />
            </Form.Group>
            {errors.price && <p className="text-red-600">{errors.price}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
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
          <Button variant="primary" onClick={handelCreateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProductModal;
