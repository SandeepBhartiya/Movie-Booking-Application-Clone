const authController=require("../controllers/auth.controller");
const {validateUser,authJwt,validateInParams}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/auth/signUp",[validateUser.signUpBody,authJwt.isUserUnique,authJwt.isEmailUnique],authController.signUp);
    app.post("/MBA/api/v1/auth/signIn",[validateUser.signInBody,authJwt.isUserExist,authJwt.isPasswordValid],authController.signIn);
    app.post("/MBA/api/v1/auth/refreshToken",[validateInParams.verifyRefrehToken],authController.refreshAccessToken)
}