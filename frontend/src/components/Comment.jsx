/* eslint-disable react/prop-types */
import axios from "axios"
// import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"


// Define a React functional component called 'Comment' that takes 'c' and 'post' as props
const Comment = ({c,post}) => {
// Get the 'user' from the 'UserContext'
  const {user}=useContext(UserContext)

  // Function to delete a comment by its 'id'
  const deleteComment=async(id)=>{
    try{
      // Send a DELETE request to the API to delete the comment with the provided 'id'
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      // Reload the page to reflect the deleted comment
      window.location.reload(true)
    }
    catch(err){
      console.log(err)// Log any errors that occur during the delete operation
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
           <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">@{c.author}</h3>
            <div className="flex justify-center items-center space-x-4">
            <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
            {user?._id===c?.userId ?
              <div className="flex items-center justify-center space-x-2">
                    <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                </div>:""}
                
            </div>
           </div>
           <p className="px-4 mt-2">{c.comment}</p>

           </div>
  )
}

export default Comment