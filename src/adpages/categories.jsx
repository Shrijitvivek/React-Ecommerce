import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'


export default function Category() {
  const [categ, setCateg] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/admin/categories', { withCredentials: true })
      .then((res) => {
        setCateg(res.data.categories)
      })
      .catch((error) => {
        console.error('Error fetching Categories:', error)
      })
  },[])
  return (
   <div className=" ml-50 p-8">
    <Sidebar/>
    <div className='flex justify-between'>
 <h1 className="text-2xl font-bold mb-6">Categories</h1>
 <Link to='addcat'>
 <button className='bg-green-500 p-2 rounded'> + Add Category</button>
 </Link>
 

    </div>
 
  <div className="overflow-x-auto">
    <table className=" my-5 min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left px-4 py-2 border-b">Name</th>
          <th className="text-left px-4 py-2 border-b">Description</th>
          <th className="text-left px-4 py-2 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {categ.map((cgry, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{cgry.name}</td>
            <td className="px-4 py-2 border-b">{cgry.description}</td>
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
