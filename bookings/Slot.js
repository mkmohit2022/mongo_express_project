const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doc_id: { type: String, required: true },
  slot_booked:{ type :[
    {booking_date:{type:Date}, start_time:[{type:Date}]}
  ], required:false},
  adjusted_slot:{ type :[
    {booking_date:{type:Date}, adjusted_time: {type:[{ start_time:{type:Date}, end_time:{type:Date}}]}}
  ], required:false},
  active: {type:Boolean, default:true}

});

module.exports = mongoose.model('slot', slotSchema, 'slot');