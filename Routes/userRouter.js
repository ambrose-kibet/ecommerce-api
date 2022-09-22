const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizePermisions,
} = require("../Middleware/authMiddleware");
const {
  updateUserPassword,
  updateUser,
  showCurrentuser,
  getSingleUser,
  getAllUsers,
} = require("../Conttrollers/userController");

router
  .route("/")
  .get(authMiddleware, authorizePermisions("admin", "owner"), getAllUsers);
router.route("/showme").get(authMiddleware, showCurrentuser);
router.route("/updateuser").patch(authMiddleware, updateUser);
router.route("/updateuserpassword").patch(authMiddleware, updateUserPassword);
router
  .route("/:id")
  .get(authMiddleware, authorizePermisions("admin", "owner"), getSingleUser);
module.exports = router;
