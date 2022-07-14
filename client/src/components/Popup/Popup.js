import React, { useState } from "react";
import EditLand from "../EditLand/EditLand";
import "./Popup.css";
const Popup = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const [editTrigger, setEditTrigger] = useState(false);
  console.log(
    "loggedUser",
    loggedUser.lands,
    props.popupItem._id,
    loggedUser.lands.indexOf(props.popupItem._id),
    loggedUser.lands.map((object) => object._id).indexOf(props.popupItem._id)
  );
  //trigger is a true or false val to trigger the popup
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div id="land-popup">
          <button
            className="close-btn"
            onClick={() => props.setClosePopupTrigger(false)}
          >
            X
          </button>
          <div>Name {props.popupItem.name}</div>
          <div>Price {props.popupItem.price}</div>
        </div>
        {
          /* allow edit only if user's Land */
          // same check think to remove one !
          loggedUser._id === props.popupItem.owner &&
            loggedUser.lands
              .map((object) => object._id)
              .indexOf(props.popupItem._id) > -1 && (
              <button className="edit-btn" onClick={() => setEditTrigger(true)}>
                edit
              </button>
            )
        }
        <EditLand trigger={editTrigger}></EditLand>
        {
          /* allow edit only if user's Land */
          loggedUser._id !== props.popupItem.owner &&
            props.popupItem.name === "forSale" && (
              <button
                className="buy-land-btn"
                // onClick={() => props.setClosePopupTrigger(false)
              >
                Buy Land
              </button>
            )
        }
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
