import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaCheckCircle,
  FaUniversity,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

import {
  registerConvocation,
  getRegistrationStatus,
} from "../services/registrationService";
import api from "../services/api";

function ConvocationRegistration() {
  const [attendanceType, setAttendanceType] =
    useState("In Person");

  const [declaration, setDeclaration] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState(null);

  const [degree, setDegree] = useState("");
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");

  const degreeOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA"];
  const programOptions = ["Regular", "Lateral", "Distance"];
  const departmentOptions = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];

  const alreadyRegistered = Boolean(status);

  useEffect(() => {
    fetchRegistrationStatus();
  }, []);

  const fetchRegistrationStatus =
    async () => {
      try {
        const res =
          await getRegistrationStatus();

        if (res.data.success) {
          setStatus(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!declaration) {
      alert(
        "Please accept the declaration."
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        session_id: 2,
        attendance_type:
          attendanceType,
     
      };

      const res =
        await registerConvocation(
          payload
        );

      alert(res.data.message);

      // update student profile with selected program/degree/department
      try {
        await api.put("/student/profile", {
         
        });
      } catch (err) {
        // ignore profile update failures for now
      }

      fetchRegistrationStatus();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-[30px] shadow-2xl border border-white/40 p-10"
        >
          <div className="text-center mb-10">

            <div className="flex justify-center mb-5">

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-5 rounded-full shadow-xl">

                <FaGraduationCap
                  size={45}
                  className="text-white"
                />

              </div>

            </div>

            <h1 className="text-4xl font-bold text-blue-900">
              Convocation Registration
            </h1>

            <p className="text-gray-600 mt-3">
              Register for the University
              Convocation Ceremony
            </p>

          </div>

          {status && (
            <div className="mb-10 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-3xl shadow-lg p-6">

              <div className="flex items-center gap-3 mb-5">

                <FaCheckCircle className="text-green-600 text-3xl" />

                <h2 className="text-2xl font-bold text-green-700">
                  Registration Status
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-white rounded-2xl shadow-md p-5">

                  <p className="text-gray-500">
                    Status
                  </p>

                  <h3 className="text-xl font-bold text-green-600 mt-2">
                    {status.status}
                  </h3>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-5">

                  <p className="text-gray-500">
                    Payment
                  </p>

                  <h3 className="text-xl font-bold text-orange-600 mt-2">
                    {status.payment_status}
                  </h3>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-5">

                  <p className="text-gray-500">
                    Attendance
                  </p>

                  <h3 className="text-xl font-bold text-blue-700 mt-2">
                    {status.attendance_type}
                  </h3>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-5">

                  <p className="text-gray-500">
                    Session ID
                  </p>

                  <h3 className="text-xl font-bold text-indigo-700 mt-2">
                    {status.session_id}
                  </h3>

                </div>

              </div>

            </div>
          )}
                    <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Attendance Type */}

            <div>

              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FaUniversity className="text-blue-700" />
                Select Attendance Type
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* In Person */}

                <div
                  onClick={() =>
                    setAttendanceType("In Person")
                  }
                  className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 shadow-lg hover:scale-105
                  ${
                    attendanceType === "In Person"
                      ? "border-blue-700 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div className="bg-blue-700 p-4 rounded-full">

                      <FaGraduationCap
                        className="text-white"
                        size={30}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        In Person
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Attend the Convocation
                        Ceremony physically.
                      </p>

                    </div>

                  </div>

                </div>

                {/* In Absentia */}

                <div
                  onClick={() =>
                    setAttendanceType(
                      "In Absentia"
                    )
                  }
                  className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 shadow-lg hover:scale-105
                  ${
                    attendanceType ===
                    "In Absentia"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div className="bg-yellow-500 p-4 rounded-full">

                      <FaCalendarAlt
                        className="text-white"
                        size={30}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        In Absentia
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Receive your degree
                        without attending the
                        ceremony.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Declaration */}

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl border border-blue-100 p-6 shadow-md">

              <label className="flex items-start gap-4 cursor-pointer">

                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) =>
                    setDeclaration(
                      e.target.checked
                    )
                  }
                  className="mt-1 h-5 w-5"
                />

                <span className="text-gray-700 leading-7">
                  I hereby declare that all
                  the information provided by
                  me is true and correct. I
                  agree to abide by the
                  University's Convocation
                  rules and regulations.
                </span>

              </label>

            </div>

            {/* Summary */}

            <div className="rounded-3xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-6 shadow-lg">

              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Registration Summary
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between">

                  <span className="font-medium">
                    Session
                  </span>

                  <span>1</span>

                </div>

                <div className="flex justify-between">

                  <span className="font-medium">
                    Attendance
                  </span>

                  <span className="font-bold text-blue-700">
                    {attendanceType}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="font-medium">
                    Registration
                  </span>

                  <span className="text-orange-600 font-bold">
                    Pending
                  </span>

                </div>

              </div>

            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading || alreadyRegistered}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xl font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {alreadyRegistered
                ? "Already Registered"
                : loading
                ? "Registering..."
                : "Register for Convocation"}
            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default ConvocationRegistration;