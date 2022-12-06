const mongoose=require('mongoose');
const {theatreShows}=require("../utils/constant");

const theatreSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    showTypes:{
        type:[String],
        required:true,
        enum:[theatreShows.evening,theatreShows.morning,theatreShows.noon,theatreShows.night]
    },
    numberOfSeats:{
        type:Number,
        required:true
    },
    movies:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],
        ref:"Movie"
    },
    ticketPrice:{
        type:Number,
        required:true
    }
},{timestamps:true,versionKey:false});

module.exports=mongoose.model("Theatre",theatreSchema);
