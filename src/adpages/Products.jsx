import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import api from "../api/axios"; // centralized API instance

export default function Products() {
  const [prod, setProd] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ProductsPerPage = 3;

  const fetchProducts = async (page) => {
    try {
      const res = await api.get(`/admin/products?page=${page}&limit=${ProductsPerPage}`);
      setProd(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProd([]);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await api.delete(`/admin/products/${id}`);
        fetchProducts(currentPage);
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  return (
    <div className="ml-50 p-8">
      <Sidebar />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <Link to="addprod">
          <button className="bg-green-500 p-2 rounded">
            + Add New Product
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="text-xl">
            <tr className="bg-gray-100">
              <th className="text-center px-4 py-2 border-b">Product Name</th>
              <th className="text-center px-4 py-2 border-b">Price</th>
              <th className="text-center px-4 py-2 border-b">Description</th>
              <th className="text-center px-4 py-2 border-b">Category</th>
              <th className="text-center px-4 py-2 border-b">Image</th>
              <th className="text-center px-4 py-2 border-b">Stock</th>
              <th className="text-center px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {prod.length > 0 ? (
              prod.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{product.ProductName}</td>
                  <td className="px-4 py-2 border-b">₹{product.Price}</td>
                  <td className="px-4 py-2 border-b">{product.Description}</td>
                  <td className="px-4 py-2 border-b">{product.Category?.name || "No Category"}</td>
                  <td className="px-4 py-2 border-b">
                    {product.ProductImage ? (
                      <img
                        src={`api/prodimg${product.ProductImage}`} 
                        className="w-30 h-30"
                        alt={product.ProductName}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{product.Stock}</td>
                  <td className="text-left px-4 py-2 border-b">
                    <Link to={`/editprod/${product._id}`}>
                      <button className="bg-blue-500 text-white mx-6 px-5 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white my-3 px-4 mx-5 py-1 rounded hover:bg-red-600"
                    >
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
