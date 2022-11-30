const movieController=require("../controllers/movie.controller");
const {validateInParams,validateMovieReq,authJwt}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/Movie",[authJwt.verifyToken,authJwt.isAdmin,authJwt.isTitleUnique,validateMovieReq.validateMovieReq.newMovieBody],movieController.createMovie);
    app.put("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,authJwt.isAdmin,validateInParams.movieInParams,validateMovieReq.validateMovieReq.editMovieBody],movieController.editMovie);
    app.delete("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,authJwt.isAdmin,validateInParams.movieInParams],movieController.deleteMovie);
    app.get("/MBA/api/v1/Movie",[authJwt.verifyToken],movieController.getAllMovies);
    app.get("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,authJwt.isAdmin,validateInParams.movieInParams],movieController.getMovie);
}