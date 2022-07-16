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
        <Navbar.Brand style={{ cursor: "pointer" }}>Decentraland</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        {localStorage.getItem("userInfo") && (
          <Nav className="me-auto m-auto">
            {JSON.parse(localStorage.getItem("userInfo")).isBuyer && (
              <Navbar.Brand style={{ color: "white" }}>
                {"Budget: " +
                  JSON.parse(localStorage.getItem("userInfo")).budget +
                  "$"}
              </Navbar.Brand>
            )}
            <Navbar.Brand style={{ color: "#563d7c", fontWeight: "bold" }}>
              {JSON.parse(localStorage.getItem("userInfo")).username}
            </Navbar.Brand>
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
