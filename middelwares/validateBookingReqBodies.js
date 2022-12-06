const Theatre=require("../models/theatre.model");
const Movie=require("../models/movie.model");

const {constants,ObjectChecker}=require("../utils")


const validateBookingBody=async(req,res,next)=>{
    try
    {
        
        if(!req.bookingInParams)
        {
            
            if(!req.body.movieId)
            {
                return res.status(400).send({
                    message:"Failed!!! movieId is not Provided"
                })
            }
            
            if(!req.body.theatreId)
            {
                return res.status(400).send({
                    message:"Failed!!! theatreId is not Provided"
                })
            }
            
            if(!req.body.noOfSeats)
            {
                return res.status(400).send({
                    message:"Failed!!! noOfSeats is not Provided"
                })
            }
        }
        let theatre;
        let movie;
        
        if(req.body.theatreId)
        {

            
            if(!ObjectChecker.isValidObjectId(req.body.theatreId))
            {
                return res.status(400).send({
                    message:"Failed!!! invalid theatreId Provided"
                });
            }
            
            theatre=await Theatre.findOne({_id:req.body.theatreId});
            
            if(!theatre)
            {
                return res.status(400).send({
                    message:"Failed!!! Theatre provided does not exist"
                });
            }
            
            if(req.body.bookingInParams && !req.body.movieId)
            {
                if(theatre.movies.includes(req.bookingInParams.movieId))
                {
                    return res.status(400).send({
                        message:"Failed!!! The current movieId does not present in the new Theatre"
                    });
                }
            }
            
            req.bookedTheatre=theatre;

            console.log(req.bookedTheatre.numberOfSeats);
        }
        else if(req.bookingInParams)
        {
            req.bookedTheatre=req.bookingInParams.theatrId;
        }

        
        if(req.body.movieId)
        {
            
            if(!ObjectChecker.isValidObjectId(req.body.movieId))
            {
                return res.status(400).send({
                    message:"Invalid movieId provided"
                });
            }
            else
            {
                
                movie=await Movie.findOne({_id:req.body.movieId});
                
                if(!movie)
                {
                    return res.status(400).send({
                        message:"MovieId provided does not exist"
                    });
                }
                else if(!theatre.movies.includes(movie._id))
                {
                    return res.status(400).send({
                        message:"MovieId provided does not exist in the given Theatre"
                    })
                }
                
                req.bookedMovie=movie;
            }
        }
        
        if(req.body.noOfSeats)
        {
            
            if(typeof req.body.noOfSeats !=="number")
            {

                return res.status(400).send({
                    message:"noOfSeats provided is not in correct formate(Number)"
                })
            }
            else if(req.body.noOfSeats>theatre.numberOfSeats ||req.body.noOfSeats<1)
            {
                return res.status(400).send({
                    message:`Please select no of seats in between 1 -${theatre.numberOfSeats}`
                });
            }
            
        }
        else if(req.bookingInParams && theatre)
        {
            if(req.bookingInParams.noOfSeats>theatre.numberOfSeats)
            {
                return res.status(400).send({
                    message:`Only ${theatre.numberOfSeats} is Available`
                });
            }
        }
        
        next();
        
    }
    catch(err)
    {
        console.log("#### Error while validating the booking Req Body ####",err.message);
        res.status(500).send({
            message:"Internal server error"
        })
    }
}

const validateupdateBookingBody=async(req,res,next)=>{
    try
    {
    
        if(req.body.status)
        {
            const statusAllowed=Object.values(constants.status);
            
            if(req.body.userType==constants.userType.customer)
            {
                if(req.bookingInParams.status==constants.status.cancelled)
                {
                    if(req.bookingInParams.status==constants.status.failed)
                    {
                        return res.status(400).send({
                            message:"Booking is failed you can't change it status now"
                        });
                    }
                }else
                {
                    return res.status(401).send({
                        message:"Only Admin can performe this action"
                    });
                }
            }
            
            if(!statusAllowed.includes(req.body.status))
            {
                return res.status(400).send({
                    message:"Failed!!! Booking status provided is Invalid"
                });
            }
        }
        
        next();
    }
    catch(err)
    {
        console.log("Error while validating the update booking req body",err.message);
        return res.status(500).send({
            message:"Internal server error while updating booking req body"
        })
    }
}

const validateBooking={
    validateBookingBody:validateBookingBody,
    validateupdateBookingBody:validateupdateBookingBody
}

module.exports=validateBooking