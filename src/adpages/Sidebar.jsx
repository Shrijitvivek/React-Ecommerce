import React from 'react';
import { Link } from 'react-router-dom';
import sidebar from '../assets/sidebar.png';
import products from '../assets/prod.png';
import users from '../assets/user.png';
import cat from '../assets/categ.png';
import logout from '../assets/lout.png';

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-16 hover:w-52 h-screen bg-gradient-to-b from-[#1e293b] via-[#334155] to-[#0f172a] transition-all duration-500 flex flex-col overflow-hidden text-white shadow-lg">

    
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        <Link to='/home'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={sidebar} alt="Home" className="max-w-[40px]" />
            <p className="text-lg font-medium">Home</p>
          </div>
        </Link>

        <Link to='/products'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={products} alt="Products" className="max-w-[40px]" />
            <p className="text-lg font-medium">Products</p>
          </div>
        </Link>

        <Link to='/users'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={users} alt="Users" className="max-w-[40px]" />
            <p className="text-lg font-medium">Users</p>
          </div>
        </Link>

        <Link to='/categories'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={cat} alt="Categories" className="max-w-[40px]" />
            <p className="text-lg font-medium">Categories</p>
          </div>
        </Link>

        <Link to='/'>
          <div className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg transition-all duration-300">
            <img src={logout} alt="Logout" className="max-w-[40px]" />
            <p className="text-lg font-medium">Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
