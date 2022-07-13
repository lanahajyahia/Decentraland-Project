import React from "react";
import "./Square.css";
import "./../../bootstrap.min.css";
// onclick + color background
const square = (props) => {
  const myStyle = {
    backgroundColor: props.item.color,
  };
  return (
    <>
      <button
        onClick={() => {
          props.setOpenPopupTrigger(true);
          props.setClickedItem(props.item);
        }}
        id={props.item._id}
        className={"square " + props.item.name}
        style={myStyle}
      >
        {/* TODO */}
      </button>
    </>
  );
};

export default square;
