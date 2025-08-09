import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'


export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/admin/users', { withCredentials: true })
      .then((res) => {
        console.log(res.data.users);
        
        setUsers(res.data.users)
      })
      .catch((error) => {
        console.error('Error fetching Users:', error)
      })
  },[])
  return (
   <div className=" ml-50 p-8">
    <Sidebar/>
  <h1 className="text-2xl font-bold mb-6">User List</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left px-4 py-2 border-b"> Name</th>
          <th className="text-left px-4 py-2 border-b">Email</th>
          <th className="text-left px-4 py-2 border-b">Image</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{user.name}</td>
            <td className="px-4 py-2 border-b">{user.email}</td>
            <td 
            className="px-4 py-2 border-b">
              <img src={`http://localhost:2000/${user.image}`} 
              className='w-35 h-45 rounded-full ' />
            </td>
           

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}
