import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import api from "../services/api";
import { getRegistrationStatus } from "../services/registrationService";
import { getDocuments } from "../services/documentService";

function StudentDashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [registrationStatus, setRegistrationStatus] = useState("Not Registered");
  const [documentStatus, setDocumentStatus] = useState("Pending");
  const [certificateStatus, setCertificateStatus] = useState("Not Available");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/student/profile");
        if (res.data?.data) setUser(res.data.data);
      } catch (err) {
        // keep localStorage user as fallback
      }
    };

    const fetchDashboardStatus = async () => {
      try {
        const [registrationRes, documentsRes, certificateRes] =
          await Promise.all([
            getRegistrationStatus().catch((error) => error),
            getDocuments().catch((error) => error),
            // getStudentCertificate().catch((error) => error),
          ]);

        if (registrationRes?.data?.success) {
          const registration = registrationRes.data.data;
          setRegistrationStatus(registration.status || "Pending");
          setPaymentStatus(registration.payment_status || "Pending");
        } else {
          setRegistrationStatus("Not Registered");
          setPaymentStatus("Pending");
        }

        if (documentsRes?.data?.success) {
          const documents = documentsRes.data.data || [];
          const requiredDocuments = [
            "Degree Certificate",
            "Provisional Certificate",
          ];
          const hasAllRequired = requiredDocuments.every((requiredDoc) =>
            documents.some((doc) => doc.document_name === requiredDoc)
          );

          setDocumentStatus(
            documents.length === 0 ? "Pending" : hasAllRequired ? "Complete" : "Pending"
          );
        } else {
          setDocumentStatus("Pending");
        }

        if (certificateRes?.data?.success) {
          const certificates = certificateRes.data.data || [];
          setCertificateStatus(certificates.length > 0 ? "Available" : "Not Available");
        } else {
          setCertificateStatus("Not Available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchDashboardStatus();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

       <h1 className="text-4xl font-bold text-blue-900">
  Welcome, {user.full_name || "Student"}
</h1>

        <p className="text-gray-500 mt-2">
          Convocation Management Dashboard
        </p>

        {/* Profile Card */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Candidate Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <p>
  <strong>Name:</strong> {user.full_name || "-"}
</p>


            <p>
  <strong>Email:</strong> {user.email || "-"}
</p>

            <p>
  <strong>Department:</strong> {user.department || "-"}
</p>


            <p>
  <strong>Roll No:</strong> {user.roll_no || "-"}
</p>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <StatsCard
            title="Registration"
            value={registrationStatus}
            color={
              registrationStatus === "Complete" || registrationStatus === "Approved"
                ? "bg-green-500"
                : registrationStatus === "Rejected"
                ? "bg-red-500"
                : "bg-orange-500"
            }
          />

          <StatsCard
            title="Documents"
            value={documentStatus}
            color={
              documentStatus === "Complete"
                ? "bg-green-600"
                : "bg-orange-500"
            }
          />

          <StatsCard
            title="Certificate"
            value={certificateStatus}
            color={
              certificateStatus === "Available"
                ? "bg-blue-700"
                : "bg-gray-500"
            }
          />

          <StatsCard
            title="Payment"
            value={paymentStatus}
            color={
              paymentStatus === "Paid" || paymentStatus === "Completed"
                ? "bg-green-600"
                : paymentStatus === "Rejected"
                ? "bg-red-500"
                : "bg-purple-600"
            }
          />

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {/* Upload Documents */}

          <Link
            to="/upload-documents"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h3 className="font-bold text-xl">
              📄 Upload Documents
            </h3>

            <p className="mt-3 text-gray-500">
              Upload required documents.
            </p>
          </Link>

          {/* Convocation Registration */}

          <Link
            to="/convocation-registration"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h3 className="font-bold text-xl">
              📝 Registration
            </h3>

            <p className="mt-3 text-gray-500">
              Register for Convocation.
            </p>
          </Link>

          {/* Certificate */}


          {/* Student Profile */}

          <Link
            to="/student-profile"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h3 className="font-bold text-xl">
              👤 My Profile
            </h3>

            <p className="mt-3 text-gray-500">
              View and update your profile.
            </p>
          </Link>

          {/* Notifications */}

          <Link
            to="/notifications"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h3 className="font-bold text-xl">
              🔔 Notifications
            </h3>

            <p className="mt-3 text-gray-500">
              View important notifications.
            </p>
          </Link>

          {/* Events */}

          <Link
            to="/event-details"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h3 className="font-bold text-xl">
              📅 Events
            </h3>

            <p className="mt-3 text-gray-500">
              View convocation event details.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;