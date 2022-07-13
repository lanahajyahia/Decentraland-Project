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
  // {
  //   type: "myLand",
  //   color: "var(--bs-myLand)",
  // },
];

const Decentraland = () => {
  const [lands, setLands] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
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
          myId={item._id}
          name={item.name}
          backgroundColor={lands[i].color}
        ></Square>
      ))}
      <Popup
        trigger={buttonPopup}
        setClosePopupTrigger={setButtonPopup}
      ></Popup>
    </Container>
  );
};

export default Decentraland;
