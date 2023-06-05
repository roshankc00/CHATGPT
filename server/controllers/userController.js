const asyncHandler=require('express-async-handler')
const User = require('../modals/userModal')
const { generateToken } = require('../config/token')

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    try {
        if(!name||!email||!password){
            throw new Error("all the fields are necessary")

        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            throw new Error("user already exists")
        }
        const newUser=await User.create({
            name,
            email,
            password
        })
        // generating the token
        const token=generateToken(newUser._id)
        //   sending the correct response 
        res.status(200).json({
            sucess:true,
            message:"user has been created",
            token,
        })
        
    } catch (error) {
        throw new Error(error)
        
    }
    
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    try {
        if(!email || !password){
            throw new Error("all the fields are required")
        }
        const user=await User.findOne({email})
        if(!user){
            throw new Error("user doesnt exists")
        }
        
        let isMatched=await user.isPasswordMatched(password)
        if(!isMatched){
            throw new Error("enter the correct password")
        }
        const token=generateToken(user._id)
        res.status(200).json({
            sucess:true,
            message:"user has been login sucessfully",
            token
        })
        
    } catch (error) {
        throw new Error(error)        
    }
    
})


module.exports={
    registerUser,
    loginUser
}