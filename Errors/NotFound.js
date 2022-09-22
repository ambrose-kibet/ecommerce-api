const CustomAPIError = require("./CustomErrorAPI");
const { StatusCodes } = require("http-status-codes");
class NotFound extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound;
