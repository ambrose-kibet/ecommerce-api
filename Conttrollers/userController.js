const NotFound = require("../Errors/NotFound");
const User = require("../Models/userSchema");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../Errors/BadRequest");
const Unauthorized = require("../Errors/Unauthorized");
const {
  createUserToken,
  attchCookiesTorRes,
  checkPermisions,
} = require("../utils");
const getAllUsers = async (req, res) => {
  const users = await User.find({ roles: "user" }).select("-password");
  if (!users) {
    throw new NotFound(`user id: "${req.params.id}" does not exist`);
  }
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  checkPermisions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentuser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequest("please provide email and name");
  }
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  user.email = email;
  user.name = name;
  await user.save();
  const userToken = createUserToken(user);
  attchCookiesTorRes({ res, payload: userToken });
  res.status(StatusCodes.OK).json({ user });
};
const updateUserPassword = async (req, res) => {
  const {
    user: { userId },
    body: { oldPassword, newPassword },
  } = req;

  if (!oldPassword || !newPassword) {
    throw new BadRequest("please provide old password and new password");
  }
  const user = await User.findOne({ _id: userId });
  const isMatch = await user.checkPassWord(oldPassword);
  if (!isMatch) {
    throw new Unauthorized("inValid credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "password changed sucessfully" });
};
module.exports = {
  updateUserPassword,
  updateUser,
  showCurrentuser,
  getSingleUser,
  getAllUsers,
};

//  update user via findONeAnd Update
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new BadRequest("please provide email and name");
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { runValidators: true, new: true }
//   );
//   const userToken = createUserToken(user);
//   attchCookiesTorRes({ res, payload: userToken });
//   res.status(StatusCodes.OK).json({ user });
// };
