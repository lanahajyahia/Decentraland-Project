import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./MapTool.css";
import "./../../bootstrap.min.css";
const MapTool = (props) => {
  const mapRowStyle = {
    justifyContent: "center",
    color: "black",
    fontSize: "20px",
    fontWeight: "600",
    borderBottom: "1px black solid",
  };
  return (
    <Container className="modal-backdrop">
      {props.userInfo.isBuyer && (
        <Container id="currentBudget">
          Budget: {props.userInfo.budget}$
        </Container>
      )}
      <Container id="mapContainer" className="modal-backdrop">
        <Row className="mapRow" style={mapRowStyle}>
          Map
        </Row>
        {localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo")).isBuyer && (
            <Row className="mapRow" style={{ background: "var(--bs-myLand)" }}>
              {JSON.parse(localStorage.getItem("userInfo")).username}
              's Lands
            </Row>
          )}
        <Row className="mapRow" style={{ background: "var(--bs-forSale)" }}>
          For Sale
        </Row>
        <Row className="mapRow" style={{ background: "var(--bs-notForSale)" }}>
          Not For Sale
        </Row>
        <Row className="mapRow" style={{ background: "var(--bs-park)" }}>
          Park
        </Row>
        <Row className="mapRow" style={{ background: "var(--bs-street)" }}>
          Street
        </Row>
      </Container>
    </Container>
  );
};

export default MapTool;
