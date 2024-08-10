'use client';
import { useLoginContext } from '@/app/context/UserContext';
import { updateUser } from '@/app/services/config';
import { InputEvent, MouseEvent, Errors, User } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';

export default function AdminProfile() {
  const { user, setUser, loggedIn } = useLoginContext();
  const id = user.id;
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [email, setEmail] = useState<string>(user.email);
  const [address, setAddress] = useState<string>(user.address);
  const [phone, setPhone] = useState<string>(user.phone);
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [errors, setErrors] = useState<Errors>({});
  const role = user.role;
  const status = user.status;
  const [file, setImageFile] = useState<File | undefined>(undefined);

  const handleUpdateSubmit = async (e: MouseEvent) => {
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
      errors.phone = 'Please provide a valid phone number';
    }
    if (!address) {
      errors.address = 'Address is required';
    }

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/gif'];
      const maxSize = 100000;

      if (!allowedTypes.includes(file.type)) {
        errors.file = 'Please upload PNG, JPG, SVG, WEBP, or GIF images.';
      }

      if (file.size > maxSize) {
        errors.file = 'File size too large. Maximum size is 1 MB.';
      }
    }

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const dataUser: User = { id, fullName, email, address, phone, avatar, role, status };

    try {
      const res = await updateUser(id, dataUser);
      if (res) {
        toast.success('Updated the profile successfully');
        localStorage.setItem('account', JSON.stringify(dataUser));
        setUser(dataUser);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6, // Điều chỉnh chất lượng theo nhu cầu
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatar(reader.result as string);
            setImageFile(result as File);
          };
          reader.readAsDataURL(result as File);
        },
        error(err) {
          console.error('Compression error:', err);
        },
      });
    }
  };

  return (
    <>
      {loggedIn ? (
        <>
          <p className="ml-10 mt-20 text-2xl text-blue-600 dark:text-white">Personal information</p>
          <div className="ml-10 mt-4 rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md">
            <b className="mb-6 block text-2xl text-blue-600">About me</b>
            <div className="flex">
              <div className="flex w-1/3 flex-col items-center">
                <Image src={avatar} width={200} height={200} alt="Avatar" className="mb-2 h-36 w-36 rounded-full object-cover" />
                <label
                  htmlFor="uploadFile1"
                  className="flex h-52 w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white font-[sans-serif] text-base font-semibold text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 w-11 fill-gray-500" viewBox="0 0 32 32">
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000"
                    />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000"
                    />
                  </svg>
                  Upload file
                  <input type="file" id="uploadFile1" className="hidden" onChange={handleImageUpload} />
                  {errors.file && <p className="mt-2 text-red-600">{errors.file}</p>}
                  <p className="mt-2 text-xs font-medium text-gray-400">PNG, JPG, SVG, WEBP, and GIF are allowed.</p>
                </label>
              </div>
              <div className="w-2/3 pl-8">
                <form className="w-full">
                  <div className="mb-4">
                    <div className="flex w-full items-center">
                      <label className="w-1/3 text-xl">Full Name:</label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                        value={fullName}
                        onChange={(e: InputEvent) => setFullName(e.target.value)}
                      />
                    </div>
                    {errors.fullName && <p className="ml-52 mt-1 text-red-600">{errors.fullName}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex w-full items-center">
                      <label className="w-1/3 text-xl">Email:</label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                        value={email}
                        onChange={(e: InputEvent) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <p className="ml-52 mt-1 text-red-600">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex w-full items-center">
                      <label className="w-1/3 text-xl">Phone:</label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                        value={phone}
                        onChange={(e: InputEvent) => setPhone(e.target.value)}
                      />
                    </div>
                    {errors.phone && <p className="ml-52 mt-1 text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex w-full items-center">
                      <label className="w-1/3 text-xl">Address:</label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                        value={address}
                        onChange={(e: InputEvent) => setAddress(e.target.value)}
                      />
                    </div>
                    {errors.address && <p className="ml-52 mt-1 text-red-600">{errors.address}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex w-full items-center">
                      <label className="w-1/3 text-xl">Status:</label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
                        value={user.status}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex w-full items-center">
                    <label className="w-3/12 text-xl"></label>
                    <button type="submit" className="mr-4 w-20 rounded bg-blue-600 px-2 text-xl text-white" onClick={handleUpdateSubmit}>
                      Save
                    </button>
                    <button type="button" className="w-20 rounded bg-gray-300 px-2 text-xl text-white">
                      <Link href="/dashboard">Back</Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
