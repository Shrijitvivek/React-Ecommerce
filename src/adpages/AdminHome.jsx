import { useEffect, useState } from "react";
import api from "../api/axios"; 

export default function AdminHome() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard-counts"); 
        console.log("API Response:", res.data); 
        setStats(res.data); 
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{stats.products}</p>
        </div>

        <div className="bg-green-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{stats.orders}</p>
        </div>

        <div className="bg-purple-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
        </div>

        <div className="bg-red-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Total Categories</h2>
          <p className="text-3xl font-bold mt-2">{stats.categories}</p>
        </div>
      </div>
    </div>
  );
}
