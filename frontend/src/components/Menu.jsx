// Import necessary dependencies and modules
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"

// Define a React functional component called 'Menu'
const Menu = () => {
  // Get the 'user' and 'setUser' from the 'UserContext'
const {user}=useContext(UserContext)
const {setUser}=useContext(UserContext)
const navigate=useNavigate() // Get the 'navigate' function from React Router for programmatic navigation


// Function to handle user logout
const handleLogout=async()=>{
  try{
    // Send a GET request to the API to log the user out
    const res=await axios.get(URL+"/api/auth/logout",{withCredentials:true})
    // console.log(res)

    // Clear the user from the context and navigate to the login page
    setUser(null)
    navigate("/login")

  }
  catch(err){
    console.log(err) // Log any errors that occur during the logout operation
  }
}
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
    {!user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
    {user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>}
    {user &&<h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}

    </div>
  )
}

export default Menu  // Export the 'Menu' component