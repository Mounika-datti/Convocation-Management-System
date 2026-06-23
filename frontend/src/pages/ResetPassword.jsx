import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      newPassword: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword:
            formData.newPassword,
        }
      );

      console.log(res.data);

      alert(
        "Password Reset Successfully"
      );

      localStorage.removeItem(
        "resetEmail"
      );

      localStorage.removeItem(
        "resetOTP"
      );

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Password Reset Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

        <div className="text-center mb-8">

          <div className="flex justify-center">
            <div className="bg-white p-5 rounded-full shadow-lg">
              <FaLock
                size={35}
                className="text-blue-800"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Reset Password
          </h1>

          <p className="text-white mt-2">
            Create a new password
          </p>

          {email && (
            <p className="text-yellow-300 text-sm mt-2">
              {email}
            </p>
          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* New Password */}

          <div>

            <label className="text-white text-sm">
              New Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="newPassword"
                placeholder="Enter New Password"
                value={
                  formData.newPassword
                }
                onChange={
                  handleChange
                }
                required
                className="w-full p-3 rounded-xl outline-none border border-gray-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-600"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="text-white text-sm">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Retype Password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                required
                className="w-full p-3 rounded-xl outline-none border border-gray-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-600"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-white hover:text-yellow-300 inline-flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;