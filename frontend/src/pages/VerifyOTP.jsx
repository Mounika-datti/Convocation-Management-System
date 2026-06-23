import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaKey, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Email saved from ForgotPassword page
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      console.log(res.data);

      alert("OTP Verified Successfully");

      navigate("/reset-password");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "OTP Verification Failed"
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
              <FaKey
                className="text-blue-800"
                size={35}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Verify OTP
          </h1>

          <p className="text-white mt-2">
            Enter the OTP sent to your email
          </p>

          {email && (
            <p className="text-yellow-300 mt-2 text-sm">
              {email}
            </p>
          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="text-white text-sm">
              OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              required
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none text-center text-xl tracking-[8px]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/forgot-password"
            className="text-white hover:text-yellow-300 inline-flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </Link>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;