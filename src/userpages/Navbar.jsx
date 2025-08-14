import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg px-6 py-3 flex items-center justify-between">
      {/* Left: Logo / Home */}
      <div
        className="text-2xl font-extrabold text-white tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        Shop<span className="text-yellow-300">Logo</span>
      </div>

      {/* Middle: Home Link + Search */}
      <div className="flex items-center gap-6">
        <button
          className="relative group text-white font-medium"
          onClick={() => navigate("/home")}
        >
          Home
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
        </button>

        <input
          type="text"
          placeholder="Search products..."
          className="text-black border border-gray-300 p-2 rounded-md outline-none bg-white"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-5 text-white text-lg">
        <FaShoppingCart
          className="cursor-pointer hover:text-yellow-300 transition"
          onClick={() => navigate("/cart")}
        />
        <FaUser
          className="cursor-pointer hover:text-yellow-300 transition"
          onClick={() => navigate("/profile")}
        />
      </div>
    </nav>
  );
}
