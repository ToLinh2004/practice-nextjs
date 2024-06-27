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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const pathname = usePathname();
  return (
    <>
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-`}
        aria-labelledby={`offcanvasNavbarLabel-expand-`}
        placement="end"
      ></Navbar.Offcanvas>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={options.scroll}
        backdrop={options.backdrop}
        style={{ width: "180px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Management</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav.Link href="#deets">User Management</Nav.Link>
          <br />
          <Nav.Link href="/products/show">Product Management</Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar collapseOnSelect bg="primary" data-bs-theme="dark" sticky="top" style={{width:'100%'}}>
        <Container>
          <Navbar.Brand onClick={toggleShow}>Click</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <>
                   <Navbar.Brand ><Link
                    href={link.href}
                    key={link.name}
                    style={{ color: isActive ? "white" : "gray" }}
                  >
                    {link.name}
                  </Link></Navbar.Brand>
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
      </Navbar>
    </>
  );
}

export default Header;
