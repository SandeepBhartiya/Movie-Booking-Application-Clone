const User=require("../models/user.model")
const constants=require("../utils/constant.util")

const isAdmin=async(req,res,next)=>{
    const user=req.userInParams;
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

const authJwt={
    isAdmin:isAdmin
}

module.exports=authJwt
