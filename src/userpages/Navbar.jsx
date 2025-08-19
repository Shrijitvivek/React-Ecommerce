import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { User , ShoppingCart } from "lucide-react"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/user/auth/check")
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/user/logout"); 
      setUser(null); 
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
      
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MyShop
      </h1>

     
      <div className="flex items-center gap-4">
        {!user ? (
          <>
          
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
            >
              Create an Account
            </button>

            <button
              onClick={() => navigate("/uselogin")}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Login to Existing Account
            </button>
          </>
        ) : (
          <>
           <ShoppingCart onClick={()=> navigate('/cart')}
            className="cursor-pointer"/> 
          
            
            <div
              onClick={() => navigate("/profile")}
              className="cursor-pointer flex items-center gap-2"
            >
              
              <User size={24} />
              <span>{user.name}</span>
            </div>

        
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
