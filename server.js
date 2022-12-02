const app=require("express")();
const bodyParser=require('body-parser')
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const serverConfig=require("./configs/server.config")
const dbConfig=require("./configs/db.config");
const User=require("./models/user.model");
const Movie=require("./models/movie.model");
const Theatre=require("./models/theatre.model");
const constants=require("./utils/constant.util");

app.use(bodyParser.json())

mongoose.connect(dbConfig.DB);
const db=mongoose.connection

db.on("error",()=>{
    console.log("#### Error while connecting to MongoDB ####")
});

db.once("open",()=>{
    console.log("#### Connected to MongoDB ####");
    init();
})

async function init()
{
    try
    {

        // await User.collection.drop();
        // await Movie.collection.drop(); 
        // await Theatre.collection.drop();

        // const user=await User.create({
        //     name:"Sandeep1",
        //     userId:"sam12",
        //     password:bcrypt.hashSync("Sej9833029799@"),
        //     email:"Sandeep1@gmail.com",
        //     userType:constants.userType.admin,
        //     userStatus:constants.userStatus.approved
        // })
        // console.log(user)
    }
    catch(err)
    {
        console.log("### Error while performing db operation ####",err.message)
    }
}
// const db=dbConfig.connection
require("./routes/auth.routes")(app);
require("./routes/movie.route")(app);
require("./routes/theatre.routes")(app);
require("./routes/user.routes")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("listening at ",serverConfig.PORT)
})