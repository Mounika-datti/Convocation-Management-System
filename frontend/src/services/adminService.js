import api from "./api";

export const getDashboardStats = () =>
  api.get("/admin/dashboard");

export const getStudents = () =>
  api.get("/admin/students");

export const getRegistrations = () =>
  api.get("/admin/registrations");

export const deleteStudent = (id) =>
  api.delete(`/admin/student/${id}`);

export const getDocuments = () =>
  api.get("/admin/documents");

export const getPayments = () =>
  api.get("/admin/payments");

export const searchStudent = (keyword) =>
  api.get(`/admin/search?keyword=${keyword}`);

export const filterDepartment = (department) =>
  api.get(`/admin/department/${department}`);

export const filterProgram = (program) =>
  api.get(`/admin/program/${program}`);

export const filterGraduationYear = (year) =>
  api.get(`/admin/graduation/${year}`);

export const getRevenue = () =>
  api.get("/admin/revenue");

export const approveRegistration = (id) =>
  api.put(`/admin/approve/${id}`);

export const rejectRegistration = (id) =>
  api.put(`/admin/reject/${id}`);

export const getRecentActivities = () =>
  api.get("/admin/activities");

export const allocateSeat = (id) =>
  api.put(`/admin/seat/${id}`);

export const getSeatDetails = (id) =>
  api.get(`/admin/seat/${id}`);
export const generateQR = (id) =>
  api.post(`/admin/generate-qr/${id}`);

export const getQRCode = (id) =>
  api.get(`/admin/qr/${id}`);
export const getStudentIDCard = (id) => {

  return api.get(`/admin/student-id-card/${id}`);

};