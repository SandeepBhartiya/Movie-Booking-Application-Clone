const validateMovieReq=require("./validateMovieReqBodies")
const validateTheater=require("./validateTheatreReqBodies")
const validateUser=require("./validateUserReqBodies")
const validateInParams=require("./paramsVerifier")
const authJwt=require("./auth")
module.exports={
    validateInParams,
    validateMovieReq,
    validateTheater,
    validateUser,
    authJwt
}