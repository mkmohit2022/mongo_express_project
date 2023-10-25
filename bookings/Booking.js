const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  appointment_date: { type: Date, required: true, default:Date.now() },
  start_time: {type: Date, required: true, default:Date.now()},
  end_time: {type: Date, required: true, default:Date.now()+1},
  members: { type: [{user_id:{type:String}, user_name:{type:String}}], required: false },
  status: {type:String, default:"Upcoming"}
  // Add more fields as per your product requirements
});

module.exports = mongoose.model('booking', bookingSchema, 'booking');