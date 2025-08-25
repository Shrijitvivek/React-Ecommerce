import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:2000/admin/users', { withCredentials: true })
      .then((res) => {
        setUsers(res.data.users)
      })
      .catch((error) => {
        console.error('Error fetching Users:', error)
      })
  }

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:2000/admin/users/${id}/status`,
        { status: !currentStatus }, 
        { withCredentials: true }
      )

     
      setUsers(users.map(user =>
        user._id === id ? { ...user, status: !currentStatus } : user
      ))
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  return (
    <div className="ml-50 p-8">
      <Sidebar />
      <h1 className="text-2xl font-bold mb-6">User List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Image</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={`http://localhost:2000/upload/${user.image}`}
                    className="w-26 h-26 rounded-full object-cover"
                    alt={user.name}
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  {user.status ? (
                    <span className="text-green-600 font-semibold">Enabled</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Disabled</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => toggleStatus(user._id, user.status)}
                    className={`px-3 py-1 rounded-md text-white ${
                      user.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {user.status ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
