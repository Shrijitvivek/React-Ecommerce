import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/user/products/${id}`);
        setProduct(res.data?.product || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await api.post("/user/cart", {
        ProductId: product._id,
        Quantity: quantity,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Please login first to add items to cart.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={`/api/prodimg/${product.ProductImage}`}
              alt={product.ProductName || "Product"}
              className="w-full max-w-sm h-auto rounded-xl shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.ProductName}
              </h1>
              <p className="text-2xl text-blue-600 font-semibold mt-3">
                ₹{product.Price}
              </p>
              <p className="text-xl mt-5 text-gray-700 leading-relaxed">
                {product.Description}
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <label className="text-lg font-medium text-gray-800">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="border rounded-lg p-2 w-20 text-center shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-black text-white px-6 py-3 mt-6 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
