import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Decentraland</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        {localStorage.getItem("userInfo") && (
          <Nav className="me-auto m-auto">
            <Nav.Link
              onClick={() => {
                localStorage.removeItem("userInfo");
                navigate("/");
              }}
              // href="#logout"
            >
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
