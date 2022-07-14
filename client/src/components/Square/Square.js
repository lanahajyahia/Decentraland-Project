import React from "react";
import "./Square.css";
import "./../../bootstrap.min.css";
// onclick + color background
const square = (props) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const myStyle = {
    backgroundColor: "",
  };
  let nameOfClass = "square ";
  if (
    userInfo._id === props.item.owner &&
    (props.item.name === "forSale" || props.item.name === "notForSale")
  ) {
    nameOfClass += props.item.name + " myLand";
    myStyle["backgroundColor"] = "var(--bs-myLand)";
  } else {
    nameOfClass += props.item.name;
    myStyle["backgroundColor"] = props.item.color;
  }

  return (
    <>
      <button
        onClick={() => {
          props.setOpenPopupTrigger(true);
          props.setClickedItem(props.item);
        }}
        id={props.item._id}
        className={nameOfClass}
        style={myStyle}
      >
        {/* TODO */}
      </button>
    </>
  );
};

export default square;
