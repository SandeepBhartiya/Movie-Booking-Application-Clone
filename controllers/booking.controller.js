const Booking=require("../models/booking.model");
const Movie=require("../models/movie.model");
const Theatre=require("../models/theatre.model");
const User=require("../models/user.model");
const constant=require("../utils/constant.util");

exports.getAllbookings=async(req,res)=>{
    try
    {
        const query={};
        if(req.body.userType!=constant.userType.admin)
        {
            query.userId=req.user._id;
        }
        const bookings=await Booking.find(query)
        res.status(200).send(bookings)   
    }
    catch(err)
    {
        console.log("####  Error while getting user all booking history ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting user all booking history "
        });
    }
}

exports.getSingleBooking=async(req,res)=>{
    try
    {
        const booking=req.bookingInParams;
        res.status(200).send(booking);
    }catch(err)
    {
        console.log("####  Error while getting user single booking history ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting user single booking history "
        });
    }
}

exports.initiateBooking=async(req,res)=>{
    try
    {

        const bookingObj={
            userId:req.user._id,
            theatreId:req.body.theatreId,
            movieId:req.body.movieId,
            noOfSeats:req.body.noOfSeats,
            ticketBookedTime:Date.now(),
            totalCoast:req.bookedTheatre.ticketPrice* req.body.noOfSeats
        }
        const booking =await Booking.create(bookingObj);
        req.user.myBookings.push(booking._id);
        await req.user.save();
        
        req.bookedMovie.bookings.push(booking._id);
        await req.bookedMovie.save();
        
      
        // const theatreSeats=req.bookedTheatre.numberOfSeats;
        // const updateSeats=theatreSeats-booking.noOfSeats;
        // console.log(updateSeats)
        // req.bookedTheatre.push({numberOfSeats:updateSeats});
        // await req.bookedTheatre.save();

        res.status(201).send(booking);

    }catch(err)
    {
        console.log("####  Error while Initiate  booking  ####",err.message);
        res.status(500).send({
            message:"Internal server error while Initiate booking "
        });
    }
}

exports.updateBookingDetails=async(req,res)=>{
    // const booking=await Booking.findOne({_id:req.params.id});
    try
    {
        req.bookingInParams.theatreId=req.body.theatreId!=undefined?req.body.theatreId:req.bookingInParams.theatreId;
        req.bookingInParams.movieId=req.body.movieId!=undefined?req.body.movieId:req.bookingInParams.movieId;
        req.bookingInParams.noOfSeats=req.body.noOfSeats!=undefined?req.body.noOfSeats:req.bookingInParams.noOfSeats;
        req.bookingInParams.status=req.body.status!=undefined?req.body.status:req.bookingInParams.status;
        req.bookingInParams.totalCoast=req.body.totalCoast!=undefined?(req.bookedTheatre.ticketPrice*req.body.noOfSeats):req.bookingInParams.totalCoast;
        console.log("book",req.bookedTheatre.ticketPrice,req.body.noOfSeats)
        const updatebooking=await req.bookingInParams.save();

        // if(updatebooking.status==constant.status.cancelled)
        // {
        //     sendNotificationReq.bookingCancelled(req.user.email);
        // }
        return res.status(200).send(updatebooking)
    }catch(err)
    {
        console.log("####  error while updating booking details ####",err.message)
        return res.status(500).send({
            message:"Internal server error while updating booking details "
        })
    }



}