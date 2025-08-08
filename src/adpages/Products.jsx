import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Products() {
  const [prod, setProd] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/admin/products', { withCredentials: true })
      .then((res) => {
        setProd(res.data.products)
      })
      .catch((error) => {
        console.error('Error fetching Products:', error)
      })
  },[])
  return (
   <div className="p-8">
  <h1 className="text-2xl font-bold mb-6">Products</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left px-4 py-2 border-b">Product Name</th>
          <th className="text-left px-4 py-2 border-b">Price</th>
          <th className="text-left px-4 py-2 border-b">Description</th>
          <th className="text-left px-4 py-2 border-b">Image</th>
          <th className="text-left px-4 py-2 border-b">Stock</th>
          <th className="text-left px-4 py-2 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {prod.map((product, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{product.ProductName}</td>
            <td className="px-4 py-2 border-b">{product.Price}</td>
            <td className="px-4 py-2 border-b">{product.Description}</td>
            <td 
            className="px-4 py-2 border-b">
              <img src={`http://localhost:2000/${product.ProductImage}`} 
              className='w-30 h-30 ' />
            </td>
            <td className="px-4 py-2 border-b">{product.Stock}</td>
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
