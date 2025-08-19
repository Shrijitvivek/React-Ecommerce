import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", image: null });
  const navigate = useNavigate();

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
      data.append("password", form.password);
      if (form.image) data.append("image", form.image);

      await api.post("/user/register", data);
      alert("Registered successfully!");
      navigate("/uselogin");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
        <input name="fullname" type="text" placeholder="Name" onChange={handleChange} required className="border p-2 rounded" />
        <input name="fullemail" type="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="border p-2 rounded" />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
