const express = require("express");
const {
  getLands,
  createLand,
  //   updateLand,
} = require("../controllers/landControllers");
const router = express.Router();

router.route("/").get(getLands);
router.route("/create").post(createLand);
// router.route("/update").post(updateLand);

module.exports = router;
