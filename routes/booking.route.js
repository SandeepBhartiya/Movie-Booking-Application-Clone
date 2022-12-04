const bookingController=require("../controllers/booking.controller");
const {authJwt,validateInParams,validateBooking}=require("../middelwares")
module.exports=(app)=>{
    
    app.post("/MBA/api/v1/booking",[authJwt.verifyToken,validateBooking.validateBookingBody],bookingController.initiateBooking);
    
    app.get("/MBA/api/v1/booking/:id",[authJwt.verifyToken,validateInParams.bookingInParams,authJwt.isAdminOrOwnerOfBooking],bookingController.getSingleBooking);
    
    app.get("/MBA/api/v1/booking",[authJwt.verifyToken],bookingController.getAllbookings);

    app.put("/MBA/api/v1/booking/:id",[authJwt.verifyToken,validateInParams.bookingInParams,authJwt.isAdminOrOwnerOfBooking,validateBooking.validateBookingBody,validateBooking.validateupdateBookingBody],bookingController.updateBookingDetails);
}