'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHome, faEnvelope, faUser, faCommenting } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import { FormEvent, Errors } from '@/app/types';
import { createContact } from '@/app/services/config';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import TitilePage from '@/app/_components/Titile';
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
        mutate('https://65200b03906e276284c3f31a.mockapi.io/contacts');
      } else {
        toast.error('Send email failed');
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('Failed to send feedback');
    }
  };
  return (
    <>
      <TitilePage name="Contact Us " />

      <div className="bg-green-contact-us mt-16 flex h-40 w-full items-center justify-center sm:text-xl">
        <p className="mt-5 text-4xl text-white sm:text-xl">WE ARE READY TO ASSIST YOU 24/7</p>
      </div>
      <div className="mx-10 grid grid-cols-4 sm:mx-4 sm:grid-cols-1">
        <div></div>
        <div className="mt-6">
          <form onSubmit={sendEmail}>
            <div className="mt-4 flex h-10 items-center rounded-md border-1  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <FontAwesomeIcon icon={faUser} className="mx-2 text-blue-600" />
              <input
                type="text"
                placeholder="Full Name"
                className="flex-grow bg-transparent outline-none"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {errors.fullName && <p className="text-red-600 sm:text-sm">{errors.fullName}</p>}

            <div className="mt-4 flex h-10 items-center rounded-md border-1  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <FontAwesomeIcon icon={faEnvelope} className="mx-2 text-blue-600" />
              <input type="email" placeholder="Email" className="flex-grow bg-transparent outline-none" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errors.email && <p className="text-red-600 sm:text-sm">{errors.email}</p>}

            <div className="mt-4 flex h-10 items-center rounded-md border-1  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <FontAwesomeIcon icon={faPhone} className="mx-2 text-blue-600" />
              <input type="text" placeholder="Phone" className="flex-grow bg-transparent outline-none" onChange={(e) => setPhone(e.target.value)} />
            </div>
            {errors.phone && <p className="text-red-600 sm:text-sm">{errors.phone}</p>}

            <div className="mt-4 flex items-center rounded-md border-1  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <FontAwesomeIcon icon={faCommenting} className="mx-2 text-blue-600" />
              <textarea placeholder="Message" className="mt-3 w-full bg-transparent outline-none" onChange={(e) => setMessage(e.target.value)} />
            </div>
            {errors.message && <p className="text-red-600 sm:text-sm">{errors.message}</p>}

            <button type="submit" className="mt-4 w-full rounded-md bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>

        <div className="mt-2 pl-8 pt-8 sm:pl-0 sm:pt-0">
          <p className="sm:text-md mb-2 text-2xl font-bold">We are here to help you always...</p>
          <p className="sm:font-sans sm:text-sm">
            We'd love to hear your vision. Our Shop experts will reach out to you during business hours to discuss making it happen.
          </p>
          <div className="mb-3 mt-2 flex items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-blue-600 hover:bg-white">
              <FontAwesomeIcon icon={faHome} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold">Address:</p>
              <p className="text-sm">Lê Đình Chiểu - Sơn Trà - Đà Nẵng</p>
            </div>
          </div>
          <div className="mb-3 flex items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-blue-600 hover:bg-white">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold">Email:</p>
              <p className="text-sm">toling123@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-blue-600 hover:bg-white">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold">Call Us:</p>
              <p className="text-sm">+84 94 - 6928 - 517</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
