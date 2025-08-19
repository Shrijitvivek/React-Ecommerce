import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

export default function CategoryPage() {
  const { id } = useParams(); 
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(id || null);
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/user/categories")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      api.get(`/user/products/categories/${selectedCategoryId}`)

        .then(res => setProducts(res.data.products))
        .catch(err => console.error(err));
    } else {
      setProducts([]); 
    }
  }, [selectedCategoryId]);

  return (
    <>
    <Navbar/>
   <div className="flex mt-5 p-5 gap-8 ml-15 mr-15 ">

  <div className="w-1/4 bg-gray-100 p-4  rounded-lg shadow">
    <h2 className="text-lg font-bold mb-4">Categories</h2>
    <ul className="space-y-2">
      {categories.map(cat => (
        <li
          key={cat._id}
          className={`cursor-pointer px-2 py-1 rounded-md transition-colors ${
            selectedCategoryId === cat._id
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "hover:bg-gray-200"
          }`}
          onClick={() => {
            setSelectedCategoryId(cat._id);
            navigate(`/categories/${cat._id}`);
          }}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  </div>


  <div className="w-3/4">
    {selectedCategoryId ? (
      <>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          {categories.find(c => c._id === selectedCategoryId)?.name || "Products"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(p => (
              <div
                key={p._id}
                className="ml-5 mr-5 border rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={`http://localhost:2000/${p.ProductImage}`}
                  alt={p.ProductName}
                  className="w-58 h-72 rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg ">{p.ProductName}</h3>
                <p className="text-blue-600 font-medium mt-1">₹{p.Price}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available
            </p>
          )}
        </div>
      </>
    ) : (
      <p className="text-gray-500">Select a category from the sidebar</p>
    )}
  </div>
</div>

    </>
    
  );
}
