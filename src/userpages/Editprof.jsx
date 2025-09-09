import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditProfile() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", image: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/auth/check");
        if (res.data.loggedIn) {
          setForm({
            name: res.data.user.name || "",
            email: res.data.user.email || "",
            image: null,
          });
        } else {
          navigate("/uselogin");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/uselogin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      if (form.image) data.append("image", form.image);

      await api.put(`/user/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed, please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-medium">Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <label className="font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <label className="font-medium">Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
