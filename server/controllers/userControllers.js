const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// register
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error happened");
  }
});

// login
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isBuyer: user.isBuyer,
      asset: user.asset,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or pass");
  }
});

// get by id
const getUser = asyncHandler(async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  res.json({
    _id: user._id,
    username: user.username,
    isBuyer: user.isBuyer,
    asset: user.asset,
    token: generateToken(user._id),
  });
});

// update assets and budget - TODO
const updateUser = asyncHandler(async (req, res) => {
  const { asset, id } = req.body;

  const user = await User.findOne({ id });
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      isBuyer: user.isBuyer,
      asset: user.asset,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or pass");
  }
  // try {
  //   user = await User.updateOne(req.params.id);
  //   if (user == null) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  // } catch (err) {
  //   return res.status(500).json({ message: err.message });
  // }
  // res.user = user;
  // res.json({
  //   _id: user._id,
  //   username: user.username,
  //   isBuyer: user.isBuyer,
  //   asset: user.asset,
  //   token: generateToken(user._id),
  // });
});

module.exports = { registerUser, authUser, getUser, updateUser };
