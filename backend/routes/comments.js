// Import the 'express' library and create a router
const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        // Create a new comment using the request body and save it
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        // Return the saved comment with a 200 OK response
        res.status(200).json(savedComment)
    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       // Update the comment by its ID and return the updated comment
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // Return the updated comment with a 200 OK response
        res.status(200).json(updatedComment)

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        // Find and delete the comment by its ID
        await Comment.findByIdAndDelete(req.params.id)
        // Return a success message with a 200 OK response
        res.status(200).json("Comment has been deleted!")

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})




//GET POST COMMENTS
router.get("/post/:postId",async (req,res)=>{
    try{
        // Find all comments associated with a specific post by 'postId'
        const comments=await Comment.find({postId:req.params.postId})
        // Return the comments with a 200 OK response
        res.status(200).json(comments)
    }
    catch(err){
        // Return the comments with a 200 OK response
        res.status(500).json(err)
    }
})

//exporoting roter
module.exports=router