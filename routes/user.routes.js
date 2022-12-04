const userController=require("../controllers/user.controller");
const {authJwt,validateInParams,validateUser}=require("../middelwares")
module.exports=(app)=>{
    //only Admin  can access this endpoint
    app.get("/MBA/api/v1/user",[authJwt.verifyToken,authJwt.isAdmin],userController.findAllUser);
    
    //only Admin or owner  can access this endpoint
    app.get("/MBA/api/v1/user/:id",[authJwt.verifyToken,validateInParams.userInParams,authJwt.isAdminorOwner],userController.findSingleUser);
   
    //only Admin or  owner can access this endpoint
    app.put("/MBA/api/v1/user/:id",[authJwt.verifyToken,validateInParams.userInParams,authJwt.isAdminorOwner,validateUser.userUpdateBody],userController.updateUser)
}