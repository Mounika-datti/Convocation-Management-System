import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";
import { adminLogin } from "../services/authService";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      alert("Admin Login Successful");

      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Logo */}

        <div className="flex flex-col items-center mb-8">

          <div className="bg-white p-5 rounded-full shadow-lg">
            <FaUserShield
              className="text-blue-900"
              size={38}
            />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Admin Portal
          </h1>

          <p className="text-gray-200 text-sm mt-2">
            University Convocation Management System
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}

          <div>
            <label className="text-white text-sm">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}

          <div>

            <label className="text-white text-sm">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-600"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center text-white text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              to="#"
              className="hover:text-yellow-300"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            Admin Login
          </button>

        </form>

        {/* Bottom */}

        <div className="mt-8 text-center text-white">

          <p className="text-sm">
            Return to{" "}
            <Link
              to="/"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Home Page
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;