import { useNavigate,useParams } from "react-router-dom"// Import necessary components from React Router
import Navbar from "../components/Navbar"// Import the Navbar component
import Footer from "../components/Footer"// Import the Footer component
import  {BiEdit} from 'react-icons/bi'// Import the BiEdit icon from React Icons
import  {MdDelete} from 'react-icons/md'// Import the MdDelete icon from React Icons
import Comment from "../components/Comment"// Import the Comment component
import axios from "axios"// Import the Axios library
import { URL,IF } from "../url"
import { useContext,useEffect,useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"



const PostDetails =() => {

  const postId=useParams().id // Get the post ID from the URL
  const [post,setPost]=useState({})// Initialize the 'post' state
  const {user}=useContext(UserContext)// Get the 'user' from the UserContext
  const [comments,setComments]=useState([])// Initialize the 'comments' state
  const [comment,setComment]=useState("")// Initialize the 'comment' state
  const [loader,setLoader]=useState(false)// Initialize the 'loader' state
  const navigate=useNavigate()// Get the navigate function from React Router

  const fetchPost=async()=>{
    setLoader(true)// Show the loader while fetching data
    try{
      // Fetch post details
      const res= await axios.get(URL+"/api/posts/"+postId)
      // console.log(res.data)
      setPost(res.data)// Update the 'post' state with the fetched data
      setLoader(false)// Hide the loader when data is fetched
    }
    catch(err){
      console.log(err)// Log any errors to the console
      setLoader(true)
    }
  }

  const handleDeletePost=async ()=>{

    try{
      const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")// Navigate to the home page after deletion

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchPost()// Fetch post details when the component mounts

  },[postId])

  const fetchPostComments=async()=>{
    setLoader(true)// Show the loader while fetching data
    try{
      // Fetch comments for the post
      const res=await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)// Update the 'comments' state with the fetched data
      setLoader(false)// Hide the loader when data is fetched

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()// Fetch comments when the component mounts

  },[postId])


  const postComment=async(e)=>{
    e.preventDefault()
    try{
      // Post a comment
      const res=await axios.post(URL+"/api/comments/create",
      {comment:comment,author:user.username,postId:postId,userId:user._id},
      {withCredentials:true})
      
      // fetchPostComments()
      // setComment("")
      window.location.reload(true)// Refresh the page to see the new comment

    }
    catch(err){
         console.log(err)
    }

  }



  return(
    <div>
      <Navbar/>
      {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:<div className="px-8 px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
          {user?._id===post?.userId &&
          <div className="flex items-center justify-center space-x-2">
          <p  className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
          <p  className="cursor-pointer" onClick={handleDeletePost}><MdDelete/></p>

        </div>}
          
          

        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>{post.username}</p>
        <div className="flex space-x-2">
        <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>

        </div>

        </div>
        <img src={IF+post.photo} className="w-full mx-auto mt-8" alt=""/>
        <p className="mx-auto mt-8"> {post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center item-center space-x-2">
            {post.categories?.map((c,i)=>(
              <>
               <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
              </>
             
            ))}
            
            
          </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post} />
         ))}
          
          </div>
          
          {/*write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
          <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
          <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
         </div>

      </div>}
      <Footer/>
    </div>
  )
}

export default PostDetails