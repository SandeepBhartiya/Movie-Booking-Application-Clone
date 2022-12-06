const mongoose=require('mongoose');
const {status}=require('../utils/constant');

const bookingSchema=new mongoose.Schema({
    totalCoast:{
        type:Number,
        required:true
    },
    theatreId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Theatre"
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Movie"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    ticketBookedTime:{
        type:Date,
        required:true,
        immutable:true
    },
    noOfSeats:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:status.inProgress,
        enum:[status.inProgress,status.completed,status.cancelled,status.failed]
    }
},{timestamps:true,versionKey:false});


module.exports=mongoose.model("Booking",bookingSchema);