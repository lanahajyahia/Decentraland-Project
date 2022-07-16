import React, { useState } from "react";
import EditLand from "../EditLand/EditLand";
import { Row } from "react-bootstrap";
import "./../../bootstrap.min.css";
import ErrorMessage from "./../ErrorMessage";
import axios from "axios";

import "./Popup.css";
const Popup = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  console.log(loggedUser);
  const [editTrigger, setEditTrigger] = useState(false);
  const [landPopUp, setLandPopup] = useState(true);
  const [buyError, setBuyError] = useState(null);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const updateSeller = async (_id) => {
    // get seller
    let sellerId = props.popupItem.owner;
    try {
      const { data } = await axios.get("/api/users/" + sellerId, config);
      let username = data.username;
      let budget = data.budget + props.popupItem.price;
      if (data) {
        await axios.post(
          "/api/users/removeAsset",
          { username, _id, budget },
          config
        );

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const updateBuyer = async (username, budget, _id) => {
    try {
      console.log("updateBuyer", username, budget, _id);
      const buyer = await axios.post(
        "/api/users/updateAsset",
        { username, _id, budget },
        config
      );
      if (buyer) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateLand = async (_id, owner) => {
    try {
      const { updateLand } = await axios.post(
        "/api/lands/update",
        {
          _id,
          owner,
        },
        config
      );
      if (updateLand) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const buyLand = async () => {
    let buyerBudget = loggedUser.budget - props.popupItem.price;
    console.log("buyerBudget", buyerBudget);
    if (buyerBudget >= 0) {
      setBuyError(null);
      // get seller details
      let _id = props.popupItem._id;
      if (updateSeller(_id)) {
        updateBuyer(loggedUser.username, buyerBudget, _id);
        updateLand(_id, loggedUser._id);
      } else {
        setBuyError("Error buying land, try again later!");
      }

      let landsInfo = JSON.parse(localStorage.getItem("landsInfo"));

      //Find index of specific object using findIndex method.
      let objIndex = landsInfo.findIndex(
        (obj) => obj._id === props.popupItem._id
      );

      landsInfo[objIndex].owner = loggedUser._id;
      // check if lands belong to the owner
      props.setLands(landsInfo);
      props.setChosenItem(landsInfo[objIndex]);
      // Save back to localStorage
      localStorage.setItem("landsInfo", JSON.stringify(landsInfo));

      // logged user
      loggedUser["budget"] = buyerBudget;
      localStorage.setItem("userInfo", JSON.stringify(loggedUser));
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
                    onClick={() => buyLand()}
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
