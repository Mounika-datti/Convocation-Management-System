import api from "./api";

export const registerConvocation = (data) => {
  return api.post("/registration/register", data);
};

export const getRegistrationStatus = () => {
  return api.get("/registration/status");
};