// Create a router by importing the "express" library.
const express=require('express')
const router=express.Router()
// For user authentication, import the "User" model, "bcrypt," and "jsonwebtoken."
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//REGISTER

router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        // Generate a salt and hash the password before saving it to the database
        const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hashSync(password,salt)
        // Create a new user with the hashed password and save it
       const newUser=new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()
        // Return the saved user data with a 200 OK response
        res.status(200).json(savedUser)

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }

})


//LOGIN
router.post("/login",async (req,res)=>{
    try{
        // Find the user by their email
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        // Compare the provided password with the stored hashed password
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        // Generate a JWT token and store it in a cookie
        const token=jwt.sign({_id:user._id ,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"20d"})
        
        // Remove the 'password' field from the user data before sending it
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)
        
       

    }
    catch(err){
        res.status(500).json(err)
    }
})



//LOGOUT
router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

//REFETCH USER
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})


//routter expoorted
module.exports=router