import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';

export default function Category() {
  const [categ, setCateg] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = () => {
    axios.get('http://localhost:2000/admin/categories', { withCredentials: true })
      .then((res) => {
        setCateg(res.data.categories || []);
      })
      .catch((error) => {
        console.error('Error fetching Categories:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      axios.delete(`http://localhost:2000/admin/categories/${id}`, { withCredentials: true })
        .then(() => {
         fetchCategories()
        })
        .catch((err) => {
          console.error('Failed to delete category:', err);
          alert('Failed to delete category');
        });
    }
  };

  return (
    <div className="ml-50 p-8">
      <Sidebar />
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-6">Categories</h1>
        <Link to='addcat'>
          <button className='bg-green-500 p-2 rounded'> + Add New Category</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="my-5 min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Description</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {categ.length > 0 ? (
              categ.map((cgry, index) => (
                <tr key={cgry._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{cgry.name}</td>
                  <td className="px-4 py-2 border-b">{cgry.description}</td>
                  <td className="text-left px-4 py-2 border-b">
                    <Link to={`/editcat/${cgry._id}`}>
                      <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(cgry._id)}
                      className='bg-red-500 text-white px-4 mx-5 py-1 rounded hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
