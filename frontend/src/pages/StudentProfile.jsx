import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaGraduationCap,
  FaIdCard,
} from "react-icons/fa";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/student/profile");
      setStudent(res.data.data || res.data.student);
    } catch (error) {
      console.log(error);

      // Fallback to localStorage if API is unavailable
      const localUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (localUser) {
        setStudent(localUser);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-700 p-5 rounded-full text-white">
              <FaUserGraduate size={40} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                Profile
              </h1>

              <p className="text-gray-500">
                Convocation Management System
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaUserGraduate />
                <strong>Name:</strong>
                {student?.full_name}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaIdCard />
                <strong>Hall Ticket:</strong>
                {student?.hall_ticket_no}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaIdCard />
                <strong>Roll No:</strong>
                {student?.roll_no}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaEnvelope />
                <strong>Email:</strong>
                {student?.email}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaPhone />
                <strong>Phone:</strong>
                {student?.phone}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaGraduationCap />
                <strong>Program:</strong>
                {student?.program}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p>
                <strong>Degree:</strong>{" "}
                {student?.degree}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p>
                <strong>Department:</strong>{" "}
                {student?.department}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="flex items-center gap-3">
                <FaUniversity />
                <strong>College:</strong>
                {student?.college_name}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p>
                <strong>Graduation Year:</strong>{" "}
                {student?.graduation_year}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 md:col-span-2">
              <p>
                <strong>Address:</strong>{" "}
                {student?.address}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentProfile;