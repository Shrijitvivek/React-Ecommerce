import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/user/orders")
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.error("Error fetching orders", err));
  }, []);

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <h2 className="text-3xl font-extrabold text-gray-800">No Orders Yet</h2>
        <p className="text-gray-600 mt-2">Your order history will appear here</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <h2 className="text-4xl font-bold mb-10 text-center text-purple-700">
          🛒 Order History
        </h2>

        <div className="space-y-10">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className=" ml-50 mr-50 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200"
            >
            
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 flex justify-between items-center">
                <h3 className="text-lg font-bold">Order #{idx + 1}</h3>
                <p className="text-sm opacity-90">
                  Placed on: {formatDate(order.createdAt)}
                </p>
              </div>

           
              <div className="divide-y divide-gray-200">
                {order.Items.map((item, i) => (
                  <div
                    key={i}
                    className=" flex items-center gap-4 p-4 cursor-pointer hover:bg-purple-50 transition"
                   
                  >
                 

                  
                    <div className="flex-1">
                      <h4 className="font-semibold text-2xl text-gray-800">
                        {item.ProductName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.Quantity}
                      </p>
                    </div>

                
                    <span className="font-bold text-xl text-blue-600">
                      ₹{item.SubTotal}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-t border-gray-200">
                <p className="text-2xl font-bold text-gray-800">
                  Total: ₹{order.Total + 20}
                   <p className="text-sm">(incl. of all taxes)</p>
                </p>
               
                <span
                  className={`mt-2 md:mt-0 px-4 py-1.5 rounded-full text-sm font-medium ${
                    order.DeliveryStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.DeliveryStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {order.DeliveryStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
