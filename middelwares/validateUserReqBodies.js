const jwt=require('jsonwebtoken');

const  authConfig=require("../configs/secretKey.config");
const User=require("../models/user.model");
const constants=require("../utils/constant.util");

const AllowedUserType=[constants.userType.admin,constants.userType.customer,constants.userType.theatre_owner];
const AllowedUserStatus=[constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected];

const isValidEmail=(checkEmail)=>{
    return String(checkEmail).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const isValidPassword=(checkPassword)=>{
    return String(checkPassword).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,20}$/);
}


const signUpBody=async(req,res,next)=>{
    try
    {
        if(!req.body.name)
        {
            return res.status(400).send({
                message:"Failed!!! User Name is not Provided"
            })
        }

        if(!req.body.userId)
        {
            return res.status(400).send({
                message:"Failed!!! userId is not Provided"
            })
        }

        if(!req.body.password)
        {
            return res.status(400).send({
                message:"Failed!!! password is not Provided"
            })
        }
        else if(!isValidPassword(req.body.password))
        {
            return res.status(400).send({
                message:"Failed!!! Not a valid Password.password must be 10 to 20 characters with at least one lower case  letter,one upper case letter ,one numeric digit and one special character "
            })
        }
        if(!req.body.email)
        {
            return res.status(400).send({
                message:"Failed!!! email is not Provided"
            })
        }
        else if(!isValidEmail(req.body.email))
        {
            return res.status(400).send({
                message:"Failed!!! Not a valid emailId."
            })
        }

        if(!req.body.userType)
        {
            return res.status(400).send({
                message:"Failed!!! userType is not Provided"
            })
        }
        else if(req.body.userType==constants.userType.admin)
        {
            return res.status(400).send({
                message:"Failed!!! userType cannot be Admin"
            })
        }
        else if(!AllowedUserType.includes(req.body.userType))
        {
            return res.status(400).send({
                message:"Failed!!! userType provided is not correct.Possible correct values:CUSTOMER | THEATRE_OWNER"
            });
        }
        next();
    }
    catch(err)
    {
        console.log("#### error while validating  user signUp body ####",err.message);
        return res.status(500).send({
            message:"Internal server error while user signup validation"
        })
    }
}

const signInBody=async(req,res,next)=>{
   
    if(!req.body.userId)
    {
        return res.status(400).send({
            message:"Failed!!! UserId is not Provided"
        })
    }

    if(!req.body.password)
    {
        return res.status(400).send({
            message:"Failed!!! password is not Provided"
        })
    }

    next();
}

const userUpdateBody=async(req,res,next)=>{
    
    if(req.body.password && !isValidPassword(req.body.password))
    {
        return res.status(400).send({
            message:"Failed!!! Not a valid Password.password must be 10 to 20 characters with at least one lower case  letter,one upper case letter ,one numeric digit and one special character"
        });
    }

    if(req.body.email && !isValidEmail(req.body.email))
    {
        return res.status(400).send({
            message:"Failed!!!Not a valid Email Id"
        });
    }
    
    if(req.body.userType && !AllowedUserType.includes(req.body.userType))
    {
        return res.status(400).send({
            message:"Failed!!! Invalid UserType is Provided"
        });
    }

    if(req.body.userStatus && !AllowedUserStatus.includes(req.body.userStatus))
    {
        return res.status(400).send({
            message:"Failed!!! Invalid UserStatus is Provided"
        });
    }
    next();
}

const validateUser={
    signUpBody:signUpBody,
    signInBody:signInBody,
    userUpdateBody:userUpdateBody
}

module.exports=validateUser