import React, { useEffect, useState } from "react";
import axios from "axios";
import MainScreen from "./../../components/MainScreen";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Button,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const RegisterPage = () => {
  const [checked, setChecked] = useState(false);
  const [isBuyer, serIsBuyer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const players = [
    { name: "Buyer & Seller", value: "1" },
    { name: "Guest", value: "2" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword || password === "") {
      setMessage("Passwords do not match");
    } else {
      console.log(password);
      if (isBuyer) {
        setMessage(null);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          setLoading(true);

          const { data } = await axios.post(
            "/api/users",
            {
              username,
              password,
              isBuyer,
            },
            config
          );
          setLoading(false);
          localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (err) {
          setError(err.response.data.message);
          setLoading(false);
        }
      } else {
        setMessage("You must choose a type");
      }
    }

    console.log(username, isBuyer);
  };
  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Row>
            <div>Please select position in the game:</div>
          </Row>
          <br />
          <ButtonGroup className="mb-2">
            {players.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={isBuyer === radio.value}
                onChange={(e) => serIsBuyer(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
