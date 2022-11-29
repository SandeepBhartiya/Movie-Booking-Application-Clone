const { movieInParams } = require("../middelwares/paramsVerifier");
const { updateMany } = require("../models/movie.model");
const Movie=require("../models/movie.model");
const objectConverter=require("../utils/objectConverter")
exports.createMovie=async(req,res)=>{
    try
    {
        const movieObj={
            title:req.body.title,
            description:req.body.description,
            casts:req.body.casts,
            trailerUrls:req.body.trailerUrls,
            posterUrls:req.body.posterUrls,
            language:req.body.language,
            releaseDate:req.body.releaseDate,
            releaseStatus:req.body.releaseStatus,
            imbRating:req.body.imbRating,
            genre:req.body.genre
        };
        const newMovie=await Movie.create(movieObj)
        res.status(201).send(newMovie) //in future try to send newMovie by using objectConverter
    }
    catch(err)
    {
        console.log("#### Error while creating Movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while creating Movie"
        });
    }
}

exports.editMovie=async(req,res)=>{
    try
    {

        const movie=req.movieInParams;
        movie.title=req.body.title?req.body.title:movie.title;
        movie.description=req.body.description?req.body.description:movie.description;
        movie.casts=req.body.casts?req.body.casts:movie.casts;
        movie.trailerUrls=req.body.trailerUrls?req.body.trailerUrls:movie.trailerUrls;
        movie.posterUrls=req.body.posterUrls?req.body.posterUrls:movie.posterUrls;
        movie.language=req.body.language?req.body.language:movie.language;
        movie.releaseDate=req.body.releaseDate?req.body.releaseDate:movie.releaseDate;
        movie.releaseStatus=req.body.releaseStatus?req.body.releaseStatus:movie.releaseStatus;
        movie.imbRating=req.body.imbRating?req.body.imbRating:movie.imbRating;
        movie.genre=req.body.genre?req.body.genre:movie.genre;
    
        const updateMovie=await movie.save();
        res.status(200).send(updateMovie);
    }
    catch(err)
    {
        console.log("#### Error while updating Movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while updating Movie"
        });
    }
}


exports.deleteMovie=async(req,res)=>{
    try
    {
        const movie=req.movieInParams; //need ffuture update for theather
        res.status(200).send({
            message:"Movie deleted successfully "
        })
    }
    catch(err)
    {
        console.log("#### Error while deleting Movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while deleting Movie"
        });
    }
}

exports.getAllMovies=async(req,res)=>{
    try
    {
        const movie=await Movie.find();
        res.status(200).send(movie)
    }
    catch(err)
    {
        console.log("#### Error while getting all Movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while getting all Movie"
        });
    }
}


exports.getMovie=async(req,res)=>{
    try
    {
        const movie=req.movieInParams;
        res.status(200).send(movie)
    }
    catch(err)
    {
        console.log("#### Error while getting Movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while getting Movie"
        });
    }
}