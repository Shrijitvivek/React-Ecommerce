import { useState } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg px-6 py-3 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="text-2xl font-extrabold text-white tracking-wide cursor-pointer">
        Shop<span className="text-yellow-300">Logo</span>
      </div>

      {/* Middle: Links (Desktop) */}
      <ul className="hidden md:flex gap-10 text-white font-medium">
        {["Home", "Categories", "Contact"].map((link) => (
          <li key={link}>
            <button className="relative group">
              {link}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </li>
        ))}
      </ul>

      {/* Right: Icons */}
      <div className="flex items-center gap-5 text-white text-lg">
        <FaSearch
          className="cursor-pointer hover:text-yellow-300 transition"
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <FaShoppingCart className="cursor-pointer hover:text-yellow-300 transition" />
        <FaUser className="cursor-pointer hover:text-yellow-300 transition" />
        <FaBars
          className="md:hidden cursor-pointer hover:text-yellow-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Search bar toggle */}
      {searchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white px-4 py-2 shadow-md md:static md:w-auto md:shadow-none">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="absolute top-16 right-4 bg-white w-44 rounded-lg shadow-lg p-4 flex flex-col gap-4 md:hidden font-medium text-gray-700">
          {["Home", "Categories", "Contact"].map((link) => (
            <li key={link}>
              <button className="hover:text-blue-600 transition">{link}</button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
