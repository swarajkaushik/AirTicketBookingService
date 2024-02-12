const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models/index");
const { AppError, ValidationError } = require("../utils/errors/index");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if ((error.name = "SequilizeValidationError")) {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create booking",
        "There was some issue creating the booking, try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      if ((error.name = "SequilizeValidationError")) {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot update the booking",
        "There was some issue updating the booking, try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
