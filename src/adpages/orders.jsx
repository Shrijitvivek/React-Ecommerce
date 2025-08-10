import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // adjust path if needed

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/admin/orders", { withCredentials: true })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar on the left */}
      <div style={{ width: "250px", background: "#f5f5f5" }}>
        <Sidebar />
      </div>

      {/* Table content on the right */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Username
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Items
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Total
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.UserName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.Items.map((item, idx) => (
                    <div key={idx}>
                      {item.ProductName} - {item.Quantity} × ₹{item.Price} =
                      ₹{item.SubTotal}
                    </div>
                  ))}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ₹{order.Total}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <select value={order.DeliveryStatus || ""}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
