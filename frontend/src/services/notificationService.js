import api from "./api";

export const getAllNotifications = () => api.get("/notifications/admin");

export const getStudentNotifications = () => api.get("/notifications/student");

export const sendNotification = (payload) =>
  api.post("/notifications/send", payload);

export const markAsRead = (id) => api.put(`/notifications/read/${id}`);

export const deleteNotification = (id) => api.delete(`/notifications/delete/${id}`);