import SignIn from "./SignIn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.sucess === false) {
        setLoding(false);
        setError(data.message);
        return;
      }
      setLoding(false);
      setError(null);
    } catch (error) {
      setLoding(false);
      setError(error.message);
      navigate("/sign-in");
    }
  };

  return (
    <div className=" bg-cover min-h-screen flex items-center justify-center">
      <div className="p-5 max-w-md mx-auto bg-white bg-opacity-80 rounded-lg shadow-lg">
        <Link to="/">
          <h1 className="font-bold  text-center text-xl sm:text-xl flex flex-wrap mb-3 ml-2">
            <span className="mr-2">WELCOME TO</span>
            <span className="text-blue-600">EASE</span>
            <span className="text-gray-800">.RENTALS</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg focus:outline-none"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-gray-800 text-white p-3 rounded-lg uppercase hover:bg-gray-700 focus:outline-none"
          >
            {loading ? "Loading..." : "CREATE ACCOUNT"}
          </button>
          <OAuth />
        </form>
        <div className="flex justify-between mt-5">
          <Link to="/sign-in" className="text-red-700 hover:underline">
            Already have an account?
          </Link>
        </div>
        {error && (
          <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
