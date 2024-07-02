"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModalRegister(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role,setRole]=useState<string>("user");
  const [avatar, setAvatar] = useState<string>("");
  const handelCreateRegisterSubmit = async (e: any) => {
    e.preventDefault();
    if(!fullName){
      alert('You need type full name');
      return
    }
    if(!email){
        alert('You need type email');
        return
      }
    if(!avatar){
      alert('You need type image');
      return
    }
    if(!password){
      alert('You need type password');
      return
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`,
        {
          method: "POST",
          headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email,password,fullName, avatar,role }),
        }
      );
      const data = await res.json();
      if (data) {
        alert('Register successfully');
        setShowModalCreate(false);
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
          <Modal.Title style={{fontWeight:'bold'}}>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>PassWord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontWeight:'bold'}}>Avatar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL of Image"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCreate(false)}>
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
