const theatreController=require("../controllers/theatre.controller");
const {authJwt}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/Theatre",[authJwt.verifyToken,authJwt.isTheatreOrAdmin],theatreController.createNewTheatre);
}