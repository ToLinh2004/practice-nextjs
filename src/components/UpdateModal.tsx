"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Product } from "@/app/interfaces/data";
import { mutate } from "swr";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  product: Product;
}
function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, product} = props;
  const [id,setId]=useState<number>(0)
  const [name, setName] = useState<string>("");
  const [img, setImageFile] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  useEffect(()=>{
    if(product && product.id){
      setId(product.id),
      setName(product.name),
      setImageFile(product.img),
      setPrice(product.price),
      setQuantity(product.quantity)

    }
  },[product])

  const handleUpdateSubmit = async (e: any) => {
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
      if(data){
        setShowModalUpdate(false)
        mutate("https://6520d291906e276284c4b0d2.mockapi.io/api/1/products");
      }
      
    } catch (error) {
      console.log('Error: ',error)
    }
    
  };
  return (
    <>
     <Modal
        show={showModalUpdate}
        onHide={() => setShowModalUpdate(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
      <Modal.Header closeButton>
        <Modal.Title style={{fontWeight:'bold'}}>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{fontWeight:'bold'}}>ID</Form.Label>
            <Form.Control
              type="text"
              value={id}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{fontWeight:'bold'}}>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{fontWeight:'bold'}}>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter URL of image"
              value={img}
              onChange={(e) => setImageFile(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{fontWeight:'bold'}}>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{fontWeight:'bold'}}>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e: any) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalUpdate(false)}>
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
