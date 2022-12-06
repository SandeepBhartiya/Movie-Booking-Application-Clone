const {releaseStatus,genre}=require("../utils/constant");

const isDate=(date=>{
    return (new Date(date)!="Invalid Date") && !isNaN(new Date(date));
});

const AllowedReleaseStatus=[releaseStatus.blocked,releaseStatus.coming_soon,releaseStatus.released];
const AllowedMovieGenre=[genre.action,genre.comedy,genre.drama,genre.fantasy,genre.horror,genre.mystery,genre.romance,genre.thriller];

function checkGenre(genre)
{
    let temp=true;
    genre.forEach(e => {
        if(!AllowedMovieGenre.includes(e))
        {
            temp=false;
        }
    });
    return temp;
}


const newMovieBody=async(req,res,next)=>{
    try
    {    
        if(!req.body.title)
        {
            return res.status(400).send({
                message:"Failed!!! Movie title is not Provided"
            })
        };

        if(!req.body.description)
        {
            return res.status(400).send({
                message:"Failed!!! Movie description is not Provided"
            })
        };

        if(!req.body.casts)
        {
            return res.status(400).send({
                message:"Failed!!! Movie casts is not Provided"
            })
        }else if(!Array.isArray(req.body.casts))
        {
            return res.status(400).send({
                message:"Failed!!! Movie casts value provide in Invalid formate(Array)"
            })
        }
    
        if(!req.body.trailerUrls)
        {
            return res.status(400).send({
                message:"Failed!!! Movie trailerUrls is not Provided"
            })
        }
        else if(!Array.isArray(req.body.trailerUrls))
        {
            return res.status(400).send({
                message:"Failed!!! trailerUrls value provide in Invalid formate(Array)"
            })
        }

        if(!req.body.posterUrls)
        {
            return res.status(400).send({
                message:"Failed!!! Movie posterUrls is not Provided"
            })
        }
        else if(!Array.isArray(req.body.posterUrls))
        {
            return res.status(400).send({
                message:"failed!!!  posterUrls value  provide in Invalid formate(Array)"
            })
        }

        if(!req.body.language)
        {
            return res.status(400).send({
                message:"Failed!!! Movie language is not Provided"
            })
        }
        else if(!Array.isArray(req.body.language))
        {
            return res.status(400).send({
                message:"failed!!!  language value  provide in Invalid formate(Array)"
            })
        }

        if(!req.body.releaseDate && !isDate(req.body.releaseDate))
        {
            return res.status(400).send({
                message:"Failed!!! Movie release Date is not in correct formate(Array)"
            })
        };

        if(!req.body.releaseStatus)
        {
            return res.status(400).send({
                message:"Failed!!! Movie release Status is not provided"
            });
        }else if(!AllowedReleaseStatus.includes(req.body.releaseStatus))
        {
            return res.status(400).send({
                message:"Failed!!! Movie release Status provided is Invalid"
            });
        }

        if(req.body.imbRating && typeof req.body.imbRating!="number")
        {
            return res.status(400).send({
                message:"Failed!!! imbRating value  provide in Invalid formate(Number)"
            });
        }

        if(req.body.genre)
        {
            if(!Array.isArray(req.body.genre))
            {
                return res.status(400).send({
                    message:"Failed!!! genre value provide in Invalid formate(Array)"
                })
            } 
        }
        else if(!checkGenre.includes(req.body.genre))
        {
            return res.status(400).send({
                message:"Failed!!! Invalid genre provided"
            })
        }
        next();

    }
    catch(err)
    {
        console.log("#### Internal server error while validating new Movie Body ####",err.message);
        res.status(500).send({
            message:"Internal server error while validating new Movie Body"
        })
    }
}


const editMovieBody = (req,res,next)=>{
    try{
        if (req.body.casts && !Array.isArray(req.body.casts)){
            return res.status(400).send({
                message: "Failed ! Movie casts are not in correct format (Array)"
            });
        }


        if (req.body.trailerUrls && !Array.isArray(req.body.trailerUrls)){
            return res.status(400).send({
                message: "Failed ! Movie trailers are not in correct format (Array)"
            });
        }


        if (req.body.posterUrls && !Array.isArray(req.body.posterUrls)){
            return res.status(400).send({
                message: "Failed ! Movie posters are not in correct format (Array)"
            });
        }


        if (req.body.languages && !Array.isArray(req.body.languages)){
            return res.status(400).send({
                message: "Failed ! Movie languages are not in correct format (Array)"
            });
        }

        if (req.body.releaseDate && !isDate(req.body.releaseDate)){
            return res.status(400).send({
                message: "Failed ! Movie release date is not in correct format (Date)"
            });
        }

        if (req.body.releaseStatus && !AllowedReleaseStatuses.includes(req.body.releaseStatus)){
            return res.status(400).send({
                message: "Failed ! Invalid movie release status provided"
            });
        }
    
        if (req.body.imdbRating && typeof req.body.imdbRating !== "number"){
            return res.status(400).send({
                message: "Failed ! Movie IMDb rating is not in correct format (Number)"
            });
        }

        if (req.body.genre){
            if(!Array.isArray(req.body.genre)){
                return res.status(400).send({
                    message: "Failed ! Movie genere are not in correct format (Array)"
                });
            }else if (!checkGenre(req.body.genre)){
                return res.status(400).send({
                    message: "Failed ! invalid movie release genre provided"
                });
            }
        }
    
        next();
    }catch{
        console.log("#### Error while velidating edit movie request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while edit movie body validation"
        });
    }
}

const validateMovieReq={
    newMovieBody:newMovieBody,
    editMovieBody:editMovieBody
}
module.exports={
    validateMovieReq
}