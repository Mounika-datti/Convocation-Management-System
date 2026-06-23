import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("Login Response:", response.data);

      // Save token if available
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Save user if available
      // Save student data
if (response.data.student) {
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.student)
  );
}

      alert("Login Successful");

      navigate("/student-dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">

        <div className="flex flex-col items-center mb-6">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <FaUserGraduate
              size={35}
              className="text-blue-800"
            />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Login
          </h1>

          <p className="text-gray-100 text-sm mt-2">
            Convocation Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-white text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none"
            />
          </div>

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
                className="w-full p-3 rounded-xl border border-gray-300 outline-none"
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

          <div className="flex justify-between text-white text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
  to="/forgot-password"
  className="hover:text-yellow-300"
>
  Forgot Password?
</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-white mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-300 font-bold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;