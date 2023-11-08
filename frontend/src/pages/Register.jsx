
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'

const Register = () =>{

  const [username,setUsername]=useState("")// Create a state variable for username
  const [email,setEmail]=useState("")// Create a state variable for email
  const [password,setPassword]=useState("")// Create a state variable for password
  const [error,setError]=useState(false)// Create a state variable to manage errors
  const navigate=useNavigate()// Get the navigation function from react-router-dom
   
  // Define a function to handle registration
  const handleRegister=async ()=>{
    try {
      // Send a registration request to the API
      const res= await axios.post(URL+"/api/auth/register",{username,email,password})
      setUsername(res.data.username)// Set the username from the response
      setEmail(res.data.email)// Set the email from the response
      setPassword(res.data.password)// Set the password from the response
      setError(false)// Reset the error state
      navigate("/login")// Navigate to the login page
    } 
    catch (err) {
      setError(true) // Set the error state to true in case of an error
      console.log(err)// Log the error to the console
      
    }

   }
 


  return(
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Boom</Link></h1>
      <h3><Link to="/login">Login</Link></h3>
      </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
      <h1 className="text-xl font-bold text-left">Create an account</h1>
      <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your Username" />
      <input  onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
      <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
      <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
      {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
      <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
      </div>

    </div>
    <Footer/>
    </>
   
  )
}
export default Register