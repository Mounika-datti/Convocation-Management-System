import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaFileUpload,
  FaClipboardCheck,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-72 min-h-screen bg-blue-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-10">
        🎓 Candidate Portal
      </h2>

      <nav className="flex flex-col gap-5">

        <Link
          to="/student-dashboard"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/student-profile"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <FaUser />
          Profile
        </Link>

        <Link
          to="/upload-documents"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <FaFileUpload />
          Upload Documents
        </Link>

        <Link
          to="/convocation-registration"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <FaClipboardCheck />
          Registration
        </Link>

        <Link
          to="/notifications"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <FaBell />
          Notifications
        </Link>

        <Link
          to="/student-qr"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <BsQrCodeScan />
          QR Entry Pass
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 text-left hover:text-red-300"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;