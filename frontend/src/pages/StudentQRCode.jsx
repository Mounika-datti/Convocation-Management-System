import { useEffect, useState } from "react";
import { FaQrcode, FaChair, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
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

              <div className="bg-white p-6 rounded-3xl border-4 border-blue-100 shadow-lg w-80 h-80 flex items-center justify-center">
               <img
    src={qrData.qr_code}
    alt="QR Code"
    className="w-80 h-80 border rounded-xl shadow"
/>
              </div>

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
            <div className="mt-8 bg-blue-50 rounded-2xl p-6 w-full">

  <h2 className="text-xl font-bold mb-5">
    Convocation Details
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <p>
      <strong>Convocation ID:</strong>{" "}
      {qrData?.convocation_id}
    </p>

    <p>
      <strong>Seat Number:</strong>{" "}
      {qrData?.seat_number}
    </p>

    <p>
      <strong>Hall Block:</strong>{" "}
      {qrData?.hall_block}
    </p>

    <p>
      <strong>Row Number:</strong>{" "}
      {qrData?.row_number}
    </p>

    <p>
      <strong>Registration Status:</strong>{" "}
      <span className="text-green-600 font-bold">
        {qrData?.status}
      </span>
    </p>

    <p>
      <strong>Payment Status:</strong>{" "}
      <span className="text-green-600 font-bold">
        {qrData?.payment_status}
      </span>
    </p>

  </div>

</div>
<div className="mt-8 flex gap-4 flex-wrap">

  <button
    onClick={() => window.print()}
    className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
  >
    Print Pass
  </button>

  <a
    href={qrData?.qr_code}
    download={`QR-${qrData?.convocation_id}.png`}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
  >
    Download QR
  </a>

  <Link
    to="/student-dashboard"
    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
  >
    Back to Dashboard
  </Link>

</div>
</div>

        </div>

      </div>

    </div>
  );
}

export default StudentQRCode;