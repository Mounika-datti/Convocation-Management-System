import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { getAllNotifications } from "../services/notificationService";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-blue-600 p-4 rounded-full">
              <FaBell className="text-white text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-blue-900">
                Notification History
              </h1>

              <p className="text-gray-500">
                View all notifications sent to students
              </p>
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-blue-700 text-white">

                  <th className="p-4">Student</th>

                  <th className="p-4">Hall Ticket</th>

                  <th className="p-4">Title</th>

                  <th className="p-4">Message</th>

                  <th className="p-4">Date</th>

                </tr>

              </thead>

              <tbody>

                {notifications.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {item.full_name}
                    </td>

                    <td className="p-4">
                      {item.hall_ticket_no}
                    </td>

                    <td className="p-4 font-semibold text-blue-700">
                      {item.title}
                    </td>

                    <td className="p-4">
                      {item.message}
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminNotifications;