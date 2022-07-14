import React from "react";

const EditLand = (props) => {
  return props.trigger ? (
    <div className="editLand">
      EditLand
      <div className="inner-editLand">
        inner EditLand
        <button className="cancel-edit-btn">cancel</button>
        <button className="save-land-btn">save</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditLand;
