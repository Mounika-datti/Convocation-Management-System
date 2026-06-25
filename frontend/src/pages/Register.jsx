import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

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
      full_name: "",
      hall_ticket_no: "",
      roll_no: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      program: "",
      degree: "",
      department: "",
      college_name: "",
      batch: "",
      graduation_year: "",
      address: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const degreeOptions = ["B.Tech", "PHD"];
  const programOptions = ["UG", "PG"];
  const departmentOptions = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "IT"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name:
          formData.full_name,

        hall_ticket_no:
          formData.hall_ticket_no,

        roll_no:
          formData.roll_no,

        email:
          formData.email,

        password:
          formData.password,

        phone:
          formData.phone,

        program:
          formData.program,

        degree:
          formData.degree,

        department:
          formData.department,

        college_name:
          formData.college_name,
        
        batch:
         formData.batch,
        graduation_year:
          formData.graduation_year,

        address:
          formData.address,
      };

      const res =
        await registerUser(payload);

      console.log(res.data);

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white shadow-xl lg:block">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <div className="inline-flex rounded-full bg-slate-900/80 p-4 shadow-lg ring-1 ring-white/10">
                  <FaUserGraduate size={36} className="text-cyan-300" />
                </div>

                <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white">
                  Create Your Account
                </h1>
                <p className="mt-4 max-w-xl text-slate-200/90 leading-relaxed">
                  Register to join the convocation portal and manage your documents,
                  notifications, and certificate downloads from one secure dashboard.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-400/10 p-6">
                <h2 className="text-lg font-semibold text-cyan-100">Why register?</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-200/90">
                  <li>• Secure access to your student profile</li>
                  <li>• Upload required convocation documents</li>
                  <li>• Track registration and download certificate</li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-semibold text-slate-900">Registration</h2>
              <p className="mt-3 text-sm text-slate-500">
                Fill out all fields to create your student account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="text"
                name="hall_ticket_no"
                placeholder="Hall Ticket Number"
                value={formData.hall_ticket_no}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="text"
                name="roll_no"
                placeholder="Roll Number"
                value={formData.roll_no}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-slate-900 outline-none"
                >
                  <option value="">Select Program</option>
                  {programOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-slate-900 outline-none"
                >
                  <option value="">Select Degree</option>
                  {degreeOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-slate-900 outline-none"
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="college_name"
                placeholder="College Name"
                value={formData.college_name}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

<div>
    <label>Batch</label>

    <input
        type="text"
        name="batch"
        value={formData.batch}
        onChange={handleChange}
        placeholder="2022-2026"
        required
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
    />
</div>
              <input
                type="number"
                name="graduation_year"
                placeholder="Graduation Year"
                value={formData.graduation_year}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="md:col-span-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 resize-none"
              />

              <div className="relative md:col-span-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative md:col-span-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Retype Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="mt-8 text-center text-slate-500">
              <p>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;
