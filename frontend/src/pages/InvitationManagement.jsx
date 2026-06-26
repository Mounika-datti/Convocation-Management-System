import { useState } from "react";
import Papa from "papaparse";
import Sidebar from "../components/AdminSidebar";
import { FaUpload, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { sendInvitations } from "../services/invitationService";

function InvitationManagement() {

  const [eventName, setEventName] = useState("");

  const [csvFile, setCsvFile] = useState(null);

  const [emails, setEmails] = useState([]);
  const [sending, setSending] = useState(false);
const handleSend = async () => {

  if (!eventName.trim()) {
    alert("Please enter the event name.");
    return;
  }

  if (emails.length === 0) {
    alert("Please upload a CSV file.");
    return;
  }

  setSending(true);

  try {

    const res = await sendInvitations({
      eventName,
      emails,
    });

    alert(
      `${res.data.sent} Invitations Sent Successfully\n${res.data.failed} Failed`
    );

    setEventName("");
    setCsvFile(null);
    setEmails([]);

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message || "Failed to send invitations."
    );

  } finally {

    setSending(false);

  }

};
  const handleCSV = (e) => {

    const file = e.target.files[0];

    setCsvFile(file);

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: function(results){

        setEmails(results.data);

      }

    });

  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-blue-700">

            Invitation Management

          </h1>

          <p className="text-gray-500 mt-2">

            Upload college email list and send invitations.

          </p>

          {/* Event */}

          <div className="mt-8">

            <label className="font-semibold">

              Event Name

            </label>

            <input

              type="text"

              value={eventName}

              onChange={(e)=>setEventName(e.target.value)}

              placeholder="Convocation 2026"

              className="w-full border rounded-xl p-3 mt-2"

            />

          </div>
            {/* CSV */}

<div className="mt-8">

  <label className="font-semibold">
    Upload CSV
  </label>

  <input
    type="file"
    accept=".csv"
    onChange={handleCSV}
    className="w-full border rounded-xl p-3 mt-2"
  />

  {csvFile && (
    <p className="mt-2 text-green-600 font-medium">
      ✅ Selected File: {csvFile.name}
    </p>
  )}

</div>
<div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">

  <h3 className="font-semibold text-blue-700">
    CSV Format
  </h3>

  <pre className="mt-2 text-sm whitespace-pre-wrap">
college_name,email
ABC Engineering College,principal@abc.edu
XYZ Engineering College,principal@xyz.edu
PQR Engineering College,principal@pqr.edu
  </pre>

</div>

          {/* Count */}

          <div className="mt-6">

            <h2 className="font-bold text-lg">

              Total Colleges :

              <span className="text-blue-600">

                {" "}{emails.length}

              </span>

            </h2>

          </div>

          {/* Preview */}

          {emails.length > 0 && (

          <div className="mt-8">

            <h2 className="text-xl font-bold mb-4">

              Email Preview

            </h2>

            <table className="w-full border">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3">

                    College

                  </th>

                  <th>

                    Email

                  </th>

                </tr>

              </thead>

              <tbody>

                {emails.map((item,index)=>(

                  <tr
                  key={index}
                  className="border-b"
                  >

                    <td className="p-3">

                      {item.college_name}

                    </td>

                    <td>

                      {item.email}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          )}

          {/* Send */}

          <button
            onClick={handleSend}
             disabled={sending}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-3"

          >

            <FaPaperPlane />

            {sending ? "Sending..." : "Send Invitations"}

          </button>

        </div>

      </div>
      </div>

  );

}

export default InvitationManagement;