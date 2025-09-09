import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Addprod() {
    const navigate = useNavigate()
    const [name, SetName] = useState("")
    const [price, SetPrice] = useState("")
    const [desc, SetDesc] = useState("")
    const [categ, SetCateg] = useState("")
    const [stock, SetStock] = useState("")
    const [image, SetImage] = useState(null)
    const [categories, SetCategories] = useState([])

    useEffect(() => {
        axios.get('/admin/categories', { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data)) {
                    SetCategories(res.data)
                } else if (res.data.categories) {
                    SetCategories(res.data.categories)
                }
            })
            .catch((err) => {
                console.error('Could not fetch categories', err)
            })
    }, [])

    const handleConfirm = () => {
        const formData = new FormData()
        formData.append('ProductName', name)
        formData.append("Description", desc)
        formData.append("Price", price)
        formData.append("Category", categ)
        formData.append("Stock", stock)
        if (image) {
            formData.append("ProductImage", image)
        }

        axios.post('/admin/products', formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => {
                navigate('/products')
            })
            .catch((err) => {
                console.error('Could not add product ', err)
            })
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-50 p-8 flex-1">
                <h1 className="text-2xl font-bold mb-6">Add Product</h1>

                <div className="max-w-md bg-white p-6 rounded shadow">
                    <label className="block mb-2 font-medium">Product Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={name}
                        onChange={(e) => SetName(e.target.value)}
                    />

                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={desc}
                        onChange={(e) => SetDesc(e.target.value)}
                    />

                    <label className="block mb-2 font-medium">Category</label>
                    <select
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={categ}
                        onChange={(e) => SetCateg(e.target.value)}>
                        <option value="">Choose a Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2 font-medium">Product Image</label>
                    <input
                        type="file"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        onChange={(e) => SetImage(e.target.files[0])}
                    />

                    <label className="block mb-2 font-medium">Price</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={price}
                        onChange={(e) => SetPrice(e.target.value)}
                    />

                    <label className="block mb-2 font-medium">Stock</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        value={stock}
                        onChange={(e) => SetStock(e.target.value)}
                    />

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={handleConfirm}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
