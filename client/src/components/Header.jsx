import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
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
            <span className="text-blue-500">EASE</span>
            <span className="text-white">.RENTALS</span>
          </h1>
        </Link>
        <div className="sm:hidden flex items-center">
          <Link to="/profile" className="ml-4">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-white hover:text-blue-500">Sign in</span>
            )}
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-3 rounded-lg flex items-center ml-4"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch className="text-gray-700" />
            </button>
          </form>
          <FaBars
            className="text-white text-2xl cursor-pointer ml-4"
            onClick={toggleSidebar}
          />
        </div>
        <div className="hidden sm:flex items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-3 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch className="text-gray-700" />
            </button>
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="text-white hover:text-blue-500 ml-4">Home</li>
            </Link>
            <Link to="/about">
              <li className="text-white hover:text-blue-500">About</li>
            </Link>
            <a
              href="https://www.ease.rentals"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="text-white hover:text-blue-500">Manage Rents</li>
            </a>
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <li className="text-white hover:text-blue-500">Sign in</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      {showSidebar && (
        <div
          className="bg-gray-800 text-white w-48 fixed top-0 right-0 h-full transition-transform transform trangray-x-0 shadow-md"
          style={{ zIndex: 999 }} // Set a higher z-index value here
        >
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2></h2>
              <FaTimes
                className="text-white text-xl cursor-pointer"
                onClick={closeSidebar}
              />
            </div>
            <ul className="text-xl">
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
                  Manage Rents
                </a>
              </li>
              {currentUser ? (
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
              ) : (
                <Link to="/sign-in">
                  <li>Sign in</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
