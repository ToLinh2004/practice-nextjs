"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import CreateModalRegister from "@/app/components/CreateModalRegister";
import CreateModalLogin from "@/app/components/CreateModalLogin";

function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showCreateModalLogin, setShowCreateModalLogin] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row bg-blue-600 h-12 rounded sticky top-0">
        <div className="basis-3/12">
          <p className="text-white uppercase text-xl mt-2">
            <Link href="/admin" className="text-white no-underline ml-12 mt-1">
              CRUD
            </Link>
          </p>
        </div>
        <div className="basis-6/12">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500 h-8 mt-2"
            placeholder="Search ..."
          />
        </div>

        <div className="basis-2/5 ml-40">
          <div className="flex flex-row-reverse ">
            <button
              onClick={() => currentTheme == "dark"? setTheme('light'): setTheme("dark")}
              className="mr-1 mt-2"
            >
              {" "}
              {currentTheme === "dark" ? (
                <Image
                src="/moon.png"
                width={20}
                height={20}
                alt="Picture of the author"
                style={{ filter: "brightness(0) invert(1)" }}
              />
                
              ) : (
                <Image
                  src="/sunny.png"
                  width={20}
                  height={20}
                  alt="Picture of the author"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </button>

            <button
              className="text-white text-2sm mt-2 mr-3"
              onClick={() => setShowCreateModalLogin(true)}
            >
              Login
            </button>
            <button
              className="text-white text-2sm mt-2 mr-3"
              onClick={() => setShowModalCreate(true)}
            >
              Register
            </button>
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
      />
    </>
  );
}

export default Header;
