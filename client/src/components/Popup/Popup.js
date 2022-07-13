import React from "react";
import "./Popup.css";
const Popup = (props) => {
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
        {/* allow edit only if user's Land */}
        <div>Name</div>
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
