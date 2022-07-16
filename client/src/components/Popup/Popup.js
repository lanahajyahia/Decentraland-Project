import React, { useState } from "react";
import EditLand from "../EditLand/EditLand";
import { Row } from "react-bootstrap";

import "./Popup.css";
const Popup = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const [editTrigger, setEditTrigger] = useState(false);
  const [landPopUp, setLandPopup] = useState(true);

  // console.log(
  //   "loggedUser",
  //   loggedUser.lands,
  //   props.popupItem._id,
  //   loggedUser.lands.indexOf(props.popupItem._id),
  //   loggedUser.lands.map((object) => object._id).indexOf(props.popupItem._id)
  // );
  //trigger is a true or false val to trigger the popup
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => {
            props.setClosePopupTrigger(false);
            setEditTrigger(false);
            setLandPopup(true);
          }}
        >
          X
        </button>
        {landPopUp && (
          <div id="land-popup">
            <Row id="SquareName">{props.popupItem.name}</Row>
            {(props.popupItem.name === "forSale" ||
              props.popupItem.name === "notForSale") && (
              <Row id="squarePrice">Price: {props.popupItem.price}$</Row>
            )}
            {
              /* allow edit only if user's Land */
              // same check think to remove one !
              loggedUser._id === props.popupItem.owner &&
                loggedUser.lands
                  .map((object) => object._id)
                  .indexOf(props.popupItem._id) > -1 && (
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditTrigger(true);
                      setLandPopup(false);
                    }}
                  >
                    edit
                  </button>
                )
            }
            {
              /* allow edit only if user's Land */
              loggedUser._id !== props.popupItem.owner &&
                props.popupItem.name === "forSale" &&
                loggedUser.isBuyer && (
                  <button
                    className="buy-land-btn"
                    // on click check user budget if he can buy
                    // onClick={() => props.setClosePopupTrigger(false)
                  >
                    Buy Land
                  </button>
                )
            }
          </div>
        )}
        <EditLand
          trigger={editTrigger}
          setEditTrigger={setEditTrigger}
          setLandPopup={setLandPopup}
          popupItem={props.popupItem}
        ></EditLand>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
