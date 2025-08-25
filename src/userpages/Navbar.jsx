import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/user/auth/check")
      .then((res) => {
        if (res.data.loggedIn) setUser(res.data.user);
        else setUser(null);
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
    <nav className="w-full bg-black text-white shadow-md px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate("/")}
        >
          MyShop
        </h1>

       

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/uselogin")}
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <ShoppingCart
                onClick={() => navigate("/cart")}
                className="cursor-pointer hover:text-blue-400 transition"
              />
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer flex items-center gap-2 hover:text-blue-400 transition"
              >
                <User size={24} />
                <span className="hidden sm:inline">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
