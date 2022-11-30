const validateMovieReq=require("./validateMovieReqBodies")
const validateUser=require("./validateUserReqBodies")
const validateInParams=require("./paramsVerifier")
const authJwt=require("./auth")
module.exports={
    validateInParams,
    validateMovieReq,
    validateUser,
    authJwt
}