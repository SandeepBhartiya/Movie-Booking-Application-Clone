if(process.env.NODE_ENV!="production")
{
    require("dotenv").config();
}

module.exports={
    DB:process.env.DB
}