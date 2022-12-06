
const Theatre=require("../models/theatre.model")
const Movie=require("../models/movie.model")
const User=require("../models/user.model")
const {userType}=require("../utils/constant");


exports.createNewTheatre=async(req,res)=>{

    const theatreObj={
        ownerId: req.user.userType==userType.admin? req.body.ownerId:req.user._id, 
        name:req.body.name,
        description:req.body.description,
        city:req.body.city,
        pinCode:req.body.pinCode,
        showTypes:req.body.showTypes,
        numberOfSeats:req.body.numberOfSeats,
        ticketPrice:req.body.ticketPrice
    };
    try
    {
        const newTheatre=await Theatre.create(theatreObj);
        const theatreOwner=await User.findOne({_id:newTheatre.ownerId});
        theatreOwner.theatresOwned.push(newTheatre._id);
        await theatreOwner.save();

        console.log(`#### new Theatre " ${newTheatre.name} " Created ####`)
        res.status(201).send(newTheatre)
    }
    catch(err)
    {
        console.log("#### Error while creating New Theatre ####",err.message);
        res.status(500).send({
            message:"Internal server error while creating new Theatre"
        });
    }


}

exports.editTheatre=async(req,res)=>{
    try
    {

        const theatre=req.theatreInParams;
        theatre.name=req.body.name?req.body.name:theatre.name,
        theatre.description=req.body.description?req.body.description:theatre.description,
        theatre.city=req.body.city?req.body.city:theatre.city,
        theatre.pinCode=req.body.pinCode?req.body.pinCode:theatre.pinCode,
        theatre.showTypes=req.body.showTypes?req.body.showTypes:theatre.showTypes,
        theatre.numberOfSeats=req.body.numberOfSeats?req.body.numberOfSeats:theatre.numberOfSeats,
        theatre.ticketPrice=req.body.ticketPrice?req.body.ticketPrice:theatre.ticketPrice
        
        const updateTheatre=await theatre.save();   

        console.log(`#### Theatre '${updateTheatre.name}' data updated ####`);
        res.status(200).send(updateTheatre)
    }
    catch(err)
    {
        console.log("#### Error while updating  Theatre ####",err.message);
        res.status(500).send({
            message:"Internal server error while updating Theatre"
        });
    }
}

exports.deleteTheatre=async(req,res)=>{
    try
    {
        const theatre=req.theatreInParams;
        const theatreOwner =await User.findOne({_id:theatre.ownerId});
        await theatreOwner.theatresOwned.remove(theatre._id);
        await theatreOwner.save();
        await theatre.remove();

        console.log(`#### Theater Deleted ####`)
        res.status(200).send({
            message:"Theater Delete "
        })
    }
    catch(err)
    {
        console.log("Internal server error while deleting theater",err.message);
        res.status(500).send({
            message:"Internal server error while deleting theater"
        })
    }

}


exports.getAllTheatres=async(req,res)=>{
    try
    {
        const theatres=await Theatre.find();
        res.status(200).send(theatres)
    }catch(err)
    {
        console.log("Internal server error while getting All theater",err.message);
        res.status(500).send({
            message:"Internal server error while getting All theater"
        });
    }

}

exports.getSingleTheatre=async(req,res)=>{
    try
    {

        const theatre=req.theatreInParams;
        res.status(200).send(theatre)
    }catch(err)
    {
        console.log("Internal server error while getting Single theater",err.message);
        res.status(500).send({
            message:"Internal server error while getting Single theater"
        });
    }
}

exports.getMoviesInTheatre=async(req,res)=>{
    try
    {
        const movies=await Movie.find({_id:req.theatreInParams.movies})
        res.status(200).send(movies)
    }
    catch(err)
    {
        console.log("Internal server error while getting Movies In theater",err.message);
        res.status(500).send({
            message:"Internal server error while getting getting Movies In theater"
        });
    }
}


exports.editMoviesInTheater=async(req,res)=>{
    try
    {    
        const theatre=req.theatreInParams;
        if(req.body.addMovies)
        {
            for(e of req.body.addMovies)
            {
                 await theatre.movies.push(e);
                let temp=await Movie.findOne({_id:e});
                temp.theatres.push(theatre._id);
                await temp.save();
            }

        }

        if(req.body.removeMovies)
        {
            for(e of req.body.removeMovies)
            {
                await theatre.movies.remove(e);
                let movie=await Movie.findOne({_id:e});
                 movie.theatres.remove(theatre._id);
                await movie.save();
            }
        }
        await theatre.save();
        res.status(200).send({
            message:"Updated movies in Theatre"
        })
    }
    catch(err)
    {
        console.log("Internal server error while editting Movies In theater",err.message);
        res.status(500).send({
            message:"Internal server error while editting getting Movies In theater"
        });
    }
}