import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaSearch,
  FaEye,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";

import {
  getDocuments,
  approveRegistration,
  rejectRegistration,
  allocateSeat,
  generateQR,
} from "../services/adminService";

const requiredDocuments = [
  "Passport Photo",
  "Aadhaar Card",
  "Degree Certificate",
  "Provisional Certificate",
  "Fee Receipt",
  "Signature",
];

function VerifyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [previewDocs, setPreviewDocs] =
    useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch Documents

  const fetchDocuments = async () => {
    try {
      const res = await getDocuments();

      const rows = res.data.data;

      const grouped = {};

      rows.forEach((row) => {
        if (!grouped[row.student_id]) {
          grouped[row.student_id] = {
            student_id: row.student_id,
            registration_id: row.registration_id,
            full_name: row.full_name,
            hall_ticket_no: row.hall_ticket_no,
            program: row.program,
            department: row.department,
            status: row.status,
            seat_number: row.seat_number,
  hall_block: row.hall_block,
  row_number: row.row_number,
  qr_code: row.qr_code,

            documents: [],
          };
        }

        if (row.document_name) {
          grouped[row.student_id].documents.push({
            name: row.document_name,
            path: row.document_path,
          });
        }
      });

      setDocuments(Object.values(grouped));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (path) => {
    window.open(
      `http://localhost:5000/uploads/${path}`,
      "_blank"
    );
  };

  const handlePreviewAll = (docs) => {
    setPreviewDocs(docs);
    setPreviewOpen(true);
  };

 const handleApprove = async (studentId) => {
  try {
    await approveRegistration(studentId);
    await allocateSeat(studentId);
    await generateQR(studentId);
    alert("Approved and certificate generated successfully");
        alert(
      "Approved, Seat Allocated and Certificate Generated"
    );

    fetchDocuments();
  } catch (error) {
    console.log(error);
    alert(
      error?.response?.data?.message ||
        "Failed to generate certificate."
    );
  }
};

 const handleReject = async (id) => {
  console.log("Reject ID:", id);

  try {
    await rejectRegistration(id);
    alert("Rejected Successfully");
    fetchDocuments();
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.message);
  }
};
  const filteredStudents =
    documents.filter(
      (student) =>
        student.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.hall_ticket_no
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div className="flex items-center gap-5">

              <div className="bg-white/20 p-5 rounded-2xl">

                <FaFileAlt
                  size={38}
                  className="text-white"
                />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-white">
                  Verify Documents
                </h1>

                <p className="text-gray-200 mt-2">
                  Verify uploaded student documents
                </p>

              </div>

            </div>

            <div className="relative w-full lg:w-96">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Student..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>

          </div>

        </div>
        {/* ===========================
      Student Cards
=========================== */}

{loading ? (

  <div className="flex justify-center items-center h-96">

    <div className="text-3xl font-bold text-blue-700 animate-pulse">
      Loading Documents...
    </div>

  </div>

) : (

  <div className="space-y-8">

    {filteredStudents.length === 0 ? (

      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

        <h2 className="text-2xl font-bold text-gray-500">
          No Students Found
        </h2>

      </div>

    ) : (

      filteredStudents.map((student) => {

        const uploaded =
          student.documents.map((doc) => doc.name);

        const missing =
          requiredDocuments.filter(
            (doc) => !uploaded.includes(doc)
          );

        const complete =
          missing.length === 0;

        const statusLabel =
          student.status === "Approved"
            ? "Approved"
            : student.status === "Rejected"
            ? "Rejected"
            : complete
            ? "Ready for Approval"
            : "Documents Incomplete";

        const statusClass =
          student.status === "Approved"
            ? "bg-green-100 text-green-700"
            : student.status === "Rejected"
            ? "bg-red-100 text-red-700"
            : complete
            ? "bg-blue-100 text-blue-700"
            : "bg-orange-100 text-orange-700";

        return (

          <div
            key={student.student_id}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
          >

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 flex flex-col lg:flex-row justify-between lg:items-center">

              <div>

                <h2 className="text-2xl font-bold text-white">

                  {student.full_name}

                </h2>

                <p className="text-blue-100 mt-2">

                  Hall Ticket :
                  {" "}
                  {student.hall_ticket_no}

                </p>

              </div>

              <div className="mt-4 lg:mt-0">

                <span className={`${statusClass} px-6 py-2 rounded-full font-semibold`}>
                  {statusLabel}
                </span>

              </div>

            </div>

            {/* Body */}

            <div className="grid lg:grid-cols-2 gap-8 p-8">

              {/* Uploaded Documents */}

              <div>

                <h3 className="text-xl font-bold text-gray-800 mb-5">

                  Uploaded Documents

                </h3>

                <div className="space-y-3">

                  {student.documents.length === 0 ? (

                    <div className="bg-gray-100 rounded-xl p-4 text-gray-500">

                      No Documents Uploaded

                    </div>

                  ) : (

                    student.documents.map((doc) => (

                      <div
                        key={doc.name}
                        className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                      >

                        <span className="font-medium text-gray-800">

                          {doc.name}

                        </span>

                        <button
                          onClick={() =>
                            handleView(doc.path)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >

                          <FaEye />

                        </button>

                      </div>

                    ))

                  )}

                </div>

              </div>

              {/* Missing Documents */}

              <div>

                <h3 className="text-xl font-bold text-gray-800 mb-5">

                  Missing Documents

                </h3>

                <div className="space-y-3">

                  {missing.length === 0 ? (

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-semibold">

                      All Required Documents Uploaded

                    </div>

                  ) : (

                    missing.map((doc) => (

                      <div
                        key={doc}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 text-gray-700"
                      >

                        {doc}

                      </div>

                    ))

                  )}

                </div>

              </div>

            </div>

{/* Seat Allocation */}

{student.status === "Approved" &&
 student.seat_number && (

  <div className="px-8 pb-6">

    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

      <h3 className="text-xl font-bold text-green-700 mb-4">
        🎓 Seat Allocation
      </h3>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Seat Number
          </p>
          <h4 className="text-lg font-bold text-blue-700">
            {student.seat_number}
          </h4>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Hall Block
          </p>
          <h4 className="text-lg font-bold text-purple-700">
            {student.hall_block}
          </h4>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Row Number
          </p>
          <h4 className="text-lg font-bold text-green-700">
            {student.row_number}
          </h4>
        </div>

      </div>

    </div>

  </div>

)}
{/* QR Code */}

{student.qr_code && (

  <div className="px-8 pb-6">

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">

      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🎫 Convocation Entry QR
      </h3>

      <div className="flex justify-center">

        <img
          src={student.qr_code}
          alt="QR Code"
          className="w-56 h-56 border rounded-xl p-2 bg-white"
        />

      </div>

      <p className="text-center text-gray-500 mt-4">
        Scan this QR during convocation entry
      </p>

    </div>

  </div>

)}
            {/* Footer */}

            <div className="border-t bg-gray-50 px-8 py-6">

              <div className="flex flex-wrap gap-4 justify-end">

                <button
                  onClick={() =>
                    handlePreviewAll(
                      student.documents
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >

                  View All Documents

                </button>

                <button
                  disabled={!complete || statusLabel === "Approved" || statusLabel === "Rejected"}
                  onClick={() => handleApprove(student.student_id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
                    !complete || statusLabel === "Approved" || statusLabel === "Rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Approve
                </button>

                <button
                  disabled={statusLabel === "Approved" || statusLabel === "Rejected"}
                  onClick={() => handleReject(student.student_id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
                    statusLabel === "Approved" || statusLabel === "Rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Reject
                </button>

              </div>

            </div>

          </div>

        );

      })

    )}

  </div>

)}
{/* ===========================
        Preview Modal
=========================== */}

{previewOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-8 py-6 flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Student Documents
          </h2>

          <p className="text-blue-100 mt-1">
            Preview Uploaded Documents
          </p>

        </div>

        <button
          onClick={() => setPreviewOpen(false)}
          className="bg-white text-red-600 hover:bg-red-50 px-5 py-2 rounded-xl font-semibold transition-all"
        >
          Close
        </button>

      </div>

      {/* Body */}

      <div className="p-8 overflow-y-auto max-h-[75vh] bg-gray-50">

        {previewDocs.length === 0 ? (

          <div className="flex justify-center items-center h-60">

            <h2 className="text-2xl text-gray-500 font-semibold">
              No Documents Available
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {previewDocs.map((doc, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >

                {/* Card Header */}

                <div className="bg-gradient-to-r from-slate-100 to-gray-100 px-5 py-4 border-b">

                  <h3 className="font-bold text-lg text-gray-800 truncate">
                    {doc.name}
                  </h3>

                </div>

                {/* Preview Area */}

                <div className="h-80 flex justify-center items-center bg-gray-100 p-4">

                  {doc.path &&
                  doc.path
                    .toLowerCase()
                    .endsWith(".pdf") ? (

                    <iframe
                      title={doc.name}
                      src={`http://localhost:5000/uploads/${doc.path}`}
                      className="w-full h-full rounded-lg border"
                    />

                  ) : (

                    <img
                      src={`http://localhost:5000/uploads/${doc.path}`}
                      alt={doc.name}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />

                  )}

                </div>

                {/* Footer */}

                <div className="p-5 flex gap-3">

                  <button
                    onClick={() => handleView(doc.path)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-all"
                  >
                    Open
                  </button>

                  <a
                    href={`http://localhost:5000/uploads/${doc.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-center font-medium transition-all"
                  >
                    Download
                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
)}

      </div>

    </div>
  );
}

export default VerifyDocuments;