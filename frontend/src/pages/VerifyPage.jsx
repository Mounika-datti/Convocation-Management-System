import { useParams } from "react-router-dom";

function VerifyPage() {
  const { convocationId } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <h1>QR Verification Page</h1>

      <h2>{convocationId}</h2>

      <p>
        QR scanned successfully.
      </p>
    </div>
  );
}

export default VerifyPage;