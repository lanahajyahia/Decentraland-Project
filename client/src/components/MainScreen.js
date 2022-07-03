import React from "react";
import "./MainScreen.css";
import { Container, Row } from "react-bootstrap";
// title is the main title and children is the data under it{the screen we are in }
const MainScreen = ({ title, children }) => {
  return (
    <div className="mainBack">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
