import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Square from "../../components/Square/Square";
import "./../../bootstrap.min.css";
import "./Decentraland.css";
import axios from "axios";
import Popup from "../../components/Popup/Popup";

const colorsArray = [
  {
    type: "street",
    color: "var(--bs-street)",
  },
  {
    type: "park",
    color: "var(--bs-park)",
  },
  {
    type: "notForSale",
    color: "var(--bs-notForSale)",
  },
  {
    type: "forSale",
    color: "var(--bs-forSale)",
  },
];

const Decentraland = () => {
  const [lands, setLands] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [chosenItem, setChosenItem] = useState({});
  const localLands = JSON.parse(localStorage.getItem("landsInfo"));
  console.log("localLands", localLands);
  const createLands = async () => {
    for (let i = 0; i < 10; i++) {
      let randNum = Math.floor(Math.random() * 4);
      try {
        let name = colorsArray[randNum].type;
        let color = colorsArray[randNum].color;
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/lands/create",
          { name, color },
          config
        );
        // ONLY LANDS FOR SALE OR NOT FOR SALE - update owner lands
        if (name === "notForSale" || name === "forSale") {
          let username = "admin";
          let lands = data._id;
          await axios.post(
            "/api/users/updateAsset",
            { username, lands },
            config
          );
        }

        // console.log("create data decentraland", data);
        setLands([...lands, data]);
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem("landsInfo", JSON.stringify(lands));
    var userInfo = localStorage.getItem("userInfo");
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    userInfo = userInfo ? JSON.parse(userInfo) : {};
    // Add new data to localStorage Array
    userInfo["lands"] = lands;
    // Save back to localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  useEffect(() => {
    const create = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        // destructure only data from what we get
        const { data } = await axios.get("/api/lands", config);
        console.log("get data lana", data);

        if (data.length === 0) {
          createLands();
        } else {
          setLands(data);
          localStorage.setItem("landsInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!localLands || localLands.length === 0) {
      console.log("!loc");
      create();
      // rows = initUI();
    } else {
      setLands(JSON.parse(localStorage.getItem("landsInfo")));
    }
  }, []);

  //     rows.push(
  //       <div key={i} id={i} className="boardRow">
  //         {createSquares(i)}
  //       </div>

  return (
    <Container id="decentralandDiv">
      {lands.map((item, i) => (
        <Square
          key={i}
          setOpenPopupTrigger={setButtonPopup}
          setClickedItem={setChosenItem}
          item={item}
        ></Square>
      ))}
      <Popup
        trigger={buttonPopup}
        setClosePopupTrigger={setButtonPopup}
        popupItem={chosenItem}
      ></Popup>
    </Container>
  );
};

export default Decentraland;
