// what type of data the user is going to have
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isBuyer: {
      type: String,
      require: true,
    },
    asset: {
      budget: {
        type: Number,
        default: 1000,
      },
      assets: {
        type: Array,
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password function
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// decrypt password function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
