const express = require("express");
const {
  getAllBookings,
  getBookings,
  createBooking
} = require("../bookingsControllers");

const router = express.Router();

router.route("/allBookings").get(getAllBookings).post(createBooking);
router.route("/bookings").get(getBookings);


module.exports = router;
