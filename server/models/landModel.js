// what type of data the user is going to have
const mongoose = require("mongoose");
// const User = require("../models/userModel");
// import UserSchema from "../models/userModel";

// const bcrypt = require("bcryptjs");

const landSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: false,
    },
    price: {
      type: Number,
      require: true,
      default: 15,
    },
    color: {
      type: String,
      require: true,
      default: "#111",
    },
    asset: {
      game: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
