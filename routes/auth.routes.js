const authController=require("../controllers/auth.controller");
const {validateUser}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/auth/signUp",[validateUser.signUpBody],authController.signUp);
    app.post("/MBA/api/v1/auth/signIn",[validateUser.signInBody],authController.signIn);
}