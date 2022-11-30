
const Theatre=require("../models/theatre.model")
const User=require("../models/user.model")
const constants=require("../utils/constant.util");
exports.createNewTheatre=async(req,res)=>{

    const theatreObj={
        ownerId: req.user.userType==constants.userType.admin? req.body.ownerId:req.user._id, 
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
        })
    }


}
