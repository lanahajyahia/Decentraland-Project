import React from "react";
import "./Square.css";
import "./../../bootstrap.min.css";

// onclick + color background
const square = (props) => {
  const myStyle = {
    backgroundColor: props.backgroundColor,
  };
  return (
    <button id={props.myId} className={"square " + props.name} style={myStyle}>
      {/* TODO */}
    </button>
  );
};

export default square;
