import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Square from "../../components/Square/Square";
import "./../../bootstrap.min.css";
import "./Decentraland.css";
import axios from "axios";

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
  {
    type: "myLand",
    color: "var(--bs-myLand)",
  },
];

const Decentraland = () => {
  const [lands, setLands] = useState([]);
  const localLands = JSON.parse(localStorage.getItem("landsInfo"));
  console.log("localLands", localLands);
  const createLands = async () => {
    for (let i = 0; i < 100; i++) {
      let randNum = Math.floor(Math.random() * 5);
      try {
        let name = colorsArray[randNum].type;
        let color = colorsArray[randNum].color;
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        var { data } = await axios.post(
          "/api/lands/create",
          { name, color },
          config
        );

        console.log("create data decentraland", data);
        setLands([...lands, data]);
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem("landsInfo", JSON.stringify(lands));
  };
  const rows = [];
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
    if (!localLands) {
      create();
      // rows = initUI();
    } else {
      setLands(JSON.parse(localStorage.getItem("landsInfo")));
      // rows = initUI();
    }
  }, []);

  const initUI = () => {
    const squares = [],
      rows = [];
    const createSquares = (index) => {
      for (let i = index * 10; i < 10 * (index + 1); i++) {
        squares.push(
          <Square
            key={i}
            name={lands[i].name}
            backgroundColor={lands[i].color}
          ></Square>
        );
      }
      return squares;
    };
    for (let i = 0; i < 10; i++) {
      rows.push(
        <div key={i} id={i} className="boardRow">
          {createSquares(i)}
        </div>
      );
    }
    return rows;
  };
  console.log("end lands", lands);

  return <Container id="decentralandDiv">{rows}</Container>;
};

export default Decentraland;
