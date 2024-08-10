'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHome, faEnvelope, faUser, faCommenting } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import { FormEvent, Errors } from '@/app/types';
import { createContact } from '@/app/services/config';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const status = 'Not replied';
  const [errors, setErrors] = useState<Errors>({});

  const sendEmail = async (e: FormEvent) => {
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
    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!phone.match(/^[0-9]{10}$/)) {
      errors.phone = 'Please provide valid phone number';
    }
    if (!message) {
      errors.message = 'Message is required';
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const templateParam = {
      full_name: fullName,
      from_name: email,
      to_name: 'nguyenthilinhqni2020@gmail.com',
      phone: phone,
      message,
    };
    try {
      const emailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
        templateParam,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      );

      console.log('SUCCESS!', emailResponse.status, emailResponse.text);

      const res = await createContact(fullName, phone, email, message, status);
      if (res) {
        toast.success('Send feedback successfully');
      } else {
        toast.error('Send email failed');
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('Failed to send feedback');
    }
  };
  return (
    <section className="static">
      <div className="bg-green-contact-us absolute left-0 mb-40 mt-16 flex h-40 w-full items-center justify-center">
        <p className="text-4xl text-white">WE ARE READY TO ASSIST YOU IN 24/7</p>
      </div>
      <div className="h-86 fixed mt-80 flex rounded bg-white">
        <div className="w-100 ml-4">
          <b className="text-xl text-blue-600">CONTACT US</b>
          <form onSubmit={sendEmail}>
            <div
              className={
                errors.fullName
                  ? 'my-2 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
                  : 'mt-4 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
              }
            >
              <FontAwesomeIcon icon={faUser} className="mx-2 text-blue-600" />
              <input type="text" placeholder="Full Name" className="mt-1 outline-none" onChange={(e) => setFullName(e.target.value)} />
            </div>
            {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
            <div
              className={
                errors.email
                  ? 'my-2 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
                  : 'mt-4 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
              }
            >
              <FontAwesomeIcon icon={faEnvelope} className="mx-2 text-blue-600" />
              <input type="text" placeholder="Email" className="outline-none" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errors.email && <p className="text-red-600">{errors.email}</p>}
            <div
              className={
                errors.phone
                  ? 'my-2 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
                  : 'mt-4 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
              }
            >
              <FontAwesomeIcon icon={faPhone} className="mx-2 text-blue-600" />
              <input type="text" placeholder="Phone" className="outline-none" onChange={(e) => setPhone(e.target.value)} />
            </div>
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            <div
              className={
                errors.message
                  ? 'my-2 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
                  : 'mt-4 flex h-12 items-center border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none'
              }
            >
              <FontAwesomeIcon icon={faCommenting} className="mx-2 text-blue-600" />
              <textarea placeholder="Message" className="h-7 w-full bg-white outline-none" onChange={(e) => setMessage(e.target.value)} />
            </div>
            {errors.message && <p className="text-red-600">{errors.message}</p>}
            <input type="submit" value="Submit" className="mt-4 w-full bg-blue-600 p-2 text-white" />
          </form>
        </div>

        <div className="w-100 ml-24">
          <p className="mb-2 mt-1 text-2xl">We are here to help you always...</p>
          <p>
            There are many variations of passages of Lorem Ipsum available,
            <br />
            but the majority have suffered alteration in some form, buying to many desktop publishing packages.
          </p>
          <div className="mb-3 mt-2 flex flex-row">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-blue-600">
              <FontAwesomeIcon icon={faHome} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <b>Address: </b>
              <br />
              <p>Lê Đình Chiểu - Sơn Trà- Đà Nẵng</p>
            </div>
          </div>
          <div className="mb-3 flex flex-row">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-blue-600">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <b>Email: </b>
              <br />
              <p>toling123@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-blue-600">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <b>Call Us: </b>
              <br />
              <p>+84 94 - 6928 - 517</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
