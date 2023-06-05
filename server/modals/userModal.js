const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Password is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be atleast 6charecter long"]
    },
    customerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    }

},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next()
    }
})

// checking the password for login
userSchema.methods.isPasswordMatched=async function(password){
    return await bcrypt.compare(password,this.password)
}

const User=mongoose.model("User",userSchema)
module.exports=User