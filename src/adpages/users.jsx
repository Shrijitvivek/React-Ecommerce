import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
   <div className="p-8">
  <h1 className="text-2xl font-bold mb-6">User List</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left px-4 py-2 border-b"> Name</th>
          <th className="text-left px-4 py-2 border-b">Email</th>
          <th className="text-left px-4 py-2 border-b">Image</th>
          <th className="text-left px-4 py-2 border-b">Action</th>
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
              className='w-35 h-40 rounded-full ' />
            </td>
            <td className="text-left px-4 py-2 border-b">
              <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>Edit</button> 
              <button className='bg-red-500 text-white px-4 mx-5 py-1 rounded hover:bg-red-600'>Delete</button>
              </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}
