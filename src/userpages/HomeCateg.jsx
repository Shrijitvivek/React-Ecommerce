
import phonelap from '../assets/pl.jpg'
import books from '../assets/bks3.avif'
import snacks from '../assets/fud.png'
import homeappl from '../assets/elec.jpg'
import { useNavigate } from "react-router-dom";

export default function BrowseTemplate() {
  const navigate = useNavigate();

  const CategoryPage = (categoryName) => {
    navigate(`user/categories?selected=${categoryName}`);
  };

  return (
    <div className="mt-40 p-5 bg-gray-100 min-h-screen ml-20 mr-20 rounded-2xl">
      <h2 className="text-center text-xl font-bold mb-6">
        SHOP BY CATEGORY
      </h2>

      <div className="ml-15 mr-15 grid grid-cols-2 gap-20">
        
        <div
          className="bg-white rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
          onClick={() =>navigate(`/categories/687dc5fdd65009b81e993377`)}
        >
          <img src={phonelap} className="w-full h-60" />
          <div className=" text-center p-5 text-2xl font-bold">Phones and Laptops</div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
          onClick={() => navigate(`/categories/6895dd0b1627838b92c8e878`)}
        >
          <img src={books} className="w-full h-60" />
          <div className="text-center p-5 text-2xl font-bold">Books and Stationery</div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
          onClick={() =>navigate(`/categories/689727b7530b0df3e863301e`)}
        >
          <img src={snacks} className="w-full h-60" />
          <div className="text-center p-5 text-2xl font-bold">Beverages and Snacks</div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
          onClick={() =>navigate(`/categories/689af77989b8bb0453adbb1d`)}
        >
          <img src={homeappl}className="w-full h-60" />
          <div className="text-center p-5 text-2xl font-bold">Home Appliances</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          onClick={() => navigate('/user/categories')} 
        >
          View More ...
        </button>
      </div>
    </div>
  );
}
