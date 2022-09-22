const { StatusCodes } = require("http-status-codes");
const notFound = require("../Errors/NotFound");
const Unauthorized = require("../Errors/Unauthorized");
const BadRequest = require("../Errors/BadRequest");
const { attchCookiesTorRes, createUserToken } = require("../utils");
const userSchema = require("../Models/userSchema");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  //   first user admin
  const isFirstUser = (await userSchema.countDocuments({})) === 0;
  const roles = isFirstUser ? "admin" : "user";
  const user = await userSchema.create({ email, password, name, roles });
  const userToken = createUserToken(user);
  attchCookiesTorRes({ res, payload: userToken });

  res.status(StatusCodes.CREATED).json({
    user: { ...userToken },
  });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("please provide email an password");
  }
  const user = await userSchema.findOne({ email });

  if (!user) {
    throw new Unauthorized(`Please provide  Valid credentials`);
  }
  const isPassword = await user.checkPassWord(password);
  if (!isPassword) {
    throw new Unauthorized("Please provide  Valid credentials");
  }
  const userToken = createUserToken(user);
  attchCookiesTorRes({ res, payload: userToken });

  res.status(StatusCodes.OK).json({ user: userToken });
};
const logoutUser = async (req, res) => {
  res.cookie("token", "logged out succesfully", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("logged out user");
};
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
