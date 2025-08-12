import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Homeprod() {
    const [products, setProducts] = useState([]);
    const img = 'http://localhost:2000/'

    useEffect(() => {
        api.get('/user/products')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                } else {
                    console.error("Unexpected response format", res.data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
        <h1 className='text-center text-4xl font-extrabold my-5'> AVAILABLE PRODUCTS</h1>
          <div className="w- p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
                <div key={product._id} className=" flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4 ">
                
                    <img
                        src={img + product.ProductImage}
                        className='h-50 w-45'
                    
                       
                    />
                    <h2 className="text-lg font-semibold mt-3">{product.ProductName}</h2>

                    <p className="text-blue-600 font-bold mt-2">₹{product.Price}</p>
                </div>
            ))}
        </div>
        </>
      
    );
}
