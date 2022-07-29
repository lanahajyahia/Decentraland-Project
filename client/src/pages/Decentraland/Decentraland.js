import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Square from "../../components/Square/Square";
import "./../../bootstrap.min.css";
import "./Decentraland.css";
import axios from "axios";
import MapTool from "../../components/MapTool/MapTool";
import Loading from "./../../components/Loading";

const colorsArray = [
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
  const [loading, setLoading] = useState(true);

  const localLands = JSON.parse(localStorage.getItem("landsInfo"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const createLands = async (row = 10, col = 10) => {
    var myLands = [];
    let numOfParks = 0;
    for (let i = 0; i < row * col; i++) {
      let randNum = 0;
      randNum = Math.floor(Math.random() * 2);
      let name = "";
      let color = "";
      if (
        // + -> street
        i % row === parseInt(col / 2) ||
        parseInt(i / row) === parseInt(row / 2)
      ) {
        name = "Street";
        color = "var(--bs-street)";
      } else if (
        // rigth up + -> street
        i % row > parseInt(row / 2) &&
        parseInt(i / row) < parseInt(col / 2) &&
        (i % row === parseInt((row * 3) / 4) ||
          parseInt(i / row) === parseInt(col / 4))
      ) {
        name = "Street";
        color = "var(--bs-street)";
      } else if (
        // left down + -> street
        i % row < parseInt(row / 2) &&
        parseInt(i / row) > parseInt(col / 2) &&
        (i % row === parseInt(row / 4) ||
          parseInt(i / row) === parseInt((col * 3) / 4))
      ) {
        name = "Street";
        color = "var(--bs-street)";
      } else if (
        // H -> parks
        i % row < parseInt(row / 2) - 1 &&
        i % row > 1 &&
        parseInt(i / row) < parseInt(col / 2) - 1 &&
        parseInt(i / row) > 2 &&
        numOfParks < row * col * 0.2 &&
        (i % row === parseInt(col / 2) - 2 ||
          i % row === parseInt(col / 2) - 3 ||
          i % row === 2 ||
          i % row === 3 ||
          parseInt(i / row) === parseInt(col / 4) ||
          parseInt(i / row) === parseInt(col / 4) + 1)
      ) {
        name = "Park";
        color = "var(--bs-park)";
      } else if (
        // rest -> parks
        i % row > parseInt(row / 2) + 1 &&
        i % row < row - 1 &&
        parseInt(i / row) > parseInt(col / 2) + 1 &&
        parseInt(i / row) < row - 2 &&
        numOfParks < row * col * 0.15
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
      myLands.push(obj);
      if (myLands.length === 1000) {
        setLands([...lands, myLands]);
        try {
          const { data } = await axios.post(
            "/api/lands/createLands",
            myLands,
            config
          );

          if (data) {
            myLands = [];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // setLoading(false);
    window.location.reload(false);
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
          createLands(100, 100);
          localStorage.setItem("landsInfo", JSON.stringify(lands));
        } else {
          setLands(data);
          localStorage.setItem("landsInfo", JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!localLands || localLands.length === 0) {
      create();
    } else {
      setLands(JSON.parse(localStorage.getItem("landsInfo")));
      setLoading(false);
      // localStorage.setItem("landsInfo", JSON.stringify(lands));
    }
  }, []);

  let colSize = 1000;
  return (
    <Container>
      <Container>
        <MapTool userInfo={userInfo} />
      </Container>
      <Container
        id="decentralandDiv"
        style={{ gridTemplateColumns: colSize + "px" }}
      >
        <div>
          {loading && <Loading />}
          {!loading &&
            lands?.map((item, i) => (
              <Square key={i} item={item} setLands={setLands}></Square>
            ))}
        </div>
      </Container>{" "}
    </Container>
  );
};

export default Decentraland;
