const mongoose=require('mongoose');
const {releaseStatus,genre}=require("../utils/constant");

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    casts:{
        type:[String],
        required:true
    },
    trailerUrls:{
        type:[String],
        required:true
    },
    posterUrls:{
        type:[String],
        required:true
    },
    language:{
        type:[String],
        required:true
    },
    releaseDate:{
        type:Date
    },
    releaseStatus:{
        type:String,
        required:true,
        default:releaseStatus.coming_soon,
        enum:[releaseStatus.blocked,releaseStatus.coming_soon,releaseStatus.released]
    },
    imbRating:{
        type:Number
    },
    genre:{
        type:[String],
        default:genre.action,
        enum:[genre.action,genre.comedy,genre.drama,genre.fantasy,genre.horror,genre.mystery,genre.romance,genre.thriller]
    },
    theatres:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Theatre",
        required:true
    },
    bookings:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"",
        required:true
    }
},{timestamps:true,versionKey:false});

module.exports=mongoose.model("Movie",movieSchema);