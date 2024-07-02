"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

interface IProps {
    showCreateModalLogin: boolean;
    setShowCreateModalLogin: (value: boolean) => void;
}
function CreateModalLogin(props: IProps) {
  const { showCreateModalLogin, setShowCreateModalLogin } = props;
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassWord] = useState<string>("");
  const handleCreateLoginSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      alert("You need type email");
      return;
    }
    if (!password) {
      alert("You need type password");
      return;
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`
      );
      const data = await res.json();
      console.log(data);
      const user = data.find(
        (user: any) =>
          user.email === email &&
          user.password === password 
      );
      console.log("user", user);
      if (user.role === 'admin') {
        alert('Login successfully')
        setShowCreateModalLogin(false);
        router.push('/admin');
      }
      else{
        alert('Login successfully')
        setShowCreateModalLogin(false);
        router.push('/user')
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <Modal
        show={showCreateModalLogin}
        onHide={() => setShowCreateModalLogin(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>PassWord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e: any) => setPassWord(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModalLogin(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateLoginSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalLogin;
