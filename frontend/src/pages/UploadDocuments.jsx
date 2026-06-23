import { useEffect, useState } from "react";
import { uploadDocument, checkDocuments } from "../services/documentService";
import Sidebar from "../components/Sidebar";

const requiredDocuments = [
  "Passport Photo",
  "Aadhaar Card",
  "Degree Certificate",
  "Provisional Certificate",
  "Fee Receipt",
  "Signature",
];

function UploadDocuments() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");

  useEffect(() => {
    fetchUploadedDocuments();
  }, []);

  const fetchUploadedDocuments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      const res = await checkDocuments(user.id);
      const docs = Array.from(
        new Set(res.data.documents.map((doc) => doc.document_name))
      );

      setUploadedDocs(docs);
      setAlreadyUploaded(
        requiredDocuments.every((doc) => docs.includes(doc))
      );
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatusMessage("Unable to load uploaded documents. Please refresh.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!documentName) {
      setStatusType("error");
      setStatusMessage("Please select a document type.");
      return;
    }

    if (!selectedFile) {
      setStatusType("error");
      setStatusMessage("Please choose a file to upload.");
      return;
    }

    if (uploadedDocs.includes(documentName)) {
      setStatusType("error");
      setStatusMessage(
        `You already uploaded "${documentName}". Please select a different document.`
      );
      return;
    }

    try {
      setLoading(true);
      const res = await uploadDocument(selectedFile, documentName);
      setStatusType("success");
      setStatusMessage(res.data.message || "Document uploaded successfully.");
      setSelectedFile(null);
      setDocumentName("");
      await fetchUploadedDocuments();
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const missingCount = requiredDocuments.filter(
    (doc) => !uploadedDocs.includes(doc)
  ).length;
  const duplicateSelected = documentName && uploadedDocs.includes(documentName);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-700 via-cyan-600 to-slate-900 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight">
                  Upload Your Convocation Documents
                </h1>
                <p className="mt-4 text-base text-slate-100/85">
                  Upload the required documents securely. The page will warn you
                  if you try to upload a document type that is already submitted.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-5 text-right shadow-xl backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200">
                  upload progress
                </p>
                <p className="mt-3 text-4xl font-semibold">
                  {uploadedDocs.length}/{requiredDocuments.length}
                </p>
                <p className="mt-2 text-sm text-slate-200/90">
                  {alreadyUploaded
                    ? "All documents uploaded"
                    : `${missingCount} remaining`}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[1.45fr_1fr]">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Document Upload
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Select the document type and attach the file to upload.
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {alreadyUploaded ? "Completed" : "Pending"}
                </span>
              </div>

              {statusMessage && (
                <div
                  className={`mb-6 rounded-3xl border px-5 py-4 text-sm font-medium ${
                    statusType === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-rose-200 bg-rose-50 text-rose-900"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Document Type
                  </label>
                  <select
                    name="document_name"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus:border-sky-500"
                  >
                    <option value="">Select a document</option>
                    {requiredDocuments.map((doc) => (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                  {duplicateSelected && (
                    <p className="text-sm text-rose-600">
                      You already uploaded this document.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Select File
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm"
                  />
                </div>

                {selectedFile && (
                  <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm">
                    <p className="font-semibold">Selected file</p>
                    <p className="mt-1 text-sm text-slate-600">{selectedFile.name}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={alreadyUploaded || loading || duplicateSelected}
                  className={`w-full rounded-3xl px-6 py-4 text-base font-semibold text-white transition ${
                    alreadyUploaded || loading || duplicateSelected
                      ? "cursor-not-allowed bg-slate-300"
                      : "bg-sky-600 hover:bg-sky-700"
                  }`}
                >
                  {alreadyUploaded
                    ? "All Documents Uploaded"
                    : loading
                    ? "Uploading..."
                    : "Upload Document"}
                </button>
              </form>

              {alreadyUploaded && (
                <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                  ? You have already uploaded all required documents.
                </div>
              )}
            </div>

            <aside className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
              <h3 className="text-2xl font-semibold">Document Checklist</h3>
              <p className="mt-3 text-slate-400">
                Required documents for convocation submission.
              </p>

              <div className="mt-6 grid gap-3">
                {requiredDocuments.map((doc) => {
                  const completed = uploadedDocs.includes(doc);
                  return (
                    <div
                      key={doc}
                      className={`flex items-center justify-between rounded-3xl border px-5 py-4 ${
                        completed
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-900"
                      }`}
                    >
                      <span>{doc}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${completed ? "bg-emerald-500/20 text-emerald-100" : "bg-slate-800 text-slate-300"}`}>
                        {completed ? "Uploaded" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>
          </section>

          {uploadedDocs.length > 0 && (
            <section className="rounded-[2rem] bg-white p-8 shadow-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Uploaded Documents</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Documents you have already submitted.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {uploadedDocs.length} uploaded
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {uploadedDocs.map((doc) => (
                  <div key={doc} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{doc}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">Uploaded</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default UploadDocuments;
