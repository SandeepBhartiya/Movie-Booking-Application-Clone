const mongoose=require("mongoose");
const constants=require("../utils/constant.util");

const movieSchema=new mongoose.Schema({
    name:{
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
        default:constants.releaseStatus.coming_soon,
        enum:[constants.releaseStatus.blocked,constants.releaseStatus.coming_soon,constants.releaseStatus.released]
    },
    imbRating:{
        type:Number
    },
    genre:{
        type:[String],
        default:constants.genre.action,
        enum:[constants.genre.action,constants.genre.comedy,constants.genre.drama,constants.genre.fantasy,constants.genre.horror,constants.genre.mystery,constants.genre.romance,constants.genre.thriller]
    }
},{timestamps:true,versionKey:false});

module.exports=mongoose.model("movie",movieSchema);