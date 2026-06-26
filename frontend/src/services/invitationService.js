import api from "./api";

export const sendInvitations = (data) =>
    api.post("/invitations/send", data);