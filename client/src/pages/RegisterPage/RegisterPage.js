import React, { useEffect, useState } from "react";
import MainScreen from "./../../components/MainScreen";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Form, Row, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterPage = () => {
  // const [checked, setChecked] = useState(false);
  const [isBuyer, serIsBuyer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      // console.log(history.push("/myDecentraland"));
      // go to the next page -- should be GAME
      navigate("/decentraland");
    }
  }, [navigate, userInfo]);
  const players = [
    { name: "Buyer & Seller", value: "1" },
    { name: "Guest", value: "2" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("PASSWORD DOESNT MATC");
    } else {
      if (isBuyer) {
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
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
