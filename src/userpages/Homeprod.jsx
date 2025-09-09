import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Homeprod() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Use relative path instead of hardcoded localhost (Nginx friendly)
  const imgBase = "/uploads/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/user/products");
        const prods = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(prods);
        setFilteredProducts(prods);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.ProductName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 bg-gray-50">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800">
        Available Products
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No products found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <img
                  src={imgBase + product.ProductImage}
                  alt={product.ProductName}
                  className="ml-5 mt-5 h-52 w-52 rounded-t-xl object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.ProductName}
                  </h2>
                  <p className="text-blue-600 font-bold mt-2">
                    ₹{product.Price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
