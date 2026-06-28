import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaFileAlt,
  FaCalendarAlt,
  FaCertificate,
  FaBell,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelopeOpenText,
  FaBook,
} from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
function AdminSidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
  name: "Convocation Registers",
  path: "/convocation-registers",
  icon: <FaBook />,
},
    {
      name: "Manage Students",
      path: "/manage-students",
      icon: <FaUserGraduate />,
    },
    {
  name: "Manage Payments",
  path: "/manage-payments",
  icon: <FaMoneyCheckAlt />,
},
    {
      name: "Verify Documents",
      path: "/verify-documents",
      icon: <FaFileAlt />,
    },
    {
      name: "Manage Events",
      path: "/manage-events",
      icon: <FaCalendarAlt />,
    },
    {
  name: "Invitation Management",
  path: "/invitation-management",
  icon: <FaEnvelopeOpenText />,
},
    {
      name: "Notifications History",
      path: "/admin-notifications",
      icon: <FaBell />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-blue-900 text-white shadow-xl">

      <div className="p-6 border-b border-blue-700">

        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>

        <p className="text-sm text-blue-200 mt-1">
          Convocation Management
        </p>

      </div>

      <div className="mt-6">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-6 py-4 transition hover:bg-blue-800 ${
              location.pathname === item.path
                ? "bg-blue-700"
                : ""
            }`}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </Link>
        ))}

      </div>

      <div className="absolute bottom-6 left-6">

        <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;