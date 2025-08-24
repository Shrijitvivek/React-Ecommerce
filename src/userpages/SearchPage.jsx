import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      // get all products and filter them (since you don’t have backend search yet)
      api.get("/user/products")
        .then((res) => {
          const all = res.data.products;
          const filtered = all.filter((p) =>
            p.ProductName.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results for "{query}"</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id} className="p-4 bg-white shadow rounded-lg">
              <img
                src={`http://localhost:2000/${p.ProductImage}`}
                alt={p.ProductName}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{p.ProductName}</h3>
              <p className="text-gray-600">₹{p.Price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
