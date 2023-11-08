// Import necessary dependencies and modules
import { Link,useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

// Define a React functional component called 'Navbar'
const Navbar = () => {
  // Define state variables using the 'useState' hook
  const [prompt,setPrompt]=useState("")// For search input
  const[menu,setMenu]=useState(false) // For controlling the menu visibility

  // Get the 'navigate' function from React Router for programmatic navigation
  const navigate=useNavigate()
  const path=useLocation().pathname // Get the current path location
  
  // console.log(prompt)

  // Function to toggle the menu's visibility
  const showMenu=()=>{
    setMenu(!menu)
  }
  // Get the 'user' from the 'UserContext'
  const {user}=useContext(UserContext)
  
  return(
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Boom</Link></h1>
      {path==="/" && <div className="flex justify-center items-center space-x-0">
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
        <input  onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3" placeholder="Search by catagory" type="text"/>
      </div>}
      <div className=" hidden md:flex iteams-center justify-center space-x-2 md:space-x-4">
        {user? <h3><Link to="/write">Create a new Blog</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
        {user? <div onClick={showMenu}>
          <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
        </div>
          :<h3><Link to="/register">Register</Link></h3>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>
    </div>
  )
}
export default Navbar  // Export the 'Navbar' component