import { useEffect, useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

import {
  getStudentNotifications,
  markAsRead,
} from "../services/notificationService";
function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await getStudentNotifications();

        setNotifications(
          res.data.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleMarkRead =
    async (id) => {
      try {
        await markAsRead(id);

        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredNotifications =
    notifications.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.message
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-blue-700 p-4 rounded-full">

              <FaBell
                className="text-white"
                size={30}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-blue-900">
                Notifications
              </h1>

              <p className="text-gray-500">
                View your latest updates
              </p>

            </div>

          </div>

          <div className="relative mb-8">

            <FaSearch className="absolute top-4 left-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Notifications..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full pl-12 p-4 rounded-2xl border border-gray-300 outline-none"
            />

          </div>
                    {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl font-semibold text-blue-700">
                Loading Notifications...
              </div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <FaBell
                size={60}
                className="mx-auto text-gray-300 mb-5"
              />

              <h2 className="text-2xl font-bold text-gray-700">
                No Notifications Found
              </h2>

              <p className="text-gray-500 mt-3">
                You don't have any notifications.
              </p>

            </div>
          ) : (
            <div className="grid gap-6">

              {filteredNotifications.map(
                (notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-3xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]
                    ${
                      notification.is_read
                        ? "bg-white border border-gray-200"
                        : "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-8 border-blue-600"
                    }`}
                  >
                    <div className="flex justify-between items-start">

                      <div className="flex-1">

                        <h2 className="text-2xl font-bold text-blue-900">
                          {notification.title}
                        </h2>

                        <p className="text-gray-700 mt-3 leading-7">
                          {notification.message}
                        </p>

                        <p className="text-sm text-gray-500 mt-4">
                          📅{" "}
                          {new Date(
                            notification.created_at
                          ).toLocaleString()}
                        </p>

                      </div>

                      {!notification.is_read && (
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow">
                          New
                        </span>
                      )}

                    </div>

                    {!notification.is_read && (
                      <button
                        onClick={() =>
                          handleMarkRead(
                            notification.id
                          )
                        }
                        className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
                      >
                        <FaCheckCircle />

                        Mark as Read
                      </button>
                    )}

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Notifications;