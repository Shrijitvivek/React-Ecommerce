import React, { useEffect, useState } from "react";
import api from "../api/axios"; // centralized API instance
import Sidebar from "./Sidebar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/admin/orders/${id}`, { deliveryStatus: status })
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, DeliveryStatus: status } : o))
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <div className="ml-50 p-8">
      <Sidebar />
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Username</th>
              <th className="text-left px-4 py-2 border-b">Product Name</th>
              <th className="text-left px-4 py-2 border-b">Quantity</th>
              <th className="text-left px-4 py-2 border-b">Price</th>
              <th className="text-left px-4 py-2 border-b">SubTotal</th>
              <th className="text-left px-4 py-2 border-b">Total(incl. of all Taxes)</th>
              <th className="text-left px-4 py-2 border-b">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) =>
                order.Items.map((item, idx) => (
                  <tr key={`${order._id}-${idx}`} className="hover:bg-gray-50">
                    {idx === 0 && (
                      <td className="px-4 py-2 border-b" rowSpan={order.Items.length}>
                        {order.UserName}
                      </td>
                    )}
                    <td className="px-4 py-2 border-b">{item.ProductName}</td>
                    <td className="px-4 py-2 border-b">{item.Quantity}</td>
                    <td className="px-4 py-2 border-b">₹{item.Price}</td>
                    <td className="px-4 py-2 border-b">₹{item.SubTotal}</td>
                    {idx === 0 && (
                      <td className="px-4 py-2 border-b" rowSpan={order.Items.length}>
                        ₹{order.Total + 20}
                      </td>
                    )}
                    {idx === 0 && (
                      <td className="px-4 py-2 border-b" rowSpan={order.Items.length}>
                        <select
                          value={order.DeliveryStatus || ""}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="border rounded px-2 py-1"
                          disabled={order.DeliveryStatus === "Delivered"}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
