import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Decentraland</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        {localStorage.getItem("userInfo") && (
          <Nav className="me-auto m-auto">
            <Nav.Link
              onClick={logoutHandler}
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
