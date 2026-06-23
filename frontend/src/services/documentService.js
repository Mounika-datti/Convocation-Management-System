import api from "./api";

export const uploadDocument = async (
  file,
  documentName
) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("document_name", documentName);

  return api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDocuments = async () => {
  return api.get("/documents");
};
export const checkDocuments = (studentId) =>
  api.get(`/documents/check/${studentId}`);