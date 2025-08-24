import phonelap from '../assets/pl.jpg';
import books from '../assets/bks3.avif';
import snacks from '../assets/fud.png';
import homeappl from '../assets/elec.jpg';
import { useNavigate } from "react-router-dom";

export default function BrowseTemplate() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 lg:p-16 bg-gray-50 min-h-screen">
      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-10">
        Shop by Category
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Phones & Laptops */}
        <div
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
          onClick={() => navigate(`/categories/687dc5fdd65009b81e993377`)}
        >
          <img src={phonelap} className="w-full h-52 object-cover" alt="Phones and Laptops"/>
          <div className="text-center p-4 text-lg font-semibold text-gray-700">
            Phones & Laptops
          </div>
        </div>

        {/* Books */}
        <div
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
          onClick={() => navigate(`/categories/6895dd0b1627838b92c8e878`)}
        >
          <img src={books} className="w-full h-52 object-cover" alt="Books and Stationery"/>
          <div className="text-center p-4 text-lg font-semibold text-gray-700">
            Books & Stationery
          </div>
        </div>

        {/* Beverages & Snacks */}
        <div
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
          onClick={() => navigate(`/categories/689727b7530b0df3e863301e`)}
        >
          <img src={snacks} className="w-full h-52 object-cover" alt="Beverages and Snacks"/>
          <div className="text-center p-4 text-lg font-semibold text-gray-700">
            Beverages & Snacks
          </div>
        </div>

        {/* Home Appliances */}
        <div
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
          onClick={() => navigate(`/categories/689af77989b8bb0453adbb1d`)}
        >
          <img src={homeappl} className="w-full h-52 object-cover" alt="Home Appliances"/>
          <div className="text-center p-4 text-lg font-semibold text-gray-700">
            Home Appliances
          </div>
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-10 text-center">
        <button
          className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition font-medium"
          onClick={() => navigate('/user/categories')}
        >
          View More →
        </button>
      </div>
    </div>
  );
}
