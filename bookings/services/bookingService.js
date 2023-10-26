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
      let ddd = dd[1].substring(0, 5)
      return(ddd)
};


const getDate = (date) => {
  const d = (date).toString();
  let dd = d.split("T");
  let ddd = dd[0].split("-")
  return ddd
};

exports.getSlot = async (doc_id,booking_date) => {

  // sample query for updating slot_booked in db
  // db.slot.updateOne({doc_id:"123"},{$push:{"slot_booked":{"booking_date":"2023-10-27",start_time:["12:00"]}}})

  const data = await Slot.findOne({doc_id:doc_id, active:true});
  let default_slots = ["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00","17:30"];

  if(data.slot_booked.length==0 && data.adjusted_slot.length==0){
    return default_slots
  }

  // if for any day a slot is adjusted, then there would not be any default time applicable
  if(data.adjusted_slot.length!=0 ){
    data.adjusted_slot.forEach(element => {
      if(element.booking_date==booking_date){
        default_slots = element.adjusted_start_times;
      }
    });
  }

  if(data.slot_booked.length!=0 ){
    data.slot_booked.forEach(ele => {
      if(ele.booking_date==booking_date){
        ele.start_time.forEach(time => {
          let indx = default_slots.indexOf(time)
          default_slots.splice(indx, 1)
        });
      }
    });
  }


  return default_slots;
 
};

exports.updateSlot = async (doc_id,slot) => {
  const curr = await Slot.findOne({doc_id:doc_id});
  let update=true;
  let message="";
  if(slot.slot_booked){
    await Slot.updateOne({doc_id:doc_id, active:true},{$push:{"slot_booked":slot["slot_booked"]}});
    message = "slot booked"
  }
  if(slot.adjusted_slot){
    console.log(slot.adjusted_slot)
    console.log(curr)
    curr.slot_booked.forEach(element => {
      if(element.booking_date==slot.adjusted_slot.booking_date){
        update=false;
        message= "Already a slot booking. Cannot Adjust"
      }
    });
    if(update){
      await Slot.updateOne({doc_id:doc_id, active:true},{$push:{"adjusted_slot":slot["adjusted_slot"]}});
      message = "adjusted slot for this date"
    }
  }
  return message
  
};
