const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { connectionChannel, publishMessage } = require("../utils/messageQueue");
const { REMAINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await connectionChannel();
    const data = { message: "success" };
    publishMessage(channel, REMAINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        data: response,
        message: "Booking done successfully",
        success: true,
        err: {},
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explaination,
        data: {},
      });
    }
  }
}

// const create = async (req, res) => {
//   try {
//     const response = await bookingService.createBooking(req.body);
//     return res.status(StatusCodes.OK).json({
//       data: response,
//       message: "Booking done successfully",
//       success: true,
//       err: {},
//     });
//   } catch (error) {
//     return res.status(error.statusCode).json({
//       message: error.message,
//       success: false,
//       err: error.explaination,
//       data: {},
//     });
//   }
// };

module.exports = BookingController;
