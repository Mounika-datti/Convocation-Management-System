import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function VerifyPage() {

  const { convocationId } = useParams();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    try {

      const res = await api.get(
        `/student/verify/${convocationId}`
      );

      setStudent(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <h2 className="text-center mt-20">
        Loading...
      </h2>
    );

  }

  if (!student) {

    return (
      <h2 className="text-center mt-20 text-red-600">
        Invalid QR Code
      </h2>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-10 w-[700px]">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-800">
            JNTU-GV
          </h1>

          <h2 className="text-2xl font-semibold mt-3">
            Convocation Verification
          </h2>

          <h3 className="text-green-600 text-2xl mt-4 font-bold">
            ✔ VERIFIED STUDENT
          </h3>

        </div>

        <div className="mt-8 space-y-3 text-lg">

          <p><b>Name :</b> {student.full_name}</p>

          <p><b>Hall Ticket :</b> {student.hall_ticket_no}</p>

          <p><b>Roll No :</b> {student.roll_no}</p>

          <p><b>Department :</b> {student.department}</p>

          <p><b>Program :</b> {student.program}</p>

          <p><b>Batch :</b> {student.batch}</p>

          <hr />

          <p><b>Seat Number :</b> {student.seat_number}</p>

          <p><b>Hall Block :</b> {student.hall_block}</p>

          <p><b>Row Number :</b> {student.row_number}</p>

          <p><b>Convocation ID :</b> {student.convocation_id}</p>

          <hr />

          <p>

            <b>Payment Status :</b>

            <span className="text-green-600 font-bold ml-2">

              {student.payment_status}

            </span>

          </p>

          <p>

            <b>Registration Status :</b>

            <span className="text-green-600 font-bold ml-2">

              {student.status}

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default VerifyPage;