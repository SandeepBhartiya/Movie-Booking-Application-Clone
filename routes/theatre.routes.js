const theatreController=require("../controllers/theatre.controller");
const {authJwt,validateInParams,validateTheater}=require("../middelwares")
module.exports=(app)=>{
    
    //only Admin or TheatreOwner can access this endpoint
    app.post("/MBA/api/v1/Theatre",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateTheater.newTheatreBody],theatreController.createNewTheatre);
    
    //only Admin or TheatreOwner can access this endpoint
    app.put("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner,validateTheater.editTheaterBody],theatreController.editTheatre);
     
    //only Admin or TheatreOwner can access this endpoint
    app.delete("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner],theatreController.deleteTheatre);
    

    //any verified user can access this endpoint
    app.get("/MBA/api/v1/Theatre",[authJwt.verifyToken],theatreController.getAllTheatres)
    
    //any  verified user can access this endpoint
    app.get("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,validateInParams.theatreInParams],theatreController.getSingleTheatre)


     //any  verified user can access this endpoint
    app.get("/MBA/api/v1/Theatre/:id/movies",[authJwt.verifyToken,validateInParams.theatreInParams],theatreController.getMoviesInTheatre);
     
    //only Admin or TheatreOwner can access this endpoint
    app.put("/MBA/api/v1/Theatre/:id/movies",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner,validateTheater.editMovieInTheaterBody],theatreController.editMoviesInTheater)
}