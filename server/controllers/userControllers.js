const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, isBuyer, asset } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    response.status(400);
    throw new Error("User Already exists");
  }
  const user = await User.create({
    username,
    password,
    isBuyer,
    asset,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isBuyer: user.isBuyer,
      asset: user.asset,
    });
  } else {
    res.status(400);
    throw new Error("error happened");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isBuyer: user.isBuyer,
      asset: user.asset,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or pass");
  }
});

module.exports = { registerUser, authUser };
