const movieController=require("../controllers/movie.controller");
const {validateIdInParams,validateMovieReq}=require("../middelwares")
module.exports=(app)=>{
    app.post("/MBA/api/v1/Movie",[validateMovieReq.validateMovieReq.newMovieBody],movieController.createMovie);
    app.put("/MBA/api/v1/Movie/:id",[validateIdInParams.movieInParams,validateMovieReq.validateMovieReq.editMovieBody],movieController.editMovie);
    app.delete("/MBA/api/v1/Movie/:id",[validateIdInParams.movieInParams],movieController.deleteMovie);
    app.get("/MBA/api/v1/Movie",movieController.getAllMovies);
    app.get("/MBA/api/v1/Movie/:id",[validateIdInParams.movieInParams],movieController.getMovie);
}