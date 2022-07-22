import React, { useEffect, useState } from "react";
import MainScreen from "./../../components/MainScreen";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Form, Row, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "./../../bootstrap.min.css";

const RegisterPage = () => {
  // const [checked, setChecked] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  // console.log("register userInfo", userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      // go to the next page -- should be GAME
      navigate("/decentraland");
    }
  }, [navigate, userInfo]);
  const players = [
    { name: "Buyer & Seller", value: true },
    { name: "Guest", value: false },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("PASSWORD DOESN'T MATCH");
    } else {
      if (isBuyer !== null) {
        console.log("register", isBuyer);
        console.log("regis page", username, password, isBuyer);
        dispatch(register(username, password, isBuyer));
      } else {
        setMessage("use type");
      }
    }
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
          <Row>Register as:</Row>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            {players.map((radio, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={radio.name}
                checked={isBuyer === radio.value}
                onChange={() => {
                  setIsBuyer(radio.value);
                }}
              ></Form.Check>
            ))}
          </Form.Group>

          {/* <ButtonGroup className="mb-3">
            {players.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-secondary"
                name="radio"
                value={radio.value}
                checked={isBuyer === radio.value}
                onChange={(e) => setIsBuyer(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup> */}

          <Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
