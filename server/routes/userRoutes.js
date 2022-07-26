const express = require("express");
const {
  getUser,
  registerUser,
  authUser,
  updateUserBudget,
  removeUsersLand,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
// find user by id
router.get("/:id", getUser);
// update asset of user
router.route("/updateBudget").post(updateUserBudget);
router.route("/removeAsset").post(removeUsersLand);

module.exports = router;
