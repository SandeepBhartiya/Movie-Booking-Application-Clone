const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require("../models/user.model");
const secret=require("../configs/secretKey.config");
const constants=require("../utils/constant.util");


exports.signUp=async(req,res)=>{
    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        email:req.body.email,
        userType:req.body.userType,
        userStatus:req.body.userType==constants.userType.customer?constants.userStatus.approved:constants.userStatus.pending
    }
    try
    {
        const newUser=await User.create(userObj);
        res.status(201).send(newUser)
    }
    catch(err)
    {
        console.log("#### Error while creating a new User ####",err.message);
        res.status(500).send({
            message:"---- Error while user signUp ---- "
        })
    }
}


exports.signIn=async(req,res)=>{
    try
    {
        const user=req.userId;
        const accessToken=jwt.sign({id:user.userId},secret.secretKey,{
            expiresIn:secret.ACCESS_TOKEN
        });

        const refreshToken=jwt.sign({id:user.userId},secret.secretKey,{
            expiresIn:secret.REFERESH_TOKEN
        });
     
        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            accessToken:accessToken,
            refreshToken:refreshToken
        });

    }
    catch(err)
    {
        console.log("#### Error while user signIn ####");
        res.status(500).send({
            message:"---- Error while user signIn ----"
        })
    }

}

exports.refreshAccessToken=async (req,res)=>{
    const accessToken=jwt.sign({id:req.user.userId},secret.secretKey,{
        expiresIn:secret.ACCESS_TOKEN
    });
    res.status(200).send({
        accessToken:accessToken
    })
}