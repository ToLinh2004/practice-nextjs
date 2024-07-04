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
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleCreateLoginSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setErrorEmail("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail("Email is invalid");
      return;
    }
    if (!password) {
      setErrorPassword("Password is required");
      return;
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`
      );
      const data = await res.json();
      const user = data.find(
        (user: any) =>
          user.email === email &&
          user.password === password &&
          user.status === "Active"
      );
      if (user) {
        alert("Login successfully");
        setShowCreateModalLogin(false);
        router.push(user.role === "admin" ? "/admin" : "/user");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const Cancel = () =>{
    setShowCreateModalLogin(false);
    setErrorEmail('');
    setErrorPassword('');
  }
  return (
    <>
      <Modal
        show={showCreateModalLogin}
        onHide={() => setShowCreateModalLogin(false)}
        backdrop="static"
        keyboard={false}
        // size="md"
      >
        <Modal.Header>
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
            {errorEmail && <p className="text-red-600">{errorEmail}</p>}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e: any) => setPassWord(e.target.value)}
              />
            </Form.Group>
            {errorPassword && <p className="text-red-600">{errorPassword}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={Cancel}
          >
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
