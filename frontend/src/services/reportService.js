import api from "./api";

export const dashboardSummary = () =>
  api.get("/reports/dashboard");

export const studentReport = () =>
  api.get("/reports/students");

export const registrationReport = () =>
  api.get("/reports/registrations");

export const paymentReport = () =>
  api.get("/reports/payments");

export const certificateReport = () =>
  api.get("/reports/certificates");