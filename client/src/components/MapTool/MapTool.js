import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./MapTool.css";
import "./../../bootstrap.min.css";
const MapTool = () => {
  return (
    <Container id="mapContainer" className="modal-backdrop">
      <Row
        className="mapRow"
        style={{
          justifyContent: "center",
          color: "black",
          fontSize: "20px",
          fontWeight: "600",
          borderBottom: "1px black solid",
        }}
      >
        Map
      </Row>
      <Row className="mapRow" style={{ background: "var(--bs-myLand)" }}>
        {localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo")).username}
        's Lands
      </Row>
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
  );
};

export default MapTool;
