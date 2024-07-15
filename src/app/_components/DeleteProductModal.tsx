'use client';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Product } from '@/app/types';
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { deleteProduct } from '@/app/services/config';

interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  product: Product;
}
export default function DeleteProductModal({
  showModalDelete,
  setShowModalDelete,
  product,
}: IProps) {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [img, setImageFile] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  useEffect(() => {
    if (product && product.id) {
      setId(product.id),
        setName(product.name),
        setImageFile(product.img),
        setPrice(product.price),
        setQuantity(product.quantity);
    }
  }, [product]);
  const handleDelete = async () => {
    try {
      const res = await deleteProduct(id);
      if (res) {
        toast.success('Deleted product successfully');
        setShowModalDelete(false);
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleCancel = () => {
    setShowModalDelete(false);
  };
  return (
    <>
      <Modal
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontWeight: 'bold',
            }}
          >
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontWeight: 'bold',
                }}
              >
                ID
              </Form.Label>
              <Form.Control type="text" value={id} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontWeight: 'bold',
                }}
              >
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontWeight: 'bold',
                }}
              >
                Image
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of image"
                value={img}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontWeight: 'bold',
                }}
              >
                Price
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontWeight: 'bold',
                }}
              >
                Quantity
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
