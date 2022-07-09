const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Land = require("../models/landModel");

// const generateToken = require("../utils/generateToken");

const createLand = asyncHandler(async (req, res) => {
  const { owner, name, status, price, asset, color } = req.body;
  const landExists = await Land.findOne({ name });
  console.log("land details", owner, name, status, price, asset, color);
  if (landExists) {
    response.status(400);
    throw new Error("Land with this name already exist!");
  }
  const land = await Land.create({
    owner,
    name,
    status,
    price,
    asset,
    color,
  });

  if (land) {
    res.status(201).json({
      _id: land._id,
      name: land.name,
      status: land.status,
      price: land.price,
      asset: land.asset,
      color: land.color,
    });
  } else {
    res.status(400);
    throw new Error("error happened");
  }
});

const getLands = asyncHandler(async (req, res) => {
  //   const { name, password } = req.body;

  const lands = await Land.find();

  if (lands) {
    res.json(lands);
  } else {
    console.log("here");
    res.status(400);

    throw new Error("Invalid email or pass");
  }
});

module.exports = { createLand, getLands };
