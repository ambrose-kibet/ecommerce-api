const Unauthorized = require("../Errors/Unauthorized");
const Forbiden = require("../Errors/Forbiden");
const { verifyJwt } = require("../utils");
const authMiddleware = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new Unauthorized("Please Provide A Valid Token");
  }

  try {
    const { userId, name, role } = verifyJwt(token);
    req.user = {
      userId,
      name,
      role,
    };
    next();
  } catch (error) {
    throw new Unauthorized("Please Provide A Valid Token");
  }
};
const authorizePermisions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Forbiden("Not authorized to access this route");
    }
    next();
  };
};
module.exports = { authMiddleware, authorizePermisions };
