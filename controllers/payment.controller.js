const Payment=require("../models/payment.models");
const {userType,paymentStatus,status}=require("../utils/constant");
const sendNotificationReq=require("../utils/sendEmailRequest");

exports.getAllPayments=async(req,res)=>{
    try{
        let queryObj={};

        if(req.user.userType!=userType.admin)
        {
            queryObj._id=req.user.myPayments;
        }

        const payments=await Payment.findOne(queryObj);
        res.status(200).send(payments)
    }
    catch(err)
    {
        console.log("Errro while getting all payments records",err.message);
        res.status(500).send({
            message:"Internal server error"
        });
    }
}


exports.getSinglePayment=async(req,res)=>{
    try
    {
        const payment=req.paymentInParams;
        res.status.send(payment);
    }
    catch(err)
    {
        console.log("#### error while getting payment  ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting payment"
        })
    }
}


exports.createPayment=async(req,res)=>{
    try
    {
        const paymentObj={
            bookingId:req.body.bookingId,
            amount:req.body.amount,
            status:req.body.status
        }

        const payment=await Payment.create(paymentObj);
        if(payment.status==paymentStatus.success)
        {
            req.booking.status=status.completed,
            sendNotificationReq.successfulTicketPayment(req.user.email,payment);
        }
        else
        {
            req.booking.status=status.failed,
            sendNotificationReq.failedTicketPayment(req.user.email,payment);
        }
        await req.booking.save();
        req.user.myPayments.push(payment._id);
        await req.user.save();

        res.status(201).send(payment)
    }
    catch(err)
    {
        console.log("error while creating new payment",err.message);
        res.status(500).send({
            message:"Internal serve error while creating new payment"
        })
    }
}