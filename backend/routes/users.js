// Import the 'express' library and create a router
const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')


//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        // If the request body contains a 'password' field, hash it before updating
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        // Update the user by their ID and return the updated user
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // Return the updated user with a 200 OK response
        res.status(200).json(updatedUser)

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        // Find and delete the user by their ID
        await User.findByIdAndDelete(req.params.id)
        // Delete all posts created by the deleted user by 'userId'
        await Post.deleteMany({userId:req.params.id})
        // Delete all comments created by the deleted user by 'userId'
        await Comment.deleteMany({userId:req.params.id})
        // Return a success message with a 200 OK response
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        // Find the user by their ID and exclude the 'password' field
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        // Return the user details (excluding the password) with a 200 OK response
        res.status(200).json(info)
    }
    catch(err){
                // Handle errors with a 500 Internal Server Error response

        res.status(500).json(err)
    }
})


module.exports=router