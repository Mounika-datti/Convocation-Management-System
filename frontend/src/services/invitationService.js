import api from "./api";

export const sendInvitations = (data) => {
  return api.post("/invitations/send", data);
};