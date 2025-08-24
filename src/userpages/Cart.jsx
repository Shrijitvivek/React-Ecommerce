import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "./Navbar";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/auth/check")
      .then((res) => setUser(res.data.user || null))
      .catch(() => setUser(null));

    fetchCart();
  }, []);

  const fetchCart = () => {
    api.get("/user/cart")
      .then((res) => setCart(res.data.UserCart[0]))
      .catch(() => setCart(null));
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/user/cart/${productId}`, { Quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/user/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const placeOrder = async () => {
    try {
      await api.post("/user/orders");
      alert("Order placed successfully");
      setCart(null);
      navigate("orders");
    } catch (err) {
      console.error("Error placing order", err);
      alert("Failed to place order");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Please log in first</h2>
        <button
          onClick={() => navigate("/uselogin")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!cart || cart.CartDetails?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold">Your Cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-black text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800"
        >
          Shop Products
        </button>
      </div>
    );
  }

  const subtotal = cart.Total[0]?.Total || 0;

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            {cart.CartDetails.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b py-4 gap-6"
              >
                {/* Product Image */}
                <img
                  src={`http://localhost:2000/${item.Proddet.ProductImage}`}
                  alt={item.Proddet.ProductName}
                  className="w-32 h-32 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate(`/product/${item.Proddet._id}`)}
                />

                {/* Product Info */}
                <div className="flex-1 w-full sm:ml-6 text-center sm:text-left">
                  <h3 className="font-semibold text-lg">{item.Proddet.ProductName}</h3>
                  <p className="text-gray-600">₹{item.Proddet.Price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start mt-3">
                    <button
                      onClick={() => updateQuantity(item.Proddet._id, item.Items.Quantity - 1)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-4 text-lg">{item.Items.Quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.Proddet._id, item.Items.Quantity + 1)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col items-center sm:items-end">
                  <p className="font-bold text-lg">₹{item.SubTotal}</p>
                  <button
                    onClick={() => removeItem(item.Proddet._id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <p className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₹20</span>
            </p>
            <hr className="my-3" />
            <p className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>₹{subtotal + 20}</span>
            </p>
            <button
              onClick={placeOrder}
              className="w-full px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
