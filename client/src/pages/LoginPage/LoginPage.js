import React from "react";
import MainScreen from "./../../components/MainScreen";
import { Form, Container, Row } from "react-bootstrap";

const LoginPage = () => {
  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              //   value={username}
              placeholder="Enter username"
              //   onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              //   value={password}
              placeholder="Enter password"
              //   onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
