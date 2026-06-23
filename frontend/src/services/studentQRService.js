import api from "./api";

export const getStudentQR = (id) =>
  api.get(`/student/qr`);