const userController=require("../controllers/user.controller");
const {authJwt,validateInParams,validateUser}=require("../middelwares")
module.exports=(app)=>{
    app.get("/MBA/api/v1/user",[authJwt.verifyToken,authJwt.isAdmin],userController.findAllUser);
    app.get("/MBA/api/v1/user/:id",[authJwt.verifyToken,validateInParams.userInParams,authJwt.isAdminorOwner],userController.findSingleUser);
    app.put("/MBA/api/v1/user/:id",[authJwt.verifyToken,validateInParams.userInParams,authJwt.isAdminorOwner,validateUser.userUpdateBody],userController.updateUser)
}