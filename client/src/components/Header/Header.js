import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Decentraland</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Nav className="me-auto m-auto">
          <Nav.Link href="#Login">Login</Nav.Link>
          <Nav.Link href="#Register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
