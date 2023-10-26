const express = require("express");
const {
  getAllBookings,
  getBookings,
  getSlot,
  updateSlot,
  createBooking
} = require("../bookingsControllers");

const router = express.Router();

router.route("/allBookings").get(getAllBookings).post(createBooking);
router.route("/bookings").get(getBookings);
router.route("/slot").get(getSlot);
router.route("/slot").post(updateSlot);


module.exports = router;
