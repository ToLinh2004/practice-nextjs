'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import { Errors } from '@/app/types';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface IProps {
  showCreateModalLogin: boolean;
  setShowCreateModalLogin: (value: boolean) => void;
  onLogin: () =>void;
}
export default function CreateModalLogin({
  showCreateModalLogin,
  setShowCreateModalLogin,
  onLogin
}: IProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<string>('password');

  const handleCreateLoginSubmit = async (e: any) => {
    e.preventDefault();
    let errors: Errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`,
      );
      const data = await res.json();
      const user = data.find(
        (user: any) =>
          user.email === email &&
          user.password === password &&
          user.status === 'Active',
      );
      if (user) {
        toast.success('Login successfully');
        localStorage.setItem('account', JSON.stringify(user.role));
        onLogin();
        setShowCreateModalLogin(false);
        router.push(user.role === 'admin' ? '/dashboard' : '/login');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleCancel = () => {
    setShowCreateModalLogin(false);
    setErrors({});
    setShowPassword('password')
  };
  return (
    <>
      <Modal
        show={showCreateModalLogin}
        onHide={() => setShowCreateModalLogin(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: 'bold',
            }}
          >
            Login
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
                Email
              </Form.Label>
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
                <Form.Label
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Password
                </Form.Label>

                <div className="relative">
                  <Form.Control
                    type={showPassword}
                    placeholder="Enter Password"
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute end-0 top-0 mr-2 mt-2 rounded-e-md"
                    onClick={() =>
                      showPassword == 'password'
                        ? setShowPassword('text')
                        : setShowPassword('password')
                    }
                  >
                     <Image
                  src={showPassword === 'password' ? '/view.png' : '/hide.png'}
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
                   
                  </button>
                </div>
              </Form.Group>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
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
