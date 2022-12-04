const objectId=require("mongoose").Types.ObjectId;

exports.isValidObjectId=(id)=>{
    if(objectId.isValid(id)){
        if((String)(new objectId(id))===id)
        {
            return true;
        }
        return false;
    }
    return false;
}