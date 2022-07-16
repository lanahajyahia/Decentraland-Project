import React, { useState } from "react";
import "./EditLand.css";
import { Form, Row, FloatingLabel } from "react-bootstrap";

const EditLand = (props) => {
  const [editStatus, setEditStatus] = useState(props.popupItem.name);
  const [editPrice, setEditPrice] = useState(props.popupItem.price);

  console.log("edit stas", editStatus);
  console.log("editPrice", props.popupItem.price);

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
          className="cancel-edit-btn"
          onClick={() => {
            props.setEditTrigger(false);
            props.setLandPopup(true);
          }}
        >
          Cancel
        </button>
        <button className="save-land-btn">Save</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditLand;
