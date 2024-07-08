"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import { Errors } from "@/app/interfaces/data";
import { toast } from "react-toastify";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}


function CreateModalRegister(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [avatar, setAvatar] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oGwl4-Bbo1KGYjb1HxkrfHq7_Chxpyn0oA&s"
  );
  const [status, setStatus] = useState<string>("Active");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<string>("password");
  const handelCreateRegisterSubmit = async (e: any) => {
    e.preventDefault();
    let errors: Errors = {};
    if (!fullName) {
      errors.fullName = "Full Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Confirm password does not match password";
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`
      );
      const data = await res.json();
      console.log(data);
      const user = data.find((user: any) => user.email === email);
      if (user) {
        errors.email = "Email already exists";
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
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
        toast.success("Register successdully");
        setShowModalCreate(false);
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
            {errors.fullName && (
              <p className="text-red-600">{errors.fullName}</p>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Group>
            {errors.email && <p className="text-red-600">{errors.email}</p>}
            <div className="w-full">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>

                <div className="relative">
                  <Form.Control
                    type={showPassword}
                    placeholder="Enter Password"
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-0 end-0 mr-2 mt-2 rounded-e-md"
                    onClick={() =>
                      showPassword == "password"
                        ? setShowPassword("text")
                        : setShowPassword("password")
                    }
                  >
                    {showPassword === "password" ? (
                      <Image
                        src="/view.png"
                        alt=""
                        width={20}
                        height={20}
                        className=""
                      />
                    ) : (
                      <Image
                        src="/hide.png"
                        alt=""
                        width={20}
                        height={20}
                        className=""
                      />
                    )}
                  </button>
                </div>
              </Form.Group>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
            <div className="w-full">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>
                Confirm Password
              </Form.Label>

                <div className="relative">
                <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
                  <button
                    type="button"
                    className="absolute top-0 end-0 mr-2 mt-2 rounded-e-md"
                    onClick={() =>
                      showPassword == "password"
                        ? setShowPassword("text")
                        : setShowPassword("password")
                    }
                  >
                    {showPassword === "password" ? (
                      <Image
                        src="/view.png"
                        alt=""
                        width={20}
                        height={20}
                        className=""
                      />
                    ) : (
                      <Image
                        src="/hide.png"
                        alt=""
                        width={20}
                        height={20}
                        className=""
                      />
                    )}
                  </button>
                </div>
              </Form.Group>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
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
