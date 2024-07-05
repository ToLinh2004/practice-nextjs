"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModalRegister(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [avatar, setAvatar] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [errorFullName, setErrorFullName] = useState("");
  const [errorAvatar, setErrorAvatar] = useState("");

  const [errorEmail, setErrorEmail] = useState("");

  const [errorPassword, setErrorPassword] = useState("");

  const handelCreateRegisterSubmit = async (e: any) => {
    e.preventDefault();
    if (!fullName) {
      setErrorFullName("Full Name is required");
      return;
    }
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
    } else if(password.length <6){
      setErrorPassword("Password must be more than 6 characters");
      return;
    }
    if (!avatar) {
      setErrorAvatar("Avatar is required");
      return;
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`
      );
      const data = await res.json();
      console.log(data);
      const user = data.find((user: any) => user.email === email);
      if (user) {
        alert("Email already exists");
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            fullName,
            avatar,
            role,
            status,
          }),
        }
      );
      const data = await res.json();
      if (data) {
        alert("Register successfully");
        setShowModalCreate(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const Cancel = () => {
    setShowModalCreate(false);
    setErrorAvatar(""),
      setErrorEmail(""),
      setErrorFullName(""),
      setErrorPassword("");
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
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold" }}>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            {errorFullName && <p className="text-red-600">{errorFullName}</p>}
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
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Group>
            {errorPassword && <p className="text-red-600">{errorPassword}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Avatar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of Image"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Form.Group>
            {errorAvatar && <p className="text-red-600">{errorAvatar}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Cancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handelCreateRegisterSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalRegister;
