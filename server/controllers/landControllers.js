const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Land = require("../models/landModel");

// const generateToken = require("../utils/generateToken");

const createLand = asyncHandler(async (req, res) => {
  const { owner, name, status, price, asset, color } = req.body;
  // const landExists = await Land.findOne({ name });
  console.log("land details", owner, name, status, price, asset, color);
  // if (landExists) {
  //   response.status(400);
  //   throw new Error("Land with this name already exist!");
  // }
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
      owner: land.owner,
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
  const lands = await Land.find();

  if (lands) {
    res.json(lands);
  } else {
    console.log("here");
    res.status(400);

    throw new Error("getLands func error");
  }
});

// getLandById
const getLand = asyncHandler(async (req, res) => {
  const land = await Land.findById(req.params.id);

  if (land) {
    res.json(land);
  } else {
    console.log("getLand func error");
    res.status(400);

    throw new Error("getLand func error");
  }
});

// update status and price of land
const updateLand = asyncHandler(async (req, res) => {
  const { _id, name, price, color, owner } = req.body;
  try {
    const updateLand = await Land.updateOne(
      { _id: _id },
      { $set: { name: name, price: price, color: color, owner: owner } }
    );
    if (updateLand) res.json(updateLand);
  } catch (err) {
    // res.status(400);
    // throw new Error("Cannot update asset of user");
    return res.status(500).json({ message: err.message });
  }
});
module.exports = { createLand, getLands, getLand, updateLand };
