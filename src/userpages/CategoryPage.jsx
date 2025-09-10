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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/user/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategoryId) {
        setProducts([]);
        return;
      }
      try {
        const res = await api.get(`/user/products/categories/${selectedCategoryId}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row mt-6 px-4 md:px-10 gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full bg-white border rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                  selectedCategoryId === cat._id
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
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
        </aside>

        {/* Products */}
        <main className="md:w-3/4 w-full">
          {selectedCategoryId ? (
            <>
              <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                {categories.find((c) => c._id === selectedCategoryId)?.name || "Products"}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                  products.map((p) => (
                    <div
                      key={p._id}
                      className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                      onClick={() => navigate(`/product/${p._id}`)}
                    >
                      <img
                        src={`/api/prodimg${p.ProductImage}`}
                        alt={p.ProductName}
                        className="ml-5 mt-4 w-46 h-46 rounded-md mb-3 mr-5"
                      />
                      <h3 className="font-semibold text-lg truncate">{p.ProductName}</h3>
                      <p className="text-blue-600 font-bold mt-2">₹{p.Price}</p>
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
        </main>
      </div>
    </>
  );
}
