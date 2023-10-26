const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doc_id: { type: String, required: true },
  slot_booked:{ type :[
    {booking_date:{type:String}, start_time:[{type:String}]}
  ], required:false},
  adjusted_slot:{ type :[
    {booking_date:{type:String}, adjusted_start_times: {type:[{type:String}]}}
  ], required:false},
  active: {type:Boolean, default:true}

});

module.exports = mongoose.model('slot', slotSchema, 'slot');