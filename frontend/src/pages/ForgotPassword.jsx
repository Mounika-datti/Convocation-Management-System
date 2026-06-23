import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
       "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      console.log(res.data);

      // Save email for OTP verification page
      localStorage.setItem("resetEmail", email);

      alert(res.data.message);

      navigate("/verify-otp");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
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
              <FaEnvelope
                className="text-blue-800"
                size={35}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Forgot Password
          </h1>

          <p className="text-white/90 mt-2">
            Enter your registered email to
            receive OTP
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="text-white text-sm">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full mt-2 p-3 rounded-xl outline-none border border-gray-300"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition"
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
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

export default ForgotPassword;