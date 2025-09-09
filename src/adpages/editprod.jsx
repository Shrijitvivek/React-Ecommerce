import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios"; // centralized API instance
import Sidebar from "./Sidebar";

export default function Editprod() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    api.get(`/admin/products/${id}`)
      .then((res) => {
        const prod = res.data.product;
        if (prod) {
          setName(prod.ProductName || "");
          setDesc(prod.Description || "");
          setPrice(prod.Price || "");
          setStock(prod.Stock || "");
          setCateg(prod.Category?._id || prod.Category || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Could not fetch product", err);
        setLoading(false);
      });
  }, [id]);

  // Fetch categories
  useEffect(() => {
    api.get("/admin/categories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (res.data.categories) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.error("Could not fetch categories", err);
      });
  }, []);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("ProductName", name);
    formData.append("Description", desc);
    formData.append("Price", price);
    formData.append("Category", categ);
    formData.append("Stock", stock);
    if (image) formData.append("ProductImage", image);

    api.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error("Could not update product", err);
      });
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-50 p-8 flex-1">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <div className="max-w-md bg-white p-6 rounded shadow">
          <label className="block mb-2 font-medium">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mb-2 font-medium">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label className="block mb-2 font-medium">Category</label>
          <select
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={categ}
            onChange={(e) => setCateg(e.target.value)}
          >
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
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label className="block mb-2 font-medium">Price</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="block mb-2 font-medium">Stock</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
