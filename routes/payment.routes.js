const paymentController=require('../controllers/payment.controller');
const {authJwt,validateInParams,validatingPayment}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/payments",[authJwt.verifyToken,validatingPayment.newPaymentBody],paymentController.createPayment);
    app.get("/MBA/api/v1/payments",[authJwt.verifyToken],paymentController.getAllPayments);
    app.get("/MBA/api/v1/payments/:id",[authJwt.verifyToken,validateInParams.paymentInParams,authJwt.isAdminorOwnerofPayment],paymentController.getSinglePayment);
}