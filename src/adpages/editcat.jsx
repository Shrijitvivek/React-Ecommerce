import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios'; // use centralized API instance
import Sidebar from './Sidebar';

export default function Editcat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    api.get(`/admin/categories/${id}`) // relative path
      .then(res => {
        if (res.data.category) {
          setName(res.data.category.name || '');
          setDescription(res.data.category.description || '');
        }
      })
      .catch(err => {
        console.error('Failed to fetch category', err);
      });
  }, [id]);

  const handleUpdate = () => {
    api.put(`/admin/categories/${id}`, { name, description }) // relative path
      .then(() => {
        alert('Category updated successfully!');
        navigate('/categories');
      })
      .catch(err => {
        console.error('Failed to update category', err);
        alert('Update failed.');
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-50 p-8 flex-1 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}
