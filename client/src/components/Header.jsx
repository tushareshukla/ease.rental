import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-500">EASE.</span>
            <span className="text-white">RENTALS</span>
          </h1>
        </Link>
        <div className="hidden sm:flex items-center">
          <div className="flex flex-center mr-auto">
            {" "}
            {/* Center the search bar */}
            <form className="bg-gray-100 p-3 rounded-lg flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-24 sm:w-64"
              />
              <FaSearch className="text-gray-600" />
            </form>
          </div>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="text-white hover:text-red-600 ml-4">Home</li>
            </Link>
            <Link to="/about">
              <li className="text-white hover:text-red-600">About</li>
            </Link>
            <a
              href="https://www.ease.rentals"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="text-white hover:text-red-600">Manage Rental</li>
            </a>
            <Link to="/sign-in">
              <li className="text-white hover:text-red-600">Sign in</li>
            </Link>
          </ul>
        </div>
        <div className="sm:hidden">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </div>
      {showSidebar && (
        <div className="bg-gray-800 text-white w-48 fixed top-0 right-0 h-full transition-transform transform translate-x-0 shadow-md">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2>Menu</h2>
              <FaTimes
                className="text-white text-xl cursor-pointer"
                onClick={closeSidebar}
              />
            </div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a
                  href="https://www.ease.rentals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage Rental
                </a>
              </li>
              <li>
                <Link to="/sign-in">Sign in</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
