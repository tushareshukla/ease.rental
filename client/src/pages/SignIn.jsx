import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="bg-login-bg bg-cover min-h-screen flex items-center justify-center">
      <div className="p-5 max-w-md mx-auto bg-white bg-opacity-80 rounded-lg shadow-lg">
        <Link to="/">
          <h1 className="font-bold  text-center text-2xl sm:text-xl flex flex-wrap mb-3 ml-2">
            <span className="mr-2">LOGIN TO</span>
            <span className="text-blue-500">EASE</span>
            <span className="text-gray-800">.RENTALS</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Loading..." : "LOGIN"}
          </button>
          <div className="font-bold text-center">
            <span>------- OR -------</span>
          </div>
          <OAuth />
        </form>
        <div className="flex justify-between mt-5">
          <Link to="/sign-up" className="text-red-700 hover:underline">
            Create an account
          </Link>
        </div>
        {error && (
          <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
