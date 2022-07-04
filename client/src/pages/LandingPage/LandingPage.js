import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  // check if there's something inside our local storage
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     // console.log(history.push("/myDecentraland"));
  //     // go to the next page -- should be GAME
  //     history.push("/myDecentraland");
  //   }
  // }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Lana's Decentraland</h1>
              <p className="subtitle">
                You can buy and sell assets and play games
              </p>
              <div className="buttonContainer">
                <a href="/Login">
                  <Button size="lg" className="landingButton">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                  >
                    Register
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
