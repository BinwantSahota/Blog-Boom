import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { IF, URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
 

const Home = () => {
  
  const {search}=useLocation()// Get the search query from the URL
  // console.log(search)
  const [posts,setPosts]=useState([])// Initialize the 'posts' state variable
  const [noResults,setNoResults]=useState(false)// Initialize the 'noResults' state variable

  const [loader,setLoader]=useState(false)// Initialize the 'loader' state variable
  const {user}=useContext(UserContext)// Get user data from the UserContext
  // console.log(user)

  // Function to fetch posts
  const fetchPosts=async()=>{
    setLoader(true)  // Set the loader to true to display loading state
    try{
      const res=await axios.get(URL+"/api/posts/"+search) // Fetch posts based on the search query
      // console.log(res.data)
      setPosts(res.data) // Update the 'posts' state with the fetched data
      if(res.data.length===0){
        setNoResults(true)// Set 'noResults' to true if there are no search results
      }
      else{
        setNoResults(false)// Set 'noResults' to false if there are search results
      }
      setLoader(false)// Set the loader to false to hide the loading state
      
    }
    catch(err){
      console.log(err)// Log any errors to the console
      setLoader(true)// Set the loader to true in case of an error
    }
  }

  useEffect(()=>{
    fetchPosts()// Fetch posts when the component mounts

  },[search])



  return (
    
    <>
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
    </>
    
  )
}

export default Home