const validateMovieReq=require("./validateMovieReqBodies")
const validateUser=require("./validateUserReqBodies")
const validateIdInParams=require("./paramsVerifier")
const authJwt=require("./auth")
module.exports={
    validateIdInParams,
    validateMovieReq,
    validateUser,
    authJwt
}