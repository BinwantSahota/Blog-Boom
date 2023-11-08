//Importes required packages and modules
const express =require('express')
const app=express()
const mongooose =require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')

// Funation database connection
const connectDB=async()=>{
  try{
      await mongooose.connect(process.env.MONGO_URL)
      console.log("Database is connected successfully")
  }
  catch(err){
    console.log(err)
  }
}

//setting up middleware
dotenv.config()//load environment variables from a .env file 
app.use(express.json()) //parsing json in incomming reqs
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cookieParser()) //cookieas are parsed
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute) //auth route used for authentication
app.use("/api/users",userRoute)//user route
app.use("/api/posts",postRoute)//posts route
app.use("/api/comments",commentRoute)//comment routes

//image upload config
const storage=multer.diskStorage({
  destination:(req,file,fn)=>{
      fn(null,"images")
  },
  filename:(req,file,fn)=>{
      fn(null,req.body.img)
      // fn(null,"image1.jpg")
  }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  // console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!")
})

// Starting  server and connecting to the db
app.listen(process.env.PORT,()=>{
  connectDB()
  console.log("app is running on port "+ process.env.PORT)
})
