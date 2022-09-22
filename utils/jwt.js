const jwt = require("jsonwebtoken");
const createJwt = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const attchCookiesTorRes = ({ res, payload }) => {
  const token = createJwt({ payload });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production" ? true : false,
    signed: true,
  });
};
module.exports = { createJwt, verifyJwt, attchCookiesTorRes };
