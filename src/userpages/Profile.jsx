import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/auth/check");
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          navigate("/uselogin");
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        navigate("/uselogin");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        {user.image && (
          <img
            src={`api/upload/${user.image}`}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto shadow"
          />
        )}

        <p className="text-lg mt-4">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(`/edit/${user._id || user.id}`)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/cart/orders")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Order History
          </button>
        </div>
      </div>
    </>
  );
}
