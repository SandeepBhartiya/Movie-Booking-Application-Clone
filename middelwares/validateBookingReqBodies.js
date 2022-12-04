const Theatre=require("../models/theatre.model");
const Movie=require("../models/movie.model");

const{constants,ObjectChecker}=require("../utils")


const validateBookingBody=async(req,res,next)=>{
    try
    {
        console.log("1");
        if(!req.bookingInParams)
        {
            console.log("1.1");
            if(!req.body.movieId)
            {
                return res.status(400).send({
                    message:"Failed!!! movieId is not Provided"
                })
            }
            console.log("1.2");
            if(!req.body.theatreId)
            {
                return res.status(400).send({
                    message:"Failed!!! theatreId is not Provided"
                })
            }
            console.log("1.3");
            if(!req.body.noOfSeats)
            {
                return res.status(400).send({
                    message:"Failed!!! noOfSeats is not Provided"
                })
            }
        }
        let theatre;
        let movie;
        // console.log("2");
        if(req.body.theatreId)
        {

            // console.log("2.1");
            if(!ObjectChecker.isValidObjectId(req.body.theatreId))
            {
                return res.status(400).send({
                    message:"Failed!!! invalid theatreId Provided"
                });
            }
            // console.log("2.2");
            theatre=await Theatre.findOne({_id:req.body.theatreId});
            // console.log("2.2");
            if(!theatre)
            {
                return res.status(400).send({
                    message:"Failed!!! Theatre provided does not exist"
                });
            }
            // console.log("2.3");
            if(req.body.bookingInParams && !req.body.movieId)
            {
                if(theatre.movies.includes(req.bookingInParams.movieId))
                {
                    return res.status(400).send({
                        message:"Failed!!! The current movieId does not present in the new Theatre"
                    });
                }
            }
            // console.log("2.4");
            req.bookedTheatre=theatre;

            console.log(req.bookedTheatre.numberOfSeats);
        }
        else if(req.bookingInParams)
        {
            req.bookedTheatre=req.bookingInParams.theatrId;
        }

        // console.log("3");
        if(req.body.movieId)
        {
            // console.log("3.1");
            if(!ObjectChecker.isValidObjectId(req.body.movieId))
            {
                return res.status(400).send({
                    message:"Invalid movieId provided"
                });
            }
            else
            {
                // console.log("3.2");
                movie=await Movie.findOne({_id:req.body.movieId});
                // console.log("3.3");
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
                // console.log("3.4");
                req.bookedMovie=movie;
            }
        }
        // console.log("4");
        if(req.body.noOfSeats)
        {
            console.log("1.1",theatre);
            // console.log("4.1");
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
            console.log("1.2");
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
        console.log("Next")
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
        console.log("1");
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
            console.log("2");
            if(!statusAllowed.includes(req.body.status))
            {
                return res.status(400).send({
                    message:"Failed!!! Booking status provided is Invalid"
                });
            }
        }
        console.log("3");
        next();
    }
    catch(err)
    {
        console.log("Error while validating the update booking re body",err.message);
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