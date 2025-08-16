import {useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios' 
import Navbar from './Navbar'


export default function ProductDetails() {
    const {id} = useParams()
    const [product , SetProduct] = useState(null)
    const [quantity , SetQuantity] = useState(1)
    const navigate = useNavigate()
    
    useEffect(()=>{
        api.get(`/user/products/${id}`)
        .then(res => SetProduct(res.data.product))
        .catch(err => console.error(err))
    },[id])
    
    if(!product){
        return <p>Loading....</p>
    }
  return (
    <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <img 
                    src={`http://localhost:2000/${product.ProductImage}`} 
                    alt={product.ProductName} 
                    className=" w-60 h-full object-cover rounded-md" 
                />
                <h1 className="text-3xl font-bold mt-4">{product.ProductName}</h1>
                <p className="text-xl text-blue-600 font-semibold mt-2">₹{product.Price}</p>
                <p className="text-xl mt-4 text-gray-700">{product.Description}</p>

                <div className="mt-6 flex items-center gap-4">
                    <label className=" text-xl font-semibold">Quantity :</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        min="1"
                        onChange={e => SetQuantity(Number(e.target.value))}
                        className="border p-2 w-16 text-center"
                    />
                </div>
                
                <div>
  <button
    onClick={async () => {
      try {
        await api.post("/user/cart", {
          ProductId: product._id,
          Quantity: quantity,
        });
        navigate("/cart"); // ✅ only navigate after success
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Please login first to add items to cart.");
      }
    }}
    className="bg-black text-white m-5 p-4 text-xl rounded-xl"
  >
    Add to Cart
  </button>
</div>

            </div>
        </>
   
  )
}
