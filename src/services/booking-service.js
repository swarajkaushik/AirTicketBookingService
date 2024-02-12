const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors/index");
const { FLIGHT_SERVICE_URL } = require("../config/serverConfig");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const flightUrl = `${FLIGHT_SERVICE_URL}/api/v1/flight/${flightId}`;
      const flight = await axios.get(flightUrl);
      const flightData = flight.data.data;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient seats available"
        );
      }
      const totalCost = flightData.price * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestUrl = `${FLIGHT_SERVICE_URL}/api/v1/updateFlight/${flightId}`;
      console.log(updateFlightRequestUrl, "updateFlightRequestUrl");
      await axios.patch(updateFlightRequestUrl, {
        totalSeats: flightData.totalSeats - data.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, { status: "Booked" });

      return finalBooking;
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
