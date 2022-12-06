const validateMovieReq=require("./validateMovieReqBodies")
const validateTheater=require("./validateTheatreReqBodies")
const validateUser=require("./validateUserReqBodies")
const validateInParams=require("./paramsVerifier")
const validateBooking=require("./validateBookingReqBodies")
const validatingPayment=require("./paymentBookingReqBodies")
const authJwt=require("./auth")
module.exports={
    validateInParams,
    validateMovieReq,
    validateTheater,
    validateBooking,
    validatingPayment,
    validateUser,
    authJwt
}