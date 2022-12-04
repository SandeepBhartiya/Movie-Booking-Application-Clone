const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs');

const User=require("../models/user.model");
const Movie=require("../models/movie.model");
const Theatre=require("../models/theatre.model");
const constants=require("../utils/constant.util");
const authConfig=require("../configs/secretKey.config");


const verifyToken=async(req,res,next)=>{
    const token=req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).send({
            message:"Token is not Provided"
        })
    }
    jwt.verify(token,authConfig.secretKey, async (err,decoded)=>{
        if(err)
        {
            console.log(err.message);
            return res.status(401).send({
                message:"UnAuthorised!!!"
            });
        }
        const user=await User.findOne({userId:decoded.id});
        if(!user)
        {
            return res.status(400).send({
                message:"the user that this token belongs to does not exist"
            })
        }
        req.user=user
        next();
    })
}

//Check if userType of user is Admin or Not
const isAdmin=async(req,res,next)=>{
    const user=req.user;
   
    if(user && user.userType==constants.userType.admin)
    {
        next();
    }else
    {
        return res.status(500).send({
        message:"Failed!!! Only Admin can access this endpoint"
        })
    }
}

const isAdminorOwner=async(req,res,next)=>{
    try
    {    
        const user=req.user;
        console.log("USERS",user,req.params.id,user.user)
        if(user.userType==constants.userType.admin ||user.userId==req.params.id)
        {
            next();
        }
        else
        {
            return res.status(400).send({
                message:"Failed!!!! Only Admin and Owner is allowed to access this endpoint"
            })
        }
    }
    catch(err)
    {
        console.log("#### Error while reading user data ####")
        return res.status(500).send({
            message:"Internal server error while while reading user data"
            })
    }
}






const isTheatreOrAdmin=async(req,res,next)=>
{
    try
    {
        const allowedUserTypes=[constants.userType.admin,constants.userType.theatre_owner]
        if(allowedUserTypes.includes(req.user.userType))
        {
            next();
        }else{  
            return res.status(403).send({
                message:"only theatre and admin are allowed to access this endpoint"
            })
        }
    }
    catch(err)
    {
        console.log("#### Internal server error while authenticating user data ####",err.message);
        return res.status(500).send({
            message:"Internal server error while authenticating user data"
        })
    }
}

const isAdminOrOwnerOfBooking=async(req,res,next)=>{
    try
    {
        if(req.user.userType!=constants.userType.admin )
        {
            if(req.bookingInParams.userId.valueOf()!=req.user._id.valueOf())
            {
                return res.status(400).send({
                    message:"Failed!!! Only the Admin or Owner of Booking   can access this endpoint"
                })
            }
        }
        next();
    }
    catch(err)
    {
        console.log("#### Error while  validating usertype is Admin or Owner of Booking ####",err.message);
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}

const isValidTheaterOwner=async(req,res,next)=>{
    try
    {  
        if(req.user.userType==constants.userType.theatre_owner)
        {
            const theatre=req.theatreInParams;
            if(theatre.ownerId.equals(req.user._id))
            {
                next();
            }
            else
            {
                return res.status(403).send({
                    message:"only valid theatre allowed to access this endpoint"
                })
            }
        }
    }
    catch(err)
    {
        console.log("#### Internal server error while validation theatre Owner ####",err.message);
            return res.status(500).send({
                message:"Internal server error while validation theatre Owner"
            })
    }
}

//Check wether user Exist or Not
const isUserExist=async(req,res,next)=>{
    try
    {
        const user=await User.findOne({userId:req.body.userId});      
        if(!user)
        {
            return res.status(401).send({
                message:"Failed!!! User does not Exist"
            })
        }
        req.userId=user;
        next();
    }
    catch(err)
    {
        console.log("#### Internal server error while finding user ####",err.message)
        return res.status(500).send({
            message:"Internal server error while finding user"
        })
    }

}

//Check if enter password by User is valid or not
const isPasswordValid=async(req,res,next)=>{
    try
    {
        const user=req.userId;
        const isValid=bcrypt.compareSync(req.body.password,user.password);        
        if(!isValid)
        {
            return res.status(401).send({
                message:"Incorrect password is provided"
            })
        }
        next();
    }
    catch(err)
    {
        console.log("Internal server error while Validating Password",err.message)
        return res.status(500).send({
            message:"Internal server error while Validating Password"
        })
    }

}


const isUserUnique=async(req,res,next)=>{
    try
    {
        const user=await User.findOne({userId:req.body.userId});      
        if(user)
        {
            return res.status(401).send({
                message:"Failed!!! UserId Already Taken"
            })
        }
        next();
    }
    catch(err)
    {
        console.log("#### Internal server error while checking userId is Unique ####",err.message)
        return res.status(500).send({
            message:"Internal server error while checking userId is Unique"
        })
    }

}

const isEmailUnique=async(req,res,next)=>{
    try
    {
        const user=await User.findOne({email:req.body.email});      
        console.log(user)
        if(user)
        {
            return res.status(401).send({
                message:"Failed!!! User has Already signUp using this Email Please provide Different Email for signUp..."
            })
        }
        next();
    }
    catch(err)
    {
        console.log("#### Internal server error while checking Email is Unique ####",err.message)
        return res.status(500).send({
            message:"Internal server error while checking Email is Unique"
        });
    }
}

const isTitleUnique=async(req,res,next)=>{
    try
    {
        const movie=await Movie.findOne({title:req.body.title});
        if(movie)
        {
            return res.status(400).send({
                message:"Failed!!! Movie with the same title Name is already Exist"
            })
        }
        next();
    }catch(err)
    {
        console.log("#### Internal server error while checking Title is Unique ####",err.message)
        return res.status(500).send({
            message:"Internal server error while checking Title is Unique"
        });
    }
}

const authJwt={
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isAdminorOwner:isAdminorOwner,
    isTheatreOrAdmin:isTheatreOrAdmin,
    isValidTheaterOwner:isValidTheaterOwner,
    isAdminOrOwnerOfBooking:isAdminOrOwnerOfBooking,
    isPasswordValid:isPasswordValid,
    isUserExist:isUserExist,
    isUserUnique:isUserUnique,
    isEmailUnique:isEmailUnique,
    isTitleUnique:isTitleUnique
}

module.exports=authJwt
