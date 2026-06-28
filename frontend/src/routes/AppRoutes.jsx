import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";
import NotFound from "../pages/NotFound";
import StudentDashboard from "../pages/StudentDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import UploadDocuments from "../pages/UploadDocuments";
import StudentProfile from "../pages/StudentProfile";
import ConvocationRegistration from "../pages/ConvocationRegistration";
import Notifications from "../pages/Notifications";
import EventDetails from "../pages/EventDetails";
import AdminDashboard from "../pages/AdminDashboard";
import Reports from "../pages/Reports";
import ManageEvents from "../pages/ManageEvents";
import ManageStudents from "../pages/ManageStudents";
import VerifyDocuments from "../pages/VerifyDocuments";
import AdminNotifications from "../pages/AdminNotifications";
import StudentQRCode from "../pages/StudentQRCode";
import QRScanner from "../pages/QRScanner";
import VerifyPage from "../pages/VerifyPage";
import ManagePayments from "../pages/ManagePayments";
import InvitationManagement from "../pages/InvitationManagement";
import StudentIDCard from "../pages/StudentIDCard";
import AdminStudentIDCard from "../pages/AdminStudentIDCard";
import ConvocationRegisters from "../pages/ConvocationRegisters";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />  
      <Route path="/verify-otp" element={<VerifyOTP />}/>   
      <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/upload-documents" element={<ProtectedRoute><UploadDocuments /></ProtectedRoute>} />
      <Route
        path="/student-profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
    path="/invitation-management"
    element={<ProtectedRoute><InvitationManagement /></ProtectedRoute>}
/>
<Route
  path="/student-id-card"
  element={
    <ProtectedRoute>
      <StudentIDCard />
    </ProtectedRoute>
  }
/>
<Route
  path="/verify/:convocationId"
  element={<ProtectedRoute><VerifyPage /></ProtectedRoute>}
/>
<Route
  path="/manage-events"
  element={
    <ProtectedRoute>
      <ManageEvents />
    </ProtectedRoute>
  }
/>
<Route
  path="/convocation-registers"
  element={
    <ProtectedRoute>
      <ConvocationRegisters />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-notifications"
  element={
    <ProtectedRoute>
      <AdminNotifications />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-payments"
  element={
    <ProtectedRoute>
      <ManagePayments />
    </ProtectedRoute>
  }
/>
<Route
    path="/admin/student-id-card/:id"
    element={
        <ProtectedRoute>
            <AdminStudentIDCard />
        </ProtectedRoute>
    }
/>
<Route
  path="/event-details"
  element={
    <ProtectedRoute>
      <EventDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/convocation-registration"
  element={
    <ProtectedRoute>
      <ConvocationRegistration />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-students"
  element={
    <ProtectedRoute>
      <ManageStudents />
    </ProtectedRoute>
  }
/>

<Route
  path="/verify-documents"
  element={
    <ProtectedRoute>
      <VerifyDocuments />
    </ProtectedRoute>
  }
/>
<Route
  path="/student-qr"
  element={<StudentQRCode />}
/>
<Route
  path="/qr-scanner"
  element={
    <ProtectedRoute>
      <QRScanner />
    </ProtectedRoute>
  }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;