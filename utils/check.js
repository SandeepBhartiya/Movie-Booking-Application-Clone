const Booking=require("../models/booking.model");
const constant=require("./constant");
const sendNotificationReq=require('./sendEmailRequest');

exports.checkBookingStatus=(bookingId,user)=>{
    setTimeout(async ()=>{
        const bookingData=await Booking.findOne({_id:bookingId});

        if(bookingData.status!=constant.status.completed)
        {
            bookingData.status=constant.status.cancelled;
            await bookingData.save();
            sendNotificationReq.bookingPaymentTimeout(user.email);
        }
    },120000);
}