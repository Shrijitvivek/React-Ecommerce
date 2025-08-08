import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Addcat() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); 
    const navigate = useNavigate();

    const handleSave = () => {
        axios.post('http://localhost:2000/admin/categories', { name, description }, 
            { withCredentials: true }
        )
        .then(() => {
            navigate('/categories');
        })
        .catch((err) => {
            console.error('Could not edit category ', err);
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-50 p-8 flex-1">
                <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

                <div className="max-w-md bg-white p-6 rounded shadow">
                    <label className="block mb-2 font-medium">Category Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={handleSave}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}