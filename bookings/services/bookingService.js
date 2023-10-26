const Booking = require("../Booking");
const Slot = require("../Slot");

exports.getAllBookings = async (status) => {
  return await Booking.find({status:status}).sort({start_time:1});
};

exports.createBooking = async (booking) => {
  return await Booking.create(booking);
};

const getTime = (date) => {
  const d = (date).toString();
  let dd = d.split("T");
  let ddd = dd[1].split(":")
  return(ddd)
};

const getDate = (date) => {
  const d = (date).toString();
  let dd = d.split("T");
  let ddd = dd[0].split("-")
  return ddd
};

exports.getSlot = async (doc_id,booking_date) => {
  const data = await Slot.findOne({doc_id:doc_id, active:true});
  let default_slots = ["10","10.5","11","11.5","12","15","15.5","16","16.5","17","17.5"];

  if(data.slot_booked.length==0 && data.adjusted_slot.length==0){
    return default_slots
  }
  if(data.slot_booked.length!=0 ){
    data.slot_booked.forEach(element => {
      if(ele.booking_date==booking_date){
        ele.start_time.forEach(time => {
          let time_format = getTime(time);
          if(time_format[1]=="30"){
            let indx = default_slots.indexOf(time_format[0])
            delete default_slots[indx+1];
          }
          if(time_format[1]=="00"){
            let indx = default_slots.indexOf(time_format[0])
            delete default_slots[indx];
          }
          
        });
      }
    });
  }

  if(data.adjusted_slot.length!=0 ){
    data.adjusted_slot.forEach(element => {
      if(ele.booking_date==booking_date){
        ele.start_time.forEach(time => {
          let time_format = getTime(time);
          if(time_format[1]=="30"){
            let indx = default_slots.indexOf(time_format[0])
            delete default_slots[indx+1];
          }
          if(time_format[1]=="00"){
            let indx = default_slots.indexOf(time_format[0])
            delete default_slots[indx];
          }
          
        });
      }
    });
  }

  return default_slots;
 
};

exports.updateSlot = async (slot) => {
  return await Booking.create(slot);
};
