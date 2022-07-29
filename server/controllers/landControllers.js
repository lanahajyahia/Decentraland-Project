const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Land = require("../models/landModel");

// const generateToken = require("../utils/generateToken");

const createLands = asyncHandler(async (req, res) => {
  const land = await Land.insertMany(req.body);

  if (land) {
    res.status(201).json(land);
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
    return res.status(500).json({ message: err.message });
  }
});
module.exports = { createLands, getLands, getLand, updateLand };
