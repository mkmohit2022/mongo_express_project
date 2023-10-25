const express = require('express');
const router = express.Router();
const Booking = require('./Booking');

const bookingService = require("./services/bookingService");
 
exports.getAllBookings = async (req, res) => {
  try {
    const status = req.query.status;
    const bookings = await bookingService.getAllBookings(status);
    res.json({ data: bookings, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.json({ data: booking, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const status = req.query.status;
    const bookings = await bookingService.getAllBookings(status);
      const data = {
    appt: bookings,
};
    res.render('pages/index', data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
