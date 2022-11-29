const mongoose=require('mongoose');
const {userType,userStatus}=require("../utils/constant.util")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true,
        trim:true
    },
    userType:{
        type:String,
        required:true,
        default:userType.customer,
        enum:[userType.admin,userType.customer,userType.theatre_owner]
    },
    userStatus:{
        type:String,
        required:true,
        default:userStatus.pending,
        enum:[userStatus.approved,userStatus.pending,userStatus.rejected]
    },
    theatresOwned:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],
        ref:"Theatre"
    },
    myBookings:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],
        ref:"Booking"
    },
    myPayments:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],
        ref:"Payment"
    }
},{timestamps:true,versionKey:false});

module.exports=mongoose.model("user",userSchema);