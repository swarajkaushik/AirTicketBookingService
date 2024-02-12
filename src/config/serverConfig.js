const env = require("dotenv");
env.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
};
