import { useEffect, useRef, useState } from "react";
import { FaQrcode, FaTimes, FaCheck } from "react-icons/fa";
import jsQR from "jsqr";

function QRScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Start scanning
      const interval = setInterval(() => {
        scanQR();
      }, 300);

      return () => clearInterval(interval);
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const scanQR = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      try {
        const data = JSON.parse(code.data);
        setScannedData(data);
        setScanning(false);
      } catch (err) {
        // Not a valid JSON QR code
      }
    }
  };

  const handleReset = () => {
    setScannedData(null);
    setError("");
    setScanning(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <FaTimes size={40} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Camera Access Error
          </h1>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (scannedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <FaCheck size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            QR Scanned Successfully!
          </h1>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-lg text-green-800 mb-4">
              Student Information:
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Convocation ID:</span>
                <span className="font-bold text-blue-600">
                  {scannedData.convocation_id}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Student ID:</span>
                <span className="font-bold text-blue-600">
                  {scannedData.student_id}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Seat Number:</span>
                <span className="font-bold text-blue-600">
                  {scannedData.seat_number}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Hall Block:</span>
                <span className="font-bold text-blue-600">
                  {scannedData.hall_block}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Row Number:</span>
                <span className="font-bold text-blue-600">
                  {scannedData.row_number}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Scan Another
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <FaQrcode size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">QR Scanner</h1>
              <p className="text-blue-100 mt-2">
                Point your camera at a QR code to scan
              </p>
            </div>
          </div>
        </div>

        {/* Camera Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-96 object-cover"
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />

            {/* Scanning Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-green-400 rounded-2xl shadow-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 text-center">
            <p className="text-gray-600 text-lg mb-4">
              Align the QR code within the frame
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Reset
              </button>
              <a
                href="/student-dashboard"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
