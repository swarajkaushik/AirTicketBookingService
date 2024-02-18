const env = require("dotenv");
env.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMAINDER_BINDING_KEY: process.env.REMAINDER_BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
