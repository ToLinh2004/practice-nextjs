"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [img, setImageFile] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const handelCreateSubmit = async (e: any) => {
    e.preventDefault();
    if(!name){
      alert('You need type name');
      return
    }
    if(!img){
      alert('You need type image');
      return
    }
    if(!price){
      alert('You need type price');
      return
    }
    if(!quantity){
      alert('You need type quantity');
      return
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/`,
        {
          method: "POST",
          headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, img, price, quantity }),
        }
      );
      const data = await res.json();
      if (data) {
        setShowModalCreate(false);
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products')
      }
    } catch (error) {
      console.log("Error: ",error);
    }
  };
  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:'bold'}}>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of image"
                onChange={(e) => setImageFile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                onChange={(e: any) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                onChange={(e: any) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCreate(false)}>
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

export default CreateModal;
