const express = require("express");
const {
  getLands,
  createLand,
  getLand,
} = require("../controllers/landControllers");
const router = express.Router();

router.route("/").get(getLands);
router.route("/create").post(createLand);
router.get("/:id", getLand);

// router.route("/update").post(updateLand);

module.exports = router;
