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

const getDayName = (date) => {
  const d = new Date(date);
  let day = d.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day]
};

// get the available slots for the input date
exports.getSlot = async (req, res) => {
  try {
    const doc_id = req.query.doc_id;
    const booking_date = req.query.booking_date;
    if(getDayName(booking_date)=="Sun" || getDayName(booking_date)=="Sat"){
      return res.json({ data: {message:"No Slot Available"}, status: "success" });
    }

    const slots = await bookingService.getSlot(doc_id,booking_date);
    res.json({ data: slots, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const doc_id = req.query.doc_id;
    const slot = await bookingService.updateSlot(doc_id,req.body);
    res.json({ data: slot, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
