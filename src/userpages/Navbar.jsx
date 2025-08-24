import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { User, ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/user/auth/check")
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            MyShop
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center w-1/2 mx-4"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-l-lg border-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded-r-lg hover:bg-blue-600 flex items-center gap-1"
            >
              <Search size={18} />
              Search
            </button>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-sm sm:text-base"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate("/uselogin")}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <ShoppingCart
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer"
                />
                <div
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <User size={24} />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search (visible only on small screens) */}
        <form
          onSubmit={handleSearch}
          className="flex md:hidden mt-2 items-center"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-l-lg text-black focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded-r-lg hover:bg-blue-600 flex items-center gap-1"
          >
            <Search size={18} />
          </button>
        </form>
      </div>
    </nav>
  );
}
