import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaExclamationCircle } from "react-icons/fa";

function NotificationPopup({ message, type = "info", duration = 5000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  }[type];

  const icon = {
    success: <FaCheck className="text-green-600" size={24} />,
    error: <FaTimes className="text-red-600" size={24} />,
    warning: <FaExclamationCircle className="text-yellow-600" size={24} />,
    info: <FaCheck className="text-blue-600" size={24} />,
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-right">
      <div
        className={`${bgColor} border-2 rounded-2xl p-4 flex items-center gap-4 shadow-lg max-w-sm`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <p className={`${textColor} font-semibold text-lg`}>{message}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
}

export default NotificationPopup;
