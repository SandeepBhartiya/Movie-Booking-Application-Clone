const Booking=require("../models/booking.model");
const constant=require("./constant.util");
// const sendNotification=

exports.checkBookingStatus=(bookedId,user)=>{
    setTimeout(async ()=>{
        const bookingData=await Booking.findOne({_id:bookingId});

        if(bookingData.bookingStatus!=constant.status.completed)
        {
            bookingData.bookingStatus=constant.bookingStatus.cancelled;
            await bookingData.save();

        }
    },120000);
}