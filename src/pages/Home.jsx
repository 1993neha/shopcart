import { useState } from "react";
import { products } from "../data";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();

  const categories = ["all", ...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full"
                >
                  <Link to={`/product/${product.id}`} className="flex-grow-0">
                    <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2 h-14 overflow-hidden">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 truncate max-w-[100px]">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating.rate} ({product.rating.count})
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>  
        )}
      </div>
    </div>
  );
};

export default Home;