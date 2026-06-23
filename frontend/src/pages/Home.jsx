import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaCertificate, FaDownload, FaBell, FaGraduationCap, FaUsers, FaAward, FaFileAlt } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import StatsCard from "../components/StatsCard";

function Home() {
  return (
    <>
      <Navbar />

      {/* University Header Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold mb-2">JNTU GV</h1>
            <p className="text-xl text-indigo-100 font-semibold">Jawaharlal Nehru Technological University, Vizianagaram</p>
            <p className="text-lg text-indigo-200 mt-1">Convocation Management System 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Main Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center px-6 py-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-full shadow-lg">
              <FaGraduationCap className="text-5xl text-white" />
            </div>
          </div>

          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-900 mb-4">
            Convocation Management System
          </h2>

          <p className="text-2xl text-gray-700 font-semibold mb-2">
            Celebrating Your Academic Achievement
          </p>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join us for the grand convocation ceremony where we celebrate the accomplishments of our graduating students and award their well-deserved degrees. Register today to be part of this prestigious event.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4 flex-wrap justify-center mb-12"
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaClipboardList className="inline mr-2" />
              Register Now
            </Link>

            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Candidate Login
            </Link>

            <Link
              to="/admin-login"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Admin Portal
            </Link>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-xl"
          >
            <p className="text-gray-600 font-semibold mb-4">Ceremony starts in:</p>
            <CountdownTimer />
          </motion.div>
        </motion.div>
      </section>

      {/* Features/Services Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-blue-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600">
              Streamlined convocation management for students and administrators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaClipboardList className="text-3xl" />,
                title: "Easy Registration",
                desc: "Simple and hassle-free online registration process"
              },
              {
                icon: <FaFileAlt className="text-3xl" />,
                title: "Document Upload",
                desc: "Secure upload and verification of documents"
              },
              {
                icon: <FaCertificate className="text-3xl" />,
                title: "Digital Certificates",
                desc: "Download your certificate after verification"
              },
              {
                icon: <FaBell className="text-3xl" />,
                title: "Live Updates",
                desc: "Real-time notifications for important announcements"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            By The Numbers
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaUsers />, value: "5000+", label: "Graduates" },
              { icon: <FaAward />, value: "25", label: "Departments" },
              { icon: <FaCertificate />, value: "4800+", label: "Certificates Issued" },
              { icon: <FaCalendarAlt />, value: "15", label: "Events Hosted" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-indigo-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-blue-900 mb-4">
              Convocation Moments
            </h2>
            <p className="text-xl text-gray-600">
              Highlights from our prestigious events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&q=80&auto=format&fit=crop",
                title: "Grand Ceremony",
                desc: "The main convocation hall setup with stage and seating"
              },
              {
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80&auto=format&fit=crop",
                title: "Graduates Celebrating",
                desc: "Happy graduates celebrating their achievements"
              },
              {
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop",
                title: "Degree Conferral",
                desc: "Moment of receiving degrees and diplomas"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates/Announcements */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">
              Important Dates & Announcements
            </h2>
            <p className="text-xl text-indigo-100">
              Mark your calendar with these key dates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                date: "Sep 1, 2026",
                title: "Registration Opens",
                desc: "Online registration for convocation begins"
              },
              {
                date: "Oct 15, 2026",
                title: "Document Submission",
                desc: "Last date for submitting required documents"
              },
              {
                date: "Nov 15, 2026",
                title: "Verification Complete",
                desc: "Document verification and confirmation ends"
              },
              {
                date: "Dec 20, 2026",
                title: "Grand Ceremony",
                desc: "Main convocation ceremony date"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-400 text-blue-900 rounded-lg p-3">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-yellow-300 font-semibold text-sm">
                      {item.date}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {item.title}
                    </h3>
                    <p className="text-indigo-100 mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-blue-900 mb-6">
              Ready to Be Part of History?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of graduates in celebrating this momentous occasion. Register now and download your digital certificate.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-900 px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Already Registered? Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;