import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        ShopCart
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/cart" className="relative text-white hover:text-gray-300">
          <FiShoppingCart className="text-xl" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;