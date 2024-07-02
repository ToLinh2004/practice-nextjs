"use client";
import { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Product } from "@/app/interfaces/data";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DetailProduct({ params }: { params: { id: number } }) {
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
  }, [params.id]);

  const getDetailProduct = async () => {
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/products/${params.id}`
      );
      const product = await res.json();
      setProduct(product);
    } catch (error) {
      throw new Error("Fetching data fail");
    }
  };

  const turnBack = () => {
    router.back();
  };
  
  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6} style={{ border: "2px solid black", paddingLeft: "10" }}>
            <Form style={{ margin: "20px" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "px",
                }}
              >
                Detail Product
              </h1>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={product.id}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>
                  Product Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={product.name}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>Image</Form.Label>
                <Image
                  src={product.img}
                  rounded
                  alt=""
                  width={200}
                  height={150}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={product.price}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  value={product.quantity}
                  readOnly
                />
              </Form.Group>
              <Button variant="primary" onClick={turnBack}>
                Turn Back
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailProduct;
