// "use client";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
// const options = {
//   name: "Disable backdrop",
//   scroll: false,
//   backdrop: false,
// };

// function SideBar() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const toggleShow = () => setShow((s) => !s);

//   return (
//     <>
//       <Navbar.Offcanvas
//         id={`offcanvasNavbar-expand-`}
//         aria-labelledby={`offcanvasNavbarLabel-expand-`}
//         placement="end"
//       ></Navbar.Offcanvas>
//       <Offcanvas
//         show={show}
//         onHide={handleClose}
//         scroll={options.scroll}
//         backdrop={options.backdrop}
//         style={{ width: "180px"}}
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Management</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Nav.Link href="#deets">User Management</Nav.Link>
//           <br />
//           <Nav.Link href="/products/show">Product Management</Nav.Link>
//         </Offcanvas.Body>
//       </Offcanvas>
//       <Navbar collapseOnSelect bg="primary" data-bs-theme="dark"  sticky="top">
//         <Container>
//         <Navbar.Brand  onClick={toggleShow}>Click</Navbar.Brand>
//           <Navbar.Brand href="/">CRUD</Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto">
//             <Nav.Link href="#pricing">User</Nav.Link>
//               <Nav.Link style={{color:'white'}}href="/products/show">Product</Nav.Link>
           
//             </Nav>
//             <Nav>
//               <Nav.Link href="#deets">Login</Nav.Link>
//               <Nav.Link eventKey={2} href="#memes">
//                 Dank them
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default SideBar;
