const theatreController=require("../controllers/theatre.controller");
const {authJwt,validateInParams,validateTheater}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/Theatre",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateTheater.newTheatreBody],theatreController.createNewTheatre);
    app.put("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner,validateTheater.editTheaterBody],theatreController.editTheatre);
    app.delete("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner],theatreController.deleteTheatre);

    app.get("/MBA/api/v1/Theatre",[authJwt.verifyToken],theatreController.getAllTheatres)
    app.get("/MBA/api/v1/Theatre/:id",[authJwt.verifyToken,validateInParams.theatreInParams],theatreController.getSingleTheatre)

    app.get("/MBA/api/v1/Theatre/:id/movies",[authJwt.verifyToken,validateInParams.theatreInParams],theatreController.getMoviesInTheatre);
    app.put("/MBA/api/v1/Theatre/:id/movies",[authJwt.verifyToken,authJwt.isTheatreOrAdmin,validateInParams.theatreInParams,authJwt.isValidTheaterOwner,validateTheater.editMovieInTheaterBody],theatreController.editMoviesInTheater)
}