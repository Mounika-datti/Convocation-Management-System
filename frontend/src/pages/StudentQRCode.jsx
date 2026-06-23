import { useEffect, useState } from "react";
import { FaQrcode, FaChair } from "react-icons/fa";
import { getStudentQR } from "../services/studentQRService";

function StudentQRCode() {
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQR();
  }, []);

  const fetchQR = async () => {
    try {
      const res = await getStudentQR();

      console.log("QR Response:", res.data);

      if (res.data.success) {
        setQrData(res.data.data);
      }
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
        "Failed to load QR Pass"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading QR Pass...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
          <h2 className="text-red-600 text-xl font-bold">
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl">
              <FaQrcode
                size={40}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Convocation Entry Pass
              </h1>

              <p className="text-blue-100 mt-2">
                Show this QR Code during
                convocation entry
              </p>
            </div>

          </div>

        </div>

        {/* Main Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Student Details */}

          <div className="p-8 border-b">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Student Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="mb-3">
                  <strong>Name:</strong>{" "}
                  {qrData?.full_name}
                </p>

                <p className="mb-3">
                  <strong>Hall Ticket:</strong>{" "}
                  {qrData?.hall_ticket_no}
                </p>

                <p className="mb-3">
                  <strong>Program:</strong>{" "}
                  {qrData?.program}
                </p>
              </div>

              <div>
                <p className="mb-3">
                  <strong>Seat Number:</strong>{" "}
                  {qrData?.seat_number}
                </p>

                <p className="mb-3">
                  <strong>Hall Block:</strong>{" "}
                  {qrData?.hall_block}
                </p>

                <p className="mb-3">
                  <strong>Row Number:</strong>{" "}
                  {qrData?.row_number}
                </p>
              </div>

            </div>

          </div>

          {/* QR Section */}

          <div className="p-10 flex flex-col items-center">

            <div className="flex items-center gap-3 mb-6">

              <FaChair
                className="text-blue-600"
                size={25}
              />

              <h2 className="text-2xl font-bold">
                Entry QR Code
              </h2>

            </div>

            {qrData?.qr_code ? (

              <img
                src={qrData.qr_code}
                alt="QR Code"
                className="w-72 h-72 border-4 border-blue-100 rounded-3xl shadow-lg bg-white p-4"
              />

            ) : (

              <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                QR Code Not Generated Yet
              </div>

            )}

            <p className="text-gray-500 mt-6 text-center">
              Scan this QR Code at the
              convocation entrance for
              verification and attendance.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentQRCode;