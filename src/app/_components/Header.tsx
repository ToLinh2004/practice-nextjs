'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import CreateModalRegister from '@/app/_components/CreateModalRegister';
import CreateModalLogin from '@/app/_components/CreateModalLogin';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showCreateModalLogin, setShowCreateModalLogin] =
    useState<boolean>(false);
  const [isLogout, setLogout] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const logOutAcount = localStorage.getItem('account');
    setLogout(!!logOutAcount);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogout(false);
    router.push('/');
  };

  const handleLogin = () => {
    setLogout(true);
  };

  return (
    <>
      <div className="sticky top-0 flex h-12 w-full flex-row rounded bg-blue-600">
        <div className="basis-3/12">
          <p className="mt-2 text-xl text-white">
            <Link
              href="/dashboard"
              className="ml-12 mt-1 no-underline hover:text-black"
            >
              CRUD
            </Link>
          </p>
        </div>
        <div className="basis-6/12">
          <input
            className="peer mt-2 block h-8 w-full rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search ..."
          />
        </div>
        <div className="ml-40 basis-2/5">
          <div className="flex flex-row-reverse">
            <button
              onClick={() =>
                currentTheme == 'dark' ? setTheme('light') : setTheme('dark')
              }
              className="mr-1 mt-2"
            >
              <Image
                src={currentTheme === 'dark' ? '/moon.png' : '/sunny.png'}
                width={20}
                height={20}
                alt="Theme icon"
                className="invert filter hover:invert-0"
              />
            </button>
            {isLogout ? (
              <button
                className="text-2sm mr-3 mt-2 text-white hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="text-2sm mr-3 mt-2 text-white"
                  onClick={() => setShowCreateModalLogin(true)}
                >
                  <p className="hover:text-black">Login</p>
                </button>
                <button
                  className="text-2sm mr-3 mt-2 text-white"
                  onClick={() => setShowModalCreate(true)}
                >
                  <p className="hover:text-black">Register</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <CreateModalRegister
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <CreateModalLogin
        showCreateModalLogin={showCreateModalLogin}
        setShowCreateModalLogin={setShowCreateModalLogin}
        onLogin={handleLogin} // Add login handler to the modal
      />
    </>
  );
}
