import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <FaUniversity size={30} />
          <h1 className="text-2xl font-bold">
            Convocation Portal
          </h1>
        </div>

        <div className="flex gap-6 font-medium">

          <Link to="/">Home</Link>

          <Link to="/login">Candidate Login</Link>

          <Link to="/register">Register</Link>

          <Link to="/admin-login">Admin</Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;