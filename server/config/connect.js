const mongoose=require('mongoose')

const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected sucessfully to the database")
    }).catch((err)=>{
        console.log(err)
    })

}

module.exports=connectDb