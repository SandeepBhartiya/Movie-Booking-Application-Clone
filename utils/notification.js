const NotificationConfig = require("../configs/notification.config");


const Client=require('node-rest-client').Client;

const client=new Client();

module.exports=(subject,content,recepients,requester)=>{
    const reqBody={
        subject:subject,
        recepientEmails:recepients,
        content:content,
        requester:requester
    };

    const reqHeader={
        "Content-Type":"application/json"
    }

    const args={
        reqBody,
        reqHeader
    }

    try
    {
        client.post(NotificationConfig.serviceURL,args,(data,res)=>{
            console.log("#### Notification Request Sent ####",data);
        })
    }
    catch(err)
    {
        console.log(err.message);
    }
}