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


  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Please log in first</h2>
        <button
          onClick={() => navigate("/uselogin")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!cart || cart.CartDetails?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold">Your Cart is empty</h2>
        <button onClick={()=>navigate('/home')} className="m-5 bg-black text-xl text-white p-3 rounded-xl">Shop Products</button>
      </div>
    );
  }

  const subtotal = cart.Total[0]?.Total || 0;

  return (
    <>
      <Navbar/>
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          {cart.CartDetails.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b py-4"
            >
            
              <img
                src={`http://localhost:2000/${item.Proddet.ProductImage}`}
                
                className="w-40 h-40  rounded-md cursor-pointer"
                onClick={() => navigate(`/product/${item.Proddet._id}`)}
              />

            
              <div className="flex-1 ml-6">
                <h3 className="font-semibold text-xl">{item.Proddet.ProductName}</h3>
                <p className="text-lg">₹{item.Proddet.Price}</p>

            
                <div className="flex items-center mt-3">
                  <button
                    onClick={() => updateQuantity(item.Proddet._id, item.Items.Quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-4">{item.Items.Quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.Proddet._id, item.Items.Quantity + 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

            
              <div className="flex flex-col items-end">
                <p className="font-bold text-xl">₹{item.SubTotal}</p>
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

       
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <p className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>₹20</span>
          </p>
          <hr />
          <p className="flex justify-between mt-5 mb-2">
            <span className="text-xl">Total Amount</span>
            <span className="text-xl">₹{subtotal + 20}</span>
          </p>
          <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
    </>
  
  );
}
