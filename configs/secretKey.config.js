if(process.env.NODE_ENV!="production")
{
    require("dotenv").config();
}

module.exports={
    secretKey:process.env.secretKey,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN,
    REFERESH_TOKEN:process.env.REFERESH_TOKEN
}