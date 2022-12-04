const movieController=require("../controllers/movie.controller");
const {validateInParams,validateMovieReq,authJwt}=require("../middelwares")
module.exports=(app)=>{

    //only Admin can access this endpoint
    app.post("/MBA/api/v1/Movie",[authJwt.verifyToken,authJwt.isAdmin,authJwt.isTitleUnique,validateMovieReq.validateMovieReq.newMovieBody],movieController.createMovie);
    
    //only Admin can access this endpoint

    // app.put("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,authJwt.isAdmin,,authJwt.isTitleUnique,validateInParams.movieInParams,validateMovieReq.validateMovieReq.editMovieBody],movieController.editMovie);
   
    //only Admin can access this endpoint
    app.delete("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,authJwt.isAdmin,validateInParams.movieInParams],movieController.deleteMovie);
    
    //any user can access this endpoint
    app.get("/MBA/api/v1/Movie",[authJwt.verifyToken],movieController.getAllMovies);
    
    //any user can access this endpoint
    app.get("/MBA/api/v1/Movie/:id",[authJwt.verifyToken,validateInParams.movieInParams],movieController.getMovie);
}