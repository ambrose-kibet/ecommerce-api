const Forbiden = require("../Errors/Forbiden");

const checkPermisions = (requestUser, resouceId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resouceId.toString()) return;
  throw new Forbiden("Not authorized to acess this route");
};
module.exports = checkPermisions;
