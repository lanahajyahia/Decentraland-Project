import React, { useEffect, useState } from "react";
import axios from "axios";
import MainScreen from "./../../components/MainScreen";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
import { Link } from "react-router-dom";
// import { Route , withRouter} from 'react-router-dom';

import "./LoginPage.css";
import { Form, Row, Button, Col } from "react-bootstrap";

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // check if there's something inside our local storage
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     // console.log(history.push("/myDecentraland"));
  //     // go to the next page -- should be GAME
  //     history.push("/myDecentraland");
  //   }
  // }, [history]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      // destructre only data from what we get
      const { data } = await axios.post(
        "/api/users/login",
        {
          username,
          password,
        },
        config
      );
      console.log("data", data);
      // local storage cannot store object data - only string
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };
  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {" "}
            New Customer? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
