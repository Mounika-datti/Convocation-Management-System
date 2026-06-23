import { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserGraduate,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";

import {
  getStudents,
  searchStudent,
  deleteStudent,
} from "../services/adminService";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (studentId, studentName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to remove ${studentName}?`
  );

  if (!confirmDelete) return;

  try {
    await deleteStudent(studentId);

    alert("Student removed successfully");

    fetchStudents();
  } catch (error) {
    console.log(error);

    alert(
      error?.response?.data?.message ||
        "Failed to remove student"
    );
  }
};
  const handleSearch = async (value) => {
    setSearch(value);

    if (value.trim() === "") {
      fetchStudents();
      return;
    }

    try {
      const res = await searchStudent(value);

      setStudents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-blue-700 p-4 rounded-full">

              <FaUserGraduate
                className="text-white"
                size={30}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-blue-900">
                Manage Students
              </h1>

              <p className="text-gray-500">
                Convocation Management System
              </p>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="relative">

            <FaSearch className="absolute left-5 top-5 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Search by Name / Hall Ticket / Roll Number"
              className="w-full pl-14 p-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-600"
            />

          </div>

        </div>

        {/* Students Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-x-auto">

          {loading ? (

            <div className="p-10 text-center text-xl font-bold">
              Loading Students...
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4">
                    ID
                  </th>

                  <th className="p-4">
                    Name
                  </th>

                  <th className="p-4">
                    Hall Ticket
                  </th>

                  <th className="p-4">
                    Roll No
                  </th>

                  <th className="p-4">
                    Program
                  </th>

                  <th className="p-4">
                    Degree
                  </th>

                  <th className="p-4">
                    Department
                  </th>

                  <th className="p-4">
                    Graduation Year
                  </th>

                  <th className="p-4">
                    Email
                  </th>
                  <th className="p-4">
                       Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan="10"
                      className="text-center p-10"
                    >
                      No Students Found
                    </td>

                  </tr>

                ) : (

                  students.map((student) => (

                    <tr
                      key={student.id}
                      className="border-b hover:bg-blue-50 transition"
                    >

                      <td className="p-4">
                        {student.id}
                      </td>

                      <td className="p-4 font-semibold">
                        {student.full_name}
                      </td>

                      <td className="p-4">
                        {student.hall_ticket_no}
                      </td>

                      <td className="p-4">
                        {student.roll_no}
                      </td>

                      <td className="p-4">
                        {student.program}
                      </td>

                      <td className="p-4">
                        {student.degree}
                      </td>

                      <td className="p-4">
                        {student.department}
                      </td>

                      <td className="p-4">
                        {student.graduation_year}
                      </td>

                      <td className="p-4">
                        {student.email}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleDelete(
                              student.id,
                              student.full_name
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default ManageStudents;