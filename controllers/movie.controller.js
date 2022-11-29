const Movie=require("../models/movie.model");

exports.createMovie=async(req,res)=>{
    const movieObj={
        name:req.body.name,
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
    try
    {

    }
    catch(err)
    {
        console.log("#### Error while creating Movie ####",err.message)
        res.status(500).send("Internal Server Error while creating Movie")
    }
}