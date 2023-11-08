//import required components and librarty
import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"


const MyBlogs = () => {
    const {search}=useLocation()// Get the search query from the URL
  // console.log(search)
  const [posts,setPosts]=useState([])// Initialize the 'posts' state
  const [noResults,setNoResults]=useState(false)// Initialize the 'noResults' state
  const [loader,setLoader]=useState(false)// Initialize the 'loader' state
  const {user}=useContext(UserContext)// Get the 'user' from the UserContext
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)// Show the loader while fetching data
    try{
      // Fetch user's posts
      const res=await axios.get(URL+"/api/posts/user/"+user._id)
      // console.log(res.data)
      setPosts(res.data)// Update the 'posts' state with the fetched data
      if(res.data.length===0){
        setNoResults(true)// If there are no results, set 'noResults' to true
      }
      else{
        setNoResults(false)
      }
      setLoader(false)// Hide the loader when data is fetched
      
    }
    catch(err){
      console.log(err) // Log any errors to the console
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()  // Fetch user's posts when the component mounts

  },[search])

  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs