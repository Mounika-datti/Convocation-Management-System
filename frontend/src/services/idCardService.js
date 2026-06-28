import api from "./api";

export const getIDCard = () => {
  return api.get("/id-card");
};