import React from "react";
import { Container } from "react-bootstrap";
import Square from "../../components/Square/Square";

const Decentraland = (x, y) => {
  function renderSquare(x, y) {
    return (
      <div className="boardRow">
        <Square />
      </div>
    );
  }
  return (
    <Container
      style={{
        position: "absolute",
        // top: "20%",
        left: "20%",
        marginLeft: "-50px",
        width: "100%",
        height: "100%",
      }}
    >
      {renderSquare(0, 0)}
    </Container>
  );
};

export default Decentraland;
