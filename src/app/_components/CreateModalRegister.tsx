'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import { Errors, InputEvent, MouseEvent, User } from '@/app/types';
import { toast } from 'react-toastify';
import { useLoginContext } from '@/app/context/UserContext';
import { getAllUser } from '@/app/services/config';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

export default function CreateModalRegister({ showModalCreate, setShowModalCreate }: IProps) {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const role = 'user';
  const avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oGwl4-Bbo1KGYjb1HxkrfHq7_Chxpyn0oA&s';
  const status = 'Active';

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<string>('password');
  const [confirmShowpassword, setShowConfirmPassword] = useState<string>('password');
  const { setLoggedIn, setUser } = useLoginContext();
const { language } = useLanguage();

  const handelCreateRegisterSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    const errors: Errors = {};
    if (!fullName) {
      errors.fullName = 'Full Name is required';
    }
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
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Confirm password does not match password';
    }
    try {
      const data = await getAllUser();
      console.log(data);
      const user = data.find((user: User) => user.email === email);
      if (user) {
        errors.email = 'Email already exists';
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const res = await fetch(`https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          avatar,
          role,
          status,
        }),
      });
      const data = await res.json();
      if (data) {
        toast.success('Register successdully');
        setShowModalCreate(false);
        localStorage.setItem('account', JSON.stringify(data));
        setLoggedIn(true);
        setUser(data);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const hanldeCancel = () => {
    setShowModalCreate(false);
    setErrors({});
    setShowPassword('password');
    setShowConfirmPassword('password');
  };

  return (
    <>
      <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className="text-xl font-bold">{language === 'en' ? 'Register' : 'Đăng ký'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-sm font-bold">{language === 'en' ? 'Full Name' : 'Họ và tên'}</Form.Label>
              <Form.Control type="text" placeholder={language === 'en' ? "Enter Full Name": "Nhập Họ Và Tên"} onChange={(e: InputEvent) => setFullName(e.target.value)} />
            </Form.Group>
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-sm font-bold">Email</Form.Label>
              <Form.Control type="email" placeholder={language ==='em' ? "Enter Email": "Nhập email"} onChange={(e: InputEvent) => setEmail(e.target.value)} />
            </Form.Group>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            <div className="w-full">
              <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-sm font-bold">{language === 'en' ? 'Password' : 'Mật khẩu'}</Form.Label>

                <div className="relative">
                  <Form.Control type={showPassword} placeholder={language === 'en' ? "Enter Password": "Nhập mật khẩu"} onChange={(e: InputEvent) => setPassword(e.target.value)} />
                  <button
                    type="button"
                    className="absolute end-0 top-0 mr-2 mt-2 rounded-e-md"
                    onClick={() => setShowPassword(showPassword == 'password' ? 'text' : 'password')}
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
            <div className="w-full">
              <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-sm font-bold">{language === 'en' ? 'Confirm Password' : 'Xác nhận mật khẩu'}</Form.Label>

                <div className="relative">
                  <Form.Control
                    type={confirmShowpassword}
                    placeholder={language === 'en' ? "Enter password" :'Xác nhận mật khẩu'}
                    onChange={(e: InputEvent) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute end-0 top-0 mr-2 mt-2 rounded-e-md"
                    onClick={() => setShowConfirmPassword(confirmShowpassword == 'password' ? 'text' : 'password')}
                  >
                    <Image
                      src={confirmShowpassword === 'password' ? '/view.png' : '/hide.png'}
                      alt={confirmShowpassword ? 'Hide Password' : 'Show Password'}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </Form.Group>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hanldeCancel}>
            {language === 'en' ? 'Cancel' : 'Hủy'}
          </Button>
          <Button variant="primary" onClick={handelCreateRegisterSubmit}>
            {language === 'en' ? 'Register' : 'Đăng ký'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
