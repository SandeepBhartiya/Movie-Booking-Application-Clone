const mongoose=require('mongoose');
const {paymentStatus}=require("../utils/constant");

const paymentSchema=new mongoose.Schema({

    bookingId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Booking"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:[paymentStatus.failed,paymentStatus.success]
    }

},{timestamps:true,versionKey:false});

module.exports=mongoose.model("Payment",paymentSchema);