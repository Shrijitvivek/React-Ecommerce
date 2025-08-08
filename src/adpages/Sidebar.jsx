import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-56 h-screen bg-[#1a1a2e] text-white p-6 fixed">
      <h2 className="text-[#00adb5] text-2xl font-bold mb-8">Admin Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/products" className="block text-gray-200 hover:text-[#00adb5] text-lg font-medium">
           Products
        </Link>
        <Link to="/orders" className="block text-gray-200 hover:text-[#00adb5] text-lg font-medium">
           Orders
        </Link>
        <Link to="/users" className="block text-gray-200 hover:text-[#00adb5] text-lg font-medium">
           Users
        </Link>
         <Link to="/categories" className="block text-gray-200 hover:text-[#00adb5] text-lg font-medium">
           Categories
        </Link>
        <Link to="/" className="block text-red-500 hover:text-red-400 text-lg font-medium">
           Logout
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
