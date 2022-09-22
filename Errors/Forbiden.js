const CustomAPIError = require("./CustomErrorAPI");
const { StatusCodes } = require("http-status-codes");
class Forbiden extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Forbiden;
