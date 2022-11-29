const app=require("express")();

const serverConfig=require("./configs/server.config")


app.listen(serverConfig.PORT,()=>{
    console.log("listening at ",serverConfig.PORT)
})