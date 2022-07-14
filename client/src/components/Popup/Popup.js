import React from "react";
import "./Popup.css";
const Popup = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
  //trigger is a true or false val to trigger the popup
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => props.setClosePopupTrigger(false)}
        >
          X
        </button>
        {
          /* allow edit only if user's Land */
          loggedUser._id === props.popupItem.owner && (
            // loggedUser.lands.indexOf(props.popupItem._id) > -1 &&
            <button
              className="edit-btn"
              // onClick={() => props.setClosePopupTrigger(false)
            >
              edit
            </button>
          )
        }
        <div>Name {props.popupItem.name}</div>
        <div>Type</div>
        <div>Is for sale?</div>
        <div>Price</div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
