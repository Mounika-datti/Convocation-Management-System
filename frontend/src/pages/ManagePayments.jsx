import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function ManagePayments() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {

      const res = await api.get("/payments/admin");

      setPayments(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  const verifyPayment = async (id) => {

    try {

      await api.put(`/payments/verify/${id}`);

      alert("Payment Verified");

      fetchPayments();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Payment Verification
        </h1>

        <table className="w-full bg-white shadow rounded-xl">

          <thead className="bg-blue-700 text-white">

            <tr>

              <th className="p-3">Student</th>

              <th>Hall Ticket</th>

              <th>Program</th>

              <th>Transaction ID</th>

              <th>Amount</th>

              <th>Method</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr key={payment.id} className="border-b">

                <td className="p-3">
                  {payment.full_name}
                </td>

                <td>
                  {payment.hall_ticket_no}
                </td>

                <td>
                  {payment.program}
                </td>

                <td>
                  {payment.transaction_id}
                </td>

                <td>
                  ₹{payment.amount}
                </td>

                <td>
                  {payment.payment_method}
                </td>

                <span
  className={
    payment.payment_status === "Verified"
      ? "text-green-600 font-bold"
      : "text-orange-600 font-bold"
  }
>
  {payment.payment_status}
</span>
<td>

  {payment.payment_status === "Verified" ? (

    <span className="text-green-600 font-bold">
      ✅ Verified
    </span>

  ) : (

    <button
      onClick={() => verifyPayment(payment.id)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Verify
    </button>

  )}

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ManagePayments;