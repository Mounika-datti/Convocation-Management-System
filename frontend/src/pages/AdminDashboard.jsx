import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";

import {
  FaUsers,
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaCertificate,
  FaFileAlt
} from "react-icons/fa";

import {
  getDashboardStats,
  getRevenue,
  getRecentActivities
} from "../services/adminService";


function AdminDashboard() {
  const [stats, setStats] = useState({});

  const [revenue, setRevenue] =
    useState(0);
  const [activities, setActivities] =
  useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchRevenue();
    fetchActivities();
  }, []);
   const fetchActivities = async () => {
  try {

    const res =
      await getRecentActivities();

    setActivities(res.data.data);

  } catch (error) {
    console.log(error);
  }
};
  const fetchDashboard =
    async () => {
      try {
        const res =
          await getDashboardStats();

        setStats(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const fetchRevenue =
    async () => {
      try {
        const res =
          await getRevenue();

        setRevenue(
          res.data.totalRevenue || 0
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="mb-8">

            <h1 className="text-4xl font-bold text-blue-900">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Convocation Management
              System
            </p>

          </div>
                    {/* Statistics Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

            {/* Total Students */}

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">

              <FaUsers
                className="text-blue-700 mb-4"
                size={40}
              />

              <h3 className="text-gray-500 font-semibold">
                Total Students
              </h3>

              <h1 className="text-4xl font-bold text-blue-900 mt-3">
                {stats?.total_students || 0}
              </h1>

            </div>
<div className="bg-white rounded-3xl shadow-xl p-6">
  <FaUserGraduate
    size={40}
    className="text-green-600 mb-3"
  />

  <h3 className="text-gray-500">
    UG Students
  </h3>

  <h1 className="text-4xl font-bold">
    {stats?.ug_students || 0}
  </h1>
</div>
<div className="bg-white rounded-3xl shadow-xl p-6">
  <FaUserGraduate
    size={40}
    className="text-purple-600 mb-3"
  />

  <h3 className="text-gray-500">
    PG Students
  </h3>

  <h1 className="text-4xl font-bold">
    {stats?.pg_students || 0}
  </h1>
</div>
            {/* Registrations */}

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">

              <FaClipboardCheck
                className="text-green-600 mb-4"
                size={40}
              />

              <h3 className="text-gray-500 font-semibold">
                Registrations
              </h3>

              <h1 className="text-4xl font-bold text-green-700 mt-3">
                {stats?.total_registrations || 0}
              </h1>

            </div>

            {/* Documents */}

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">

              <FaFileAlt
                className="text-orange-500 mb-4"
                size={40}
              />

              <h3 className="text-gray-500 font-semibold">
                Documents
              </h3>

              <h1 className="text-4xl font-bold text-orange-600 mt-3">
                {stats?.total_documents || 0}
              </h1>

            </div>

          </div>


                    {/* Recent Activity & Quick Actions */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Recent Activity */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Recent Activity
              </h2>

              <div className="space-y-5">

                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-2xl">

                  <div>
                    <h3 className="font-semibold text-blue-900">
                      🎓 New Student Registered
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Student registration completed successfully.
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    Today
                  </span>

                </div>

                <div className="flex items-center justify-between bg-green-50 p-4 rounded-2xl">

                  <div>
                    <h3 className="font-semibold text-green-700">
                      📄 Document Verified
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Student document approved.
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    1 Hour Ago
                  </span>

                </div>

                <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-2xl">

                  <div>
                    <h3 className="font-semibold text-yellow-700">
                      💰 Payment Received
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Convocation fee paid successfully.
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    2 Hours Ago
                  </span>

                </div>

                <div className="flex items-center justify-between bg-purple-50 p-4 rounded-2xl">

                  <div>
                    <h3 className="font-semibold text-purple-700">
                      🏆 Certificate Generated
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Student certificate generated.
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    Yesterday
                  </span>

                </div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <Link
                  to="/manage-students"
                  className="block bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  👨‍🎓
                  <br />
                  Manage Students
                </Link>

                <Link
                  to="/verify-documents"
                  className="block bg-green-600 hover:bg-green-700 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  📄
                  <br />
                  Verify Documents
                </Link>

                <Link
                  to="/manage-events"
                  className="block bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  📅
                  <br />
                  Manage Events
                </Link>

                <Link
                  to="/generate-certificates"
                  className="block bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  🏆
                  <br />
                  Certificates
                </Link>

                <Link
                  to="/reports"
                  className="block bg-red-500 hover:bg-red-600 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  📊
                  <br />
                  Reports
                </Link>

                <Link
                  to="/notifications"
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-5 font-bold transition-all duration-300 text-center"
                >
                  🔔
                  <br />
                  Notifications
                </Link>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl shadow-2xl p-8 text-center text-white">

            <h2 className="text-3xl font-bold mb-3">
              JNTU-GV Convocation Management System
            </h2>

            <p className="text-blue-100">
              Admin Dashboard • Built with React.js, Tailwind CSS,
              PostgreSQL & Express.js
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default AdminDashboard;