if(process.env.NODE_ENV!="production")
{
    require('dotenv').config();
}

module.exports={
    serviceURL:process.env.NOTIFICATION_URL
}