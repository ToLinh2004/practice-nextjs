"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateModalRegister from "@/components/CreateModalRegister";
import CreateModalLogin from "@/components/CreateModalLogin";
const navLinks = [
  { name: "CRUD", href: "/" },
  { name: "User", href: "/" },
  { name: "Product", href: "/products/show" },
];
const options = {
  name: "Disable backdrop",
  scroll: false,
  backdrop: false,
};

function Header() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showCreateModalLogin, setShowCreateModalLogin] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row bg-blue-600 h-12 rounded-sm sticky top-0">
        <div className="basis-3/12">
          <p className="text-white uppercase text-2sm mt-2">
            <Link href="/admin" className="text-white no-underline ml-2">CRUD</Link>
          </p>
        </div>
        <div className="basis-6/12">
          <input
            type="search"
            placeholder="search ...."
            className="h-8 w-80 mt-2 rounded-sm"
          />
        </div>

        <div className="basis-2/5 ml-60">
          <div className="flex flex-row-reverse ">
            <button
              onClick={() => {
                setTheme(resolvedTheme === "light" ? "dark" : "light");
              }}
              type="submit"
              className="mr-1"
            >
              {" "}
              {theme === "light" ? (
                <Image
                  src="/sunny.png"
                  width={20}
                  height={20}
                  alt="Picture of the author"
                />
              ) : (
                <Image
                  src="/moon.png"
                  width={20}
                  height={20}
                  alt="Picture of the author"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </button>

            <button
              className="text-white uppercase text-2sm mt-2 mr-3"
              onClick={() => setShowCreateModalLogin(true)}
            >
              Login
            </button>
            <button
              className="text-white uppercase text-2sm mt-2 mr-3"
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
      {/* <Navbar collapseOnSelect bg="primary" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <>
                    <Navbar.Brand>
                      <Link
                        href={link.href}
                        key={link.name}
                        style={{ color: isActive ? "white" : "gray" }}
                      >
                        {link.name}
                      </Link>
                    </Navbar.Brand>
                  </>
                );
              })}
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Login</Nav.Link>
              <button
                onClick={() => {
                  setTheme(resolvedTheme === "light" ? "dark" : "light");
                }}
                type="submit"
              >
                {" "}
                {theme === "light" ? (
                  <Image
                    src="/sunny.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                ) : (
                  <Image
                    src="/moon.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                )}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
}

export default Header;
