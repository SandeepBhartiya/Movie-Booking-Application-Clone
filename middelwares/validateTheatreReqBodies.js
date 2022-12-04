const User=require("../models/user.model");
const constants=require("../utils/constant.util");
const Movie=require("../models/movie.model")
const ObjectId=require('mongoose').Types.ObjectId;

const AllowedShowTypes=[constants.theatreShows.evening,constants.theatreShows.morning,constants.theatreShows.night,constants.theatreShows.noon];

function isValidObjectId(id)
{
    if(ObjectId.isValid(id))
    {
        if((String)(new ObjectId(id))===id)
        return true;
        return false;
    }
    return false;
}

async function checkValidObjectIds(array)
{
    let temp={validIds:true,movieExist:true};
    for(e of array)
    {
        if(!isValidObjectId(e))
        {
            temp.validIds=false;
        }
        else
        {
            const movie=await Movie.findOne({_id:e});
            if(movie)
            {
                temp.movieExist=true
            }
        }
    }
    return temp;        
}

function checkShowType(e)
{
    let temp=true;
    e.forEach(element => {
      if(!AllowedShowTypes.includes(element))  
      {
        temp=false;
      }
    });
    return temp;
}

const newTheatreBody=async(req,res,next)=>{
    try
    {
        if(req.user.userType==constants.userType.admin && !req.body.ownerId)
        {
            return res.status(400).send({
                message:"Failed!!! Theatre owner Id is not provided"
            });
        }

        if(req.body.ownerId)
        {
            if(!isValidObjectId(req.body.ownerId))
            {
                return res.status(400).send({
                    message:"Failed!!! invalid theatre owner Id provided"
                });
            }
            else
            {
                const owner=await User.findOne({_id:req.body.ownerId});
                if(!owner)
                {
                    return res.status(400).send({
                        message:"Failed!!! Theater owner id provided does not exist"
                    })
                }
                else if(owner.userType!=constants.userType.theatre_owner)
                {
                    return res.status(400).send({
                        message:"Failed!!!  Owner id provided is not a theatre owner "
                    });
                }
            }
        }

        if(!req.body.name)
        {
            return res.status(400).send({
                message:"Failed!!! Name is not Provided"
            })
        }

        if(!req.body.description)
        {
            return res.status(400).send({
                message:"Failed!!! Description is not Provided"
            })
        }

        if(!req.body.city)
        {
            return res.status(400).send({
                message:"Failed!!! City is not Provided"
            })
        }

        if(!req.body.pinCode)
        {
            return res.status(400).send({
                message:"Failed!!! pinCode is not Provided"
            })
        }
        else if(typeof req.body.pinCode !=="number")
        {
            return res.status(400).send({
                message:"Failed!!! pinCode  Provided is not in correct formate (Number)"
            });
        }

        if(!req.body.showTypes)
        {
            return res.status(400).send({
                message:"Failed!!! showTypes is not Provided"
            });
        }
        else if(!Array.isArray(req.body.showTypes))
        {
            return res.status(400).send({
                message:"Failed!!! showTypes  Provided is not in correct formate (Array)"
            });
        }
        else if(!checkShowType(req.body.showTypes))
        {
            return res.status(400).send({
                message:"Failed!!! Invalid showTypes provided"
            });
        }

        if(!req.body.numberOfSeats)
        {
            return res.status(400).send({
                message:"Failed!!! numberOfSeats is not Provided"
            })
        }
        else if(typeof req.body.numberOfSeats!=="number")
        {
            return res.status(400).send({
                message:"Failed!!! numberOfSeats  Provided is not in correct formate (Number)"
            });
        }

        if(!req.body.ticketPrice)
        {
            return res.status(400).send({
                message:"Failed!!! ticketPrice is not Provided"
            })
        }
        else if(typeof req.body.ticketPrice!=="number")
        {
            return res.status(400).send({
                message:"Failed!!! ticketPrice  Provided is not in correct formate (Number)"
            });
        }
        next(); 

    }
    catch(err)
    {
        console.log("#### Error while validating new theatre request body ####",err.message);
        res.status(500).send({
            message:"Internal server error while validating new theatre body"
        });
    }
}

const editTheaterBody=async(req,res,next)=>{
    try
    {
        if(req.body.pinCode && typeof req.body.pinCode!="number")
        {
            return res.status(400).send({
                message:"Failed!!! showTypes  Provided is not in correct formate (Number)"
            });
        }

        if(req.body.showTypes)
        {
            if(!Array.isArray(req.body.showTypes))
            {
                return res.status(400).send({
                    message:"Failed!!! showTypes  Provided is not in correct formate (Array)"
                });
            }
            else if(!checkShowType(req.body.showTypes))
            {
                return res.status(400).send({
                    message:"Failed!!! invalid showType provided "
                })
            }
        }
        
        if(req.body.numberOfSeats && typeof req.body.numberOfSeats !="number")
        {
            return res.status(400).send({
                message:"Failed!!! numberOfSeats  Provided is not in correct formate (Number)"
            });
        }

        next();

    }
    catch(err)
    {
        console.log("#### Error while validating edit theatre request body ####",err.message);
        res.status(500).send({
            message:"Internal server error while validating edit theatre body"
        });

    }
}

const editMovieInTheaterBody=async(req,res,next)=>{

    try
    { 
        const movieIntheater=req.theatreInParams.movies.map(e=>
            e.toString()
        );
        if(req.body.addMovies)
        {
            if(!Array.isArray(req.body.addMovies))
            {
                return res.status(400).send({
                    message:"Failed!!! Movie id in addMovies are not in correct formate (Array)"
                });
            }
            req.body.addMovies=req.body.addMovies.filter(movieId=> !movieIntheater.includes(movieId));
            const check=await checkValidObjectIds(req.body.addMovies);
            if(!check.validIds)
            {
                return res.status(400).send({
                    message:"Failed!!! Invalid movie id provided in addMovies"
                })
            }
            else if(!check.movieExist)
            {
                return res.status(400).send({
                    message:"Failed!!! MovieId provided in addMovies does not exist"
                })
            }
        }

        if(req.body.removeMovies)
        {
            if(!Array.isArray(req.body.removeMovies))
            {
                return res.status(400).send({
                    message:"Failed!!! Movie id in removeMovies are not in correct formate (Array)"
                });
            }
            req.body.removeMovies=req.body.removeMovies.filter(movieId=>movieIntheater.includes(movieId));
            const check=await checkValidObjectIds(req.body.removeMovies);
            if(!check.validIds)
            {
                return res.status(400).send({
                    message:"Failed!!! Invalid movie id provided in removeMovies"
                })
            }
            else if(!check.movieExist)
            {
                return res.status(400).send({
                    message:"Failed!!! MovieId provided in removeMovies does not exist"
                })
            }
        }
        next();
    }
    catch(err)
    {
        console.log("#### internal server error while editMovieInTheater ####",err.message)
        res.status(500).send({
            message:"Internal server error while editMoviesInTheater"
        })
    }
}


const validateTheater={
    newTheatreBody:newTheatreBody,
    editTheaterBody:editTheaterBody,
    editMovieInTheaterBody:editMovieInTheaterBody
}

module.exports=validateTheater

