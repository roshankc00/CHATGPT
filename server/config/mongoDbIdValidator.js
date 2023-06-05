const mongoose=require('mongoose')

const validateMongodbId=(id)=>{
    const isvalid=mongoose.Types.ObjectId.isValid(id);
    if(!isvalid){
        throw new  Error ("this Id is not Valid")
    }
}

module.exports={validateMongodbId}