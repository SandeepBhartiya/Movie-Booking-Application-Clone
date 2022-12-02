const bcrypt=require('bcryptjs')

const User=require("../models/user.model");
const constant=require("../utils/constant.util")
exports.findAllUser=async(req,res)=>{
    const queryObj={}
    const userTypeQP=req.query.userType;
    const userStatusQP=req.query.userStatus;
    
    if(userTypeQP)
    {
        queryObj.userType=userTypeQP
    }
    if(userStatusQP)
    {
        queryObj.userStatus=userStatusQP
    }
    console.log(queryObj)
    
    try
    {
        const user =await User.find(queryObj);
        res.status(200).send(user);
    }
    catch(err)
    {
        console.log("Internal server error while finding user",err.message)
        res.status(500).send({
            message:"Internal server error while finding user"
        });
    }
}

exports.findSingleUser=async(req,res)=>{
    try
    {
        const user=req.userInParams;
        console.log("User",user)
        res.status(200).send(user)
    }
    catch(err)
    {
        console.log("Internal server error while finding Single user",err.message)
        res.status(500).send({
            message:"Internal server error while finding Single user"
        });
    }
}

exports.updateUser=async(req,res)=>{
    try
    {

        const user =req.userInParams;

        user.name=req.body.name?req.body.name:user.name;
        user.password=req.body.password?bcrypt.hashSync(req.body.password):user.password
        user.email=req.body.email?req.body.email:user.email;

        if(req.user.userType==constant.userType.admin)
        {
            user.userType=req.body.userType?req.body.userType:user.userType;
            user.userStatus=req.body.userStatus?req.body.userStatus:user.userStatus;
        }

        const updateUser= await user.save();
        res.status(200).send(updateUser);
    }
    catch(err)
    {
        console.log("Internal server error while Updating user",err.message)
        res.status(500).send({
            message:"Internal server error while Updating user"
        });
    }
}