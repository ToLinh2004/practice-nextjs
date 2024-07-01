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
  return (
    <>
      <div className="flex flex-row bg-blue-600 h-14 sticky top-0">
        <div className="basis-3/12">
        <p className="text-white uppercase text-2xl mt-2"><Link href='/'>CRUD</Link></p>
        </div>
        <div className="basis-6/12">
          <input
            type="search"
            placeholder="search ...."
            className="h-10 w-50 mt-2 rounded-lg"
          />
        </div>

        <div className="basis-1/12">
          <div className="flex flex-row-reverse ">
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

            <p className="text-white uppercase text-2xl mt-2"><Link href='/'>Login</Link></p>
          </div>
        </div>
      </div>
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
