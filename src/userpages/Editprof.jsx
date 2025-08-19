import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditProfile() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", image: null });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/auth/check").then((res) => {
      if (res.data.loggedIn) {
        setForm({
          name: res.data.user.name,
          email: res.data.user.email,
          image: null,
        });
      } else {
        navigate("/uselogin");
      }
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      if (form.image) data.append("image", form.image);

      await api.put(`/user/edit/${id}`, data);
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <label >Name</label>
        <input name="name" type="text" value={form.name} onChange={handleChange} className="border p-2 rounded" />
        <label >Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <label >Image</label>
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}
