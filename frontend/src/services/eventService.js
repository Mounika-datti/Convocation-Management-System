import api from "./api";

export const getEvents = () => {
  return api.get("/events");
};

export const createEvent = (data) => {
  return api.post("/events", data);
};

export const deleteEvent = (id) => {
  return api.delete(`/events/${id}`);
};