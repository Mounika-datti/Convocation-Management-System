import { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaCertificate,
  FaBell,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import { dashboardSummary } from "../services/reportService";

function Reports() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await dashboardSummary();

      setSummary(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-blue-900">
            Reports Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Convocation Management Reports
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <FaUsers
              className="text-blue-700 mb-4"
              size={40}
            />

            <h2 className="text-lg font-semibold">
              Total Students
            </h2>

            <p className="text-3xl font-bold mt-3">
              {summary?.total_students}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <FaClipboardCheck
              className="text-green-600 mb-4"
              size={40}
            />

            <h2 className="text-lg font-semibold">
              Registrations
            </h2>

            <p className="text-3xl font-bold mt-3">
              {summary?.total_registrations}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <FaMoneyBillWave
              className="text-yellow-600 mb-4"
              size={40}
            />

            <h2 className="text-lg font-semibold">
              Payments
            </h2>

            <p className="text-3xl font-bold mt-3">
              {summary?.total_payments}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <FaCertificate
              className="text-purple-600 mb-4"
              size={40}
            />

            <h2 className="text-lg font-semibold">
              Certificates
            </h2>

            <p className="text-3xl font-bold mt-3">
              {summary?.total_certificates}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <FaBell
              className="text-red-500 mb-4"
              size={40}
            />

            <h2 className="text-lg font-semibold">
              Notifications
            </h2>

            <p className="text-3xl font-bold mt-3">
              {summary?.total_notifications}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;