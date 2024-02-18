const express = require("express");
const { BookingController } = require("../../controllers/index");
// const { connectionChannel } = require("../../utils/messageQueue");

// const channel = await connectionChannel();
const bookingController = new BookingController();
const router = express.Router();

router.post("/booking", bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
