const jwt=require('jsonwebtoken');

const Movie=require("../models/movie.model");
const User=require("../models/user.model");
const Theatre=require("../models/theatre.model");
const Booking=require("../models/booking.model");
const authConfig=require("../configs/secretKey.config");
const Payment=require("../models/payment.models");

const movieInParams=async(req,res,next)=>{
    try
    {
        
        const movie=await Movie.findOne({_id:req.params.id});
        if(!movie)
        {
            return res.status(400).send({
                message:"Movie Id passed doesn't exist"
            });
        }
        req.movieInParams=movie;
        next();
    }
    catch(err)
    {
        console.log("####Error while reading movie info ####",err.message);
        return res.status(500).send({
            message:"Internal server error while reading movie data"
        })
    }
}

const userInParams=async(req,res,next)=>{
    try
    {
        const user=await User.findOne({userId:req.params.id});
        if(!user)
        {
            return res.status(400).send({
                message:"Failed!!!User does not Exist "
            })
        }
        req.userInParams=user;
        next();
    }
    catch(err)
    {
        console.log("#### Error while reading user info ####")
        return res.status(500).send({
            message:"Internal server error while reading User info"
        })
    }
}

const theatreInParams=async(req,res,next)=>{
    try
    {
        const theatre=await Theatre.findOne({_id:req.params.id});
        if(!theatre)
        {
            return res.status(400).send({
                message:"Failed!!!Theatre does not Exist "
            })
        }
        req.theatreInParams=theatre;
        next();
    }
    catch(err)
    {
        console.log("#### Error while reading user info ####")
        return res.status(500).send({
            message:"Internal server error while reading User info"
        })
    }
}

const bookingInParams=async(req,res,next)=>{
    try
    {
        const booking=await Booking.findOne({_id:req.params.id});
        if(!booking)
        {
            return res.status(400).send({
                message:"Failed!!! BookingId  Provided is not Valid "
            })
        }
        req.bookingInParams=booking;
        next();
    }
    catch(err)
    {
        console.log("#### error while getting booking data ####",err.message)
        res.status(500).send({
            message:"Internal server error while getting booking data"
        })
    }
}
const paymentInParams=async (req,res,next)=>{
    try
    {
        const payment=await Payment.findOne({_id:req.params.id});
        if(!payment)
        {
            return res.status(400).send({
                message:"Failed!!! Payment Id passed doesn't exist"
            })
        }
        req.paymentInParams=payment
        next();
    }
    catch(err)
    {
        console.log("#### Error while reading the payment data ####",err.message);
        return res.status(500).send({
            message:"Internal server error while reading the payment data"
        })
    }
}
const verifyRefrehToken=async(req,res,next)=>{
    const token=req.headers["x-refresh-token"];
    jwt.verify(token,authConfig.secretKey,async (err,decoded)=>{
        if(err)
        {
            return res.status(401).send({
                message:"UnAuthorised!"
            })
        }
        const user =await User.findOne({userId:decoded.id});
        if(!user)
        {
            return res.status(400).send({
                message:"The user that this token belongs to does not exist"
            })
        }
        req.user=user
        next();
    })
}
const validateInParams={
    userInParams:userInParams,
    movieInParams:movieInParams,
    theatreInParams:theatreInParams,
    bookingInParams:bookingInParams,
    paymentInParams:paymentInParams,
    verifyRefrehToken:verifyRefrehToken
}

module.exports=validateInParams