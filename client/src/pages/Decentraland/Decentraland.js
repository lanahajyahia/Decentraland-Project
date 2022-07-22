import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Square from "../../components/Square/Square";
import "./../../bootstrap.min.css";
import "./Decentraland.css";
import axios from "axios";
import MapTool from "../../components/MapTool/MapTool";

// import Popup from "../../components/Popup/Popup";

const colorsArray = [
  // {
  //   type: "street",
  //   color: "var(--bs-street)",
  // },
  {
    type: "notForSale",
    color: "var(--bs-notForSale)",
  },
  {
    type: "forSale",
    color: "var(--bs-forSale)",
  },
  {
    type: "park",
    color: "var(--bs-park)",
  },
];

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const Decentraland = () => {
  const [lands, setLands] = useState([]);

  // const [buttonPopup, setButtonPopup] = useState(false);
  // const [chosenItem, setChosenItem] = useState({});
  const localLands = JSON.parse(localStorage.getItem("landsInfo"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const createLands = async (row = 10, col = 10) => {
    var myLands = [];
    let numOfParks = 0;
    for (let i = 0; i < row * col; i++) {
      let randNum = 0;
      // if (numOfParks >= row * col * 0.1) {
      randNum = Math.floor(Math.random() * 2);
      // } else {
      //   randNum = Math.floor(Math.random() * 3);
      // }
      let name = "";
      let color = "";
      if (
        i % row === parseInt(col / 2) ||
        parseInt(i / row) === parseInt(row / 2)
      ) {
        name = "Street";
        color = "var(--bs-street)";
      } else if (
        (i % row === 1 || (parseInt(i / row) === row - 2 && i % row > 1)) &&
        numOfParks < row * col * 0.2
      ) {
        name = "Park";
        color = "var(--bs-park)";
      } else {
        name = colorsArray[randNum].type;
        color = colorsArray[randNum].color;
      }

      if (name === "Park") {
        numOfParks++;
      }

      let price = 0;
      let owner = userInfo._id;
      if (name === "notForSale" || name === "forSale") {
        price = Math.floor(Math.random() * (200 - 15 + 1) + 15);
      }

      let obj = {};
      obj.name = name;
      obj.price = price;
      obj.owner = owner;
      obj.color = color;
      // console.log("obj", obj);
      myLands.push(obj);

      // console.log("lands for now", lands);
    }
    setLands([...lands, myLands]);
    try {
      // console.log("try data", lands);
      const { data } = await axios.post(
        "/api/lands/createLands",
        myLands,
        config
      );

      // // // ONLY LANDS FOR SALE OR NOT FOR SALE - update owner lands
      // if (name === "notForSale" || name === "forSale") {
      //   let username = "admin";
      //   let lands = data._id;
      //   await axios.post("/api/users/updateAsset", { username, lands }, config);
      // }

      const checkMyLands = (item) => {
        if (
          item.owner === userInfo._id &&
          (item.name === "notForSale" || item.name === "forSale")
        ) {
          return item._id;
        }
      };
      const _id = data.filter(checkMyLands);
      console.log("lands1", _id);
      let username = userInfo.username;
      await axios.post("/api/users/updateAsset", { username, _id }, config);

      // console.log("create data decentraland", data);
      // console.log("lands created", data);
    } catch (error) {
      console.log(error);
    }

    // localStorage.setItem("landsInfo", JSON.stringify(lands));
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

        if (data.length === 0) {
          createLands(10, 10);
          // console.log("data.length");
          localStorage.setItem("landsInfo", JSON.stringify(lands));
        } else {
          setLands(data);
          localStorage.setItem("landsInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!localLands || localLands.length === 0) {
      create();
    } else {
      setLands(JSON.parse(localStorage.getItem("landsInfo")));
      localStorage.setItem("landsInfo", JSON.stringify(lands));
    }
  }, []);
  // console.log("yLands", JSON.parse(localStorage.getItem("yLands")));
  if (lands.length !== 0) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // check if lands belong to the owner
    const checkMyLands = (item) => {
      return (
        item.owner === userInfo._id &&
        (item.name === "notForSale" || item.name === "forSale")
      );
    };
    const result_myLands = lands.filter(checkMyLands);
    userInfo["lands"] = result_myLands;
    // Save back to localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("landsInfo", JSON.stringify(lands));
  }

  let colSize = 400;
  return (
    <Container
      id="decentralandDiv"
      style={{ gridTemplateColumns: colSize + "px" }}
    >
      <MapTool userInfo={userInfo} />

      <div>
        {lands.map((item, i) => (
          <Square
            key={i}
            // setOpenPopupTrigger={setButtonPopup}
            // setClickedItem={setChosenItem}
            item={item}
            setLands={setLands}
          ></Square>
        ))}
      </div>
    </Container>
  );
};

export default Decentraland;
