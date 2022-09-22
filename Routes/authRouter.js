const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../Conttrollers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
module.exports = router;
