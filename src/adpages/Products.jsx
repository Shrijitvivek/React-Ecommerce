import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Products() {
  const [prod, setProd] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:2000/admin/products', { withCredentials: true })
      .then((res) => {
        if (res.data && Array.isArray(res.data.products)) {
          setProd(res.data.products);
        } else {
          setProd([]);
        }
      })
      .catch(() => {
        setProd([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:2000/admin/products/${id}`, { withCredentials: true })
        .then(() => {
          fetchProducts(); 
        })
        .catch((err) => {
          console.error('Failed to delete', err);
          alert('Failed to delete product');
        });
    }
  };
  return (
    <div className="ml-50 p-8">
      <Sidebar />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <Link to="addprod">
          <button className="bg-green-500 p-2 rounded">+ Add New Product</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Product Name</th>
              <th className="text-left px-4 py-2 border-b">Price</th>
              <th className="text-left px-4 py-2 border-b">Description</th>
              <th className="text-left px-4 py-2 border-b">Category</th>
              <th className="text-left px-4 py-2 border-b">Image</th>
              <th className="text-left px-4 py-2 border-b">Stock</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(prod) && prod.length > 0 ? (
              prod.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{product.ProductName}</td>
                  <td className="px-4 py-2 border-b">{product.Price}</td>
                  <td className="px-4 py-2 border-b">{product.Description}</td>


                  <td className="px-4 py-2 border-b">
                    {product.Category?.name || 'No Category'}
                  </td>

                  <td className="px-4 py-2 border-b">
                    {product.ProductImage ? (
                      <img
                        src={`http://localhost:2000/${product.ProductImage}`}
                        className="w-30 h-30"
                        alt={product.ProductName}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">{product.Stock}</td>

                  <td className="text-left px-4 py-2 border-b">
                    <Link to={`/editprod/${product._id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>


                    <button onClick={()=>handleDelete(product._id)}className="bg-red-500 text-white px-4 mx-5 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
