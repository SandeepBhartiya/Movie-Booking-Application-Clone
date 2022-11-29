const app=require("express")();
const bodyParser=require('body-parser')
const mongoose=require("mongoose");

const serverConfig=require("./configs/server.config")
const dbConfig=require("./configs/db.config");
const User=require("./models/user.model");
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
    await User.collection.drop();
}
// const db=dbConfig.connection
require("./routes/auth.routes")(app)
require("./routes/movie.route")(app)

app.listen(serverConfig.PORT,()=>{
    console.log("listening at ",serverConfig.PORT)
})