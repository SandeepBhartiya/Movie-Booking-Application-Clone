const jwt=require('jsonwebtoken');

const Movie=require("../models/movie.model");
const User=require("../models/user.model");
const Theatre=require("../models/theatre.model");
const authConfig=require("../configs/secretKey.config");

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
    movieInParams:movieInParams,
    userInParams:userInParams,
    theatreInParams:theatreInParams,
    verifyRefrehToken:verifyRefrehToken
}

module.exports=validateInParams