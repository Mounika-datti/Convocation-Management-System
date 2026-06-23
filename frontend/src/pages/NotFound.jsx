import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="text-xl mt-3">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-5 px-6 py-3 bg-blue-700 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;