import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../services/eventService";

function ManageEvents() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      event_name: "",
      venue: "",
      event_date: "",
      event_time: "",
      description: "",
    });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =
        await createEvent(formData);

      alert(res.data.message);

      setFormData({
        event_name: "",
        venue: "",
        event_date: "",
        event_time: "",
        description: "",
      });

      fetchEvents();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed"
      );
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this event?"
    );

    if (!ok) return;

    try {
      const res =
        await deleteEvent(id);

      alert(res.data.message);

      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <AdminSidebar />


      <div className="flex-1 p-8">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <h1 className="text-4xl font-bold text-blue-900">
            Manage Events
          </h1>

          <p className="text-gray-500 mt-2">
            Create and Manage
            Convocation Events
          </p>

        </div>

        {/* Create Event Form */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <div className="flex items-center gap-3 mb-6">

            <FaPlus
              className="text-blue-700"
              size={25}
            />

            <h2 className="text-2xl font-bold">
              Create New Event
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="event_name"
              placeholder="Event Name"
              value={
                formData.event_name
              }
              onChange={handleChange}
              className="p-4 rounded-xl border"
              required
            />

            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleChange}
              className="p-4 rounded-xl border"
              required
            />

            <input
              type="date"
              name="event_date"
              value={
                formData.event_date
              }
              onChange={handleChange}
              className="p-4 rounded-xl border"
              required
            />

            <input
              type="time"
              name="event_time"
              value={
                formData.event_time
              }
              onChange={handleChange}
              className="p-4 rounded-xl border"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-xl border h-32"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl font-bold"
            >
              Create Event
            </button>

          </form>

        </div>
                {/* Events List */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            All Events
          </h2>

          {loading ? (

            <div className="text-center py-10 text-2xl font-bold text-blue-700">
              Loading Events...
            </div>

          ) : events.length === 0 ? (

            <div className="text-center py-10 text-gray-500 text-xl">
              No Events Found
            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-8">

              {events.map((event) => (

                <div
                  key={event.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >

                  {/* Card Header */}

                  <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white">

                    <h3 className="text-2xl font-bold">
                      {event.event_name}
                    </h3>

                  </div>

                  {/* Card Body */}

                  <div className="p-6 space-y-5">

                    <div className="flex items-center gap-3">

                      <FaCalendarAlt className="text-blue-700 text-xl" />

                      <span className="font-semibold">
                        Date:
                      </span>

                      <span>
                        {event.event_date}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <FaClock className="text-green-600 text-xl" />

                      <span className="font-semibold">
                        Time:
                      </span>

                      <span>
                        {event.event_time}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <FaMapMarkerAlt className="text-red-500 text-xl" />

                      <span className="font-semibold">
                        Venue:
                      </span>

                      <span>
                        {event.venue}
                      </span>

                    </div>

                    <div>

                      <h4 className="font-bold text-lg text-blue-900 mb-2">
                        Description
                      </h4>

                      <p className="text-gray-600 leading-7">
                        {event.description}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        handleDelete(event.id)
                      }
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
                    >
                      <FaTrash />

                      Delete Event

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ManageEvents;