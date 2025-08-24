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
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-700">
          🛒 Order History
        </h2>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-500 transform -translate-x-1/2"></div>

          {orders.map((order, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center md:justify-between mb-12`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-white border-4 border-purple-500 rounded-full transform -translate-x-1/2"></div>

              {/* Card */}
              <div
                className={`bg-white shadow-xl rounded-2xl p-6 w-full md:w-[45%] ${
                  idx % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-indigo-600">
                    Order #{idx + 1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.Items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-purple-50 transition cursor-pointer"
                      onClick={() => navigate(`/product/${item.ProductId}`)}
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.ProductName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.Quantity}
                        </p>
                      </div>
                      <span className="font-bold text-blue-600">
                        ₹{item.SubTotal}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-6 border-t pt-4">
                  <p className="text-lg font-bold text-gray-800">
                    Total: ₹{order.Total + 20}
                    <span className="block text-sm text-gray-500">
                      (incl. of all taxes)
                    </span>
                  </p>
                  <span
                    className={`mt-2 sm:mt-0 px-4 py-1.5 rounded-full text-sm font-medium ${
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
