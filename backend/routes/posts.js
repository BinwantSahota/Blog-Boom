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
        // Create a new post using the request body and save it
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()
        // Return the saved post with a 200 OK response
        res.status(200).json(savedPost)
    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       // Update the post by its ID and return the updated post
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // Return the updated post with a 200 OK response
        res.status(200).json(updatedPost)

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        // Find and delete the post by its ID
        await Post.findByIdAndDelete(req.params.id)
        // Delete all comments associated with the deleted post by 'postId'
        await Comment.deleteMany({postId:req.params.id})
        // Return a success message with a 200 OK response
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        // Find the post by its ID
        const post=await Post.findById(req.params.id)
        // Return the post details with a 200 OK response
        res.status(200).json(post)
    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        // Create a search filter based on the Category search
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        // Find all posts that match the searched filter or return all posts if no search parameter is provided
        const posts=await Post.find(query.search?searchFilter:null)
        // Return the found posts with a 200 OK response
        res.status(200).json(posts)
    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        // Find all posts created by a specific user by 'userId'
        const posts=await Post.find({userId:req.params.userId})
        // Return the user's posts with a 200 OK response
        res.status(200).json(posts)
    }
    catch(err){
        // Handle errors with a 500 Internal Server Error response
        res.status(500).json(err)
    }
})


//router exportedd
module.exports=router