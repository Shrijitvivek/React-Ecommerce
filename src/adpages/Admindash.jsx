import React from 'react';
import Sidebar from './Sidebar';
import AdminHome from './AdminHome';

function Admindash() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="ml-56 p-10 w-full">
        <h1 className="text-3xl font-semibold mb-4">Welcome, Admin</h1>
        <p className="text-gray-700">Use the sidebar to manage products, orders, and users.</p>

        <AdminHome/>
      </div>
    </div>
  )
}

export default Admindash;
