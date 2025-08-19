import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";



export default function Profile() {
    const [user , SetUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        api.get('/user/auth/check')
        .then((res)=>{
            if(res.data.loggedIn){
                SetUser(res.data.user)
            }
            else{
                navigate('/uselogin')
            }
        })
        .catch(()=> navigate('/uselogin'))
    },[navigate])

   if (!user) return <p>Loading...</p>;

  return (
    <>
    <Navbar/>
     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user.image && (
        <img
          src={`http://localhost:2000/upload/${user.image}`}
         
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      )}
      <p className="text-lg mt-4"><strong>Name:</strong> {user.name}</p>
      <p className="text-lg"><strong>Email:</strong> {user.email}</p>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(`/edit/${user.id}`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Edit Profile
        </button>
        <button
          onClick={() =>navigate('/cart/orders')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Order History
        </button>
      </div>
    </div>
  
    </>
  )
  
}
