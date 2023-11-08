const jwt=require('jsonwebtoken') //libraby impoterd
//MW with 3 para
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    // console.log(token)
    // If there is no token, return a 401 Unauthorized response
    if(!token){
        return res.status(401).json("You are not authenticated!")
    }
    // Verify token withh secret key from env vars
    jwt.verify(token,process.env.SECRET,async (err,data)=>{
        // If err during token verify, return 403res
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        
        //Set the user's ID acquired from the token as the 'userId' attribute in the'req' object.
        req.userId=data._id
       
        // console.log("passed")
        
        next()
    })
}
//exporting  func.
module.exports=verifyToken