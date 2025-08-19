import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Homeprod() {
  const [products, setProducts] = useState([]);
  const img = "http://localhost:2000/";
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    api
      .get("/user/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected response format", res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold my-5">
        AVAILABLE PRODUCTS
      </h1>

      <div className="relative flex items-center">
     
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        >
          ◀
        </button>

       
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 p-4 
             [scrollbar-width:none] [-ms-overflow-style:none] 
             [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className=" mt-5 flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={img + product.ProductImage}
                alt={product.ProductName}
                className="h-60 w-50 "
              />
              <h2 className="text-lg font-semibold mt-3">
                {product.ProductName}
              </h2>
              <p className="text-blue-600 font-bold mt-2">₹{product.Price}</p>
            </div>
          ))}
        </div>

       
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        >
          ▶
        </button>
      </div>
    </>
  );
}
