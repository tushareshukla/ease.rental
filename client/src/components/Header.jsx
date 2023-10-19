import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-600">EASE</span>
            <span className="text-white">.RENTALS</span>
          </h1>
        </Link>
        <form className="bg-gray-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-gray-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-white hover:text-red-600">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-white hover:text-red-600">
              About
            </li>
          </Link>
          <a
            href="https://www.ease.rentals"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="hidden sm:inline text-white hover:text-red-600">Manage Rental</li>
          </a>
          <Link to="/sign-in">
            <li className="text-white hover:text-red-600">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
