import api from "./api";

export const downloadRegister = async (id) => {
  return api.get(`/admin/register/download/${id}`, {
    responseType: "blob",
  });
};