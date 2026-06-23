import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import { getEvents } from "../services/eventService";

function EventDetails() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >

          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            🎓 Convocation Events
          </h1>

          <p className="text-gray-600 mb-10">
            View all upcoming convocation events.
          </p>
                    {loading ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-blue-700">
                Loading Events...
              </h2>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

              <FaUniversity
                size={70}
                className="mx-auto text-blue-400 mb-5"
              />

              <h2 className="text-3xl font-bold text-gray-700">
                No Events Available
              </h2>

              <p className="text-gray-500 mt-3">
                No convocation events have been created yet.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">

              {events.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
                >

                  {/* Banner */}

                  <div className="h-48 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center">

                    <div className="text-center text-white">

                      <FaUniversity
                        size={55}
                        className="mx-auto mb-3"
                      />

                      <h2 className="text-3xl font-bold">
                        {event.event_name}
                      </h2>

                    </div>

                  </div>

                  {/* Content */}

                  <div className="p-8">

                    <div className="space-y-5">

                      <div className="flex items-center gap-3">

                        <FaCalendarAlt className="text-blue-700" />

                        <span className="font-semibold">
                          Date:
                        </span>

                        <span>
                          {event.event_date}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <FaClock className="text-green-600" />

                        <span className="font-semibold">
                          Time:
                        </span>

                        <span>
                          {event.event_time}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <FaMapMarkerAlt className="text-red-500" />

                        <span className="font-semibold">
                          Venue:
                        </span>

                        <span>
                          {event.venue}
                        </span>

                      </div>

                    </div>

                    <div className="mt-8">

                      <h3 className="text-xl font-bold text-blue-900 mb-3">
                        Description
                      </h3>

                      <p className="text-gray-600 leading-7">
                        {event.description}
                      </p>

                    </div>

                    {/* Action Buttons */}

                    <div className="grid md:grid-cols-2 gap-4 mt-8">

                      <button
                        className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
                      >
                        📄 Download Invitation
                      </button>

                      <button
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        📅 Add To Calendar
                      </button>

                    </div>

                  </div>

                </motion.div>
              ))}

            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}

export default EventDetails;