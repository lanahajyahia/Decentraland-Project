import React, { useEffect, useState } from "react";
import "./Square.css";
import "./../../bootstrap.min.css";
import Popup from "../../components/Popup/Popup";
import axios from "axios";

// onclick + color background
const Square = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [chosenItem, setChosenItem] = useState({});
  const [sellerName, setSellerName] = useState("");

  const getSeller = async () => {
    // get seller
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let sellerId = props.item.owner;
    try {
      const { data } = await axios.get("/api/users/" + sellerId, config);
      if (data) {
        console.log("data.username", data.username);
        setSellerName(data.username);
      } else {
        setSellerName("");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("props.item", props.item);
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
          setButtonPopup(true);
          setChosenItem(props.item);
          getSeller();
        }}
        id={props.item._id}
        className={nameOfClass}
        style={myStyle}
      >
        {/* TODO */}
      </button>

      <Popup
        trigger={buttonPopup}
        setClosePopupTrigger={setButtonPopup}
        popupItem={props.item}
        setLands={props.setLands}
        setChosenItem={setChosenItem}
        sellerName={sellerName}
        setSellerName={setSellerName}
      ></Popup>
    </>
  );
};

export default Square;
