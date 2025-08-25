import React from 'react';
import { Link } from 'react-router-dom';

import homes from '../assets/home1.png'
import products from '../assets/prod.png';
import users from '../assets/user.png';
import cat from '../assets/categ.png';
import ord from '../assets/order.png'
import logout from '../assets/lout.png';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin'); 
    navigate('/admin');               
  };

  return (
    <div className="fixed top-0 left-0 w-16 hover:w-52 h-screen bg-gradient-to-b from-[#1e293b] via-[#334155] to-[#0f172a] transition-all duration-500 flex flex-col overflow-hidden text-white shadow-lg">

    
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
       
        <Link to='/admindash'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={homes} alt="Products" className="max-w-[40px]" />
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

        <Link to='/orders'>
          <div className="flex items-center gap-4 mb-8 hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
            <img src={ord} alt="Categories" className="max-w-[40px]" />
            <p className="text-lg font-medium">Orders</p>
          </div>
        </Link>

       
          <div 
          
          onClick={handleLogout}
          className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg transition-all duration-300">
            <img src={logout} alt="Logout" className="max-w-[40px]" />
            <p className="text-lg font-medium">Logout</p>
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
