import React, { useState } from "react";
import EditLand from "../EditLand/EditLand";
import { Row } from "react-bootstrap";
import "./../../bootstrap.min.css";
import ErrorMessage from "./../ErrorMessage";
import axios from "axios";

import "./Popup.css";
const Popup = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const [editTrigger, setEditTrigger] = useState(false);
  const [landPopUp, setLandPopup] = useState(true);
  const [buyError, setBuyError] = useState(null);

  const buyLand = async () => {
    let buyerBudget = loggedUser.budget - props.popupItem.price;
    if (buyerBudget >= 0) {
      let sellerId = props.popupItem.owner;

      setBuyError(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        // get seller details
        const { data } = await axios.get("/api/users/" + sellerId, config);
        let _id = props.popupItem._id;
        let owner = loggedUser._id;
        // destructure only data from what we get
        const { updateLand } = await axios.post(
          "/api/lands/update",
          {
            _id,
            owner,
          },
          config
        );
        let buyerUsername = loggedUser.username;
        let lands = props.popupItem._id;

        await axios.post(
          "/api/users/updateAsset",
          { buyerUsername, lands, buyerBudget },
          config
        );
        if (updateLand) {
          let landsInfo = JSON.parse(localStorage.getItem("landsInfo"));

          //Find index of specific object using findIndex method.
          let objIndex = landsInfo.findIndex(
            (obj) => obj._id === props.popupItem._id
          );

          landsInfo[objIndex].owner = owner;
          // check if lands belong to the owner
          props.setLands(landsInfo);
          props.setChosenItem(landsInfo[objIndex]);
          // Save back to localStorage
          // localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("landsInfo", JSON.stringify(landsInfo));

          // localStorage.setItem("landsInfo", JSON.stringify(lands));
        } else {
          buyError("Couldn't buy Land, try again later");
          // localStorage.setItem("landsInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setBuyError("You don't have enough money!");
    }
  };
  //trigger is a true or false val to trigger the popup
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="btn close-btn"
          onClick={() => {
            props.setClosePopupTrigger(false);
            setEditTrigger(false);
            setLandPopup(true);
          }}
        >
          X
        </button>
        {buyError && <ErrorMessage variant="danger">{buyError}</ErrorMessage>}

        {landPopUp && (
          <div id="land-popup">
            <Row className="row" id="SquareName">
              {props.popupItem.name}
            </Row>
            {(props.popupItem.name === "forSale" ||
              props.popupItem.name === "notForSale") && (
              <Row className="row" id="squarePrice">
                Price: {props.popupItem.price}$
              </Row>
            )}
            {
              /* allow edit only if user's Land */
              // same check think to remove one !
              loggedUser._id === props.popupItem.owner &&
                loggedUser.lands
                  .map((object) => object._id)
                  .indexOf(props.popupItem._id) > -1 && (
                  <button
                    className="btn btn-primary edit-btn"
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
                    className="btn btn-secondary buy-land-btn"
                    // on click check user budget if he can buy
                    onClick={() => buyLand}
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
          setLands={props.setLands}
          setChosenItem={props.setChosenItem}
        ></EditLand>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
