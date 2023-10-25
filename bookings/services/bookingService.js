const Booking = require("../Booking");

exports.getAllBookings = async (status) => {
  return await Booking.find({status:status});
};

exports.createBooking = async (booking) => {
  return await Booking.create(booking);
};
