import React, { useState } from "react";
import "./EditLand.css";
import { Form, Row, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import "./../../bootstrap.min.css";
import ErrorMessage from "./../ErrorMessage";

const EditLand = (props) => {
  const [editStatus, setEditStatus] = useState(props.popupItem.name);
  const [editPrice, setEditPrice] = useState(props.popupItem.price);
  const [error, setError] = useState(null);

  const updateLand = async () => {
    if (
      editStatus !== props.popupItem.name ||
      editPrice !== props.popupItem.price
    ) {
      if (editPrice >= 15 && editPrice <= 200) {
        setError(null);

        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          let price = editPrice;
          let name = editStatus;
          let _id = props.popupItem._id;
          let color =
            name === "forSale" ? "var(--bs-forSale)" : "var(--bs-notForSale)";
          // destructure only data from what we get
          const { data } = await axios.post(
            "/api/lands/update",
            {
              _id,
              name,
              price,
              color,
            },
            config
          );

          if (data) {
            let landsInfo = JSON.parse(localStorage.getItem("landsInfo"));

            //Find index of specific object using findIndex method.
            let objIndex = landsInfo.findIndex(
              (obj) => obj._id === props.popupItem._id
            );

            landsInfo[objIndex].price = price;
            landsInfo[objIndex].name = name;
            landsInfo[objIndex].color = color;
            // check if lands belong to the owner
            props.setLands(landsInfo);
            props.setChosenItem(landsInfo[objIndex]);
            // Save back to localStorage
            // localStorage.setItem("userInfo", JSON.stringify(userInfo));
            localStorage.setItem("landsInfo", JSON.stringify(landsInfo));

            props.setEditTrigger(false);
            props.setLandPopup(true);

            // localStorage.setItem("landsInfo", JSON.stringify(lands));
          } else {
            setError("Couldn't update Land, try again later");
            // localStorage.setItem("landsInfo", JSON.stringify(data));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Not in price range!");
      }
    }
  };
  return props.trigger ? (
    <div className="editLand">
      <div className="inner-editLand">
        {/* status select  */}
        <Row>Land's status</Row>
        <Form.Select
          aria-label="land status select"
          onChange={(e) => setEditStatus(e.currentTarget.value)}
          defaultValue={props.popupItem.name}
        >
          <option value="forSale">For Sale</option>
          <option value="notForSale">Not For Sale</option>
        </Form.Select>
        <br></br>
        <Row>Land's price</Row>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <FloatingLabel
          controlId="floatingInput"
          label="Price between 15$-200$"
          className="mb-3"
          onChange={(e) => setEditPrice(e.target.value)}
        >
          <Form.Control
            defaultValue={props.popupItem.price}
            type="number"
            placeholder="price$"
          />
        </FloatingLabel>
        <button
          className="btn btn-warning cancel-edit-btn"
          onClick={() => {
            setError(null);
            props.setEditTrigger(false);
            props.setLandPopup(true);
          }}
        >
          Cancel
        </button>
        <button className="btn btn-success save-land-btn" onClick={updateLand}>
          Save
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditLand;
