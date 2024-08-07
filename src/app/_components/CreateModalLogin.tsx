'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import { Errors, InputEvent, MouseEvent } from '@/app/types';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useLoginContext } from '@/app/context/UserContext';
import { getAllUser } from '@/app/services/config';

interface IProps {
  showCreateModalLogin: boolean;
  setShowCreateModalLogin: (value: boolean) => void;
}
export default function CreateModalLogin({ showCreateModalLogin, setShowCreateModalLogin }: IProps) {
  const { setLoggedIn, setUser } = useLoginContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState('password');

  const handleCreateLoginSubmit = async (e: MouseEvent) => {
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
      const data = await getAllUser();
      const user = data.find((user: any) => user.email === email && user.password === password && user.status === 'Active');
      if (user) {
        const { password, ...userWithoutPassword } = user;
        toast.success('Login successfully');
        localStorage.setItem('account', JSON.stringify(userWithoutPassword));
        setLoggedIn(true);
        setUser(userWithoutPassword);
        setShowCreateModalLogin(false);
        setEmail('');
        setPassword('');
        setShowPassword('password');
        router.push(user.role === 'admin' ? '/dashboard' : '/home');
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
    setShowPassword('password');
  };

  return (
    <>
      <Modal show={showCreateModalLogin} onHide={() => setShowCreateModalLogin(false)} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className="text-xl font-bold">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-sm font-bold">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(e: InputEvent) => setEmail(e.target.value)} />
            </Form.Group>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}

            <div className="w-full">
              <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-sm font-bold">Password</Form.Label>

                <div className="relative">
                  <Form.Control type={showPassword} placeholder="Enter Password" onChange={(e: InputEvent) => setPassword(e.target.value)} />
                  <button
                    type="button"
                    className="absolute end-0 top-0 mr-2 mt-2 rounded-e-md"
                    onClick={() => (showPassword == 'password' ? setShowPassword('text') : setShowPassword('password'))}
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
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
