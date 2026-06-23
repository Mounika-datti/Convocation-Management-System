function DocumentCard({
  title,
  file,
  onFileChange,
  onUpload,
  uploading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">

      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <input
        type="file"
        onChange={onFileChange}
        className="w-full"
      />

      {file && (
        <p className="text-green-600 mt-3">
          {file.name}
        </p>
      )}

      <button
        onClick={onUpload}
        disabled={!file || uploading}
        className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
      >
        {uploading
          ? "Uploading..."
          : "Upload"}
      </button>

    </div>
  );
}

export default DocumentCard;