const Booking=require("../models/booking.model");
const Payment=require("../models/payment.models");
const {status,paymentStatus}=require("../utils/constant");
const {ObjectChecker}=require("../utils/index");

const AllowedPaymentStatus=[paymentStatus.failed,paymentStatus.success];
const  newPaymentBody=async(req,res,next)=>{
    try
    {
        if(!req.body.bookingId)
        {
            return res.status(400).send({
                message:"Failed!!! BookingId is not Provided"
            });
        }else
        {
            if(!ObjectChecker.isValidObjectId(req.body.bookingId))
            {
                return res.status(400).send({
                    message:"Failed!!! Invalid bookingId provided"
                });
            }
        

            const booking=await Booking.findOne({_id:req.body.bookingId});
            console.log("Booking:",booking);
            if(!booking)
            {
                return res.status(400).send({
                    message:"Failed!!! BookingId provided is not Exist"
                });
            }
            else if(booking.status!=status.inProgress)
            {
                return res.status(400).send({
                    message:"Failed!!! booking status is not IN_PROGRESS"
                });
            }

            if(req.user._id.valueOf()!=booking.userId.valueOf())
            {
                return res.status(403).send({
                    message:"Failed!!! You cannot do the payment for this booking"
                });
            }
            req.booking=booking;
        }

        if(!req.body.amount)
        {
            return res.status(400).send({
                message:"Failed!!!! Amount is not provided"
            });
        }else
        {
            if(typeof req.body.amount!="number")
            {
                return res.status(400).send({
                    message:"Failed!!!Amount provided is not in correct formate(Number)"
                });
            }

            if(req.booking.totalCoast!=req.body.amount)
            {
                return res.status(400).send({
                    message:"Failed!!! Amount does not match the total cost of booking"
                });
            }
        }
        if(!req.body.status)
        {
            return res.status(400).send({
                message:"Failed!!! Payment status is not Provided"
            });
        }
        else if(!AllowedPaymentStatus.includes(req.body.status))
        {
            return res.status(400).send({
                message:"Failed!!! Invalid Payment Status is provided"
            });
        }
        next();
    }
    catch(err)
    {
        console.log("#### error while new payment body validation ####",err.message);
        return res.status(500).send({
            message:"Internal server error while new payment body validation"
        })
    }
}

const validatingPayment={
    newPaymentBody
}
module.exports=validatingPayment;