import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import logo from "../assets/jntugvlogo.jpg";
import signature from "../assets/signature.png";

import "./VerifyPage.css";

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

      <div className="flex justify-center items-center min-h-screen">

        <h1 className="text-3xl font-bold text-blue-700">

          Loading...

        </h1>

      </div>

    );

  }

  if (!student) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        <h1 className="text-3xl font-bold text-red-600">

          Invalid QR Code

        </h1>

      </div>

    );

  }

  return (

    <div className="verify-page">

      <div id="entry-pass" className="entry-pass">

        {/* Hole */}

        <div className="pass-hole"></div>

        {/* Header */}

        <div className="pass-header">

          <img
            src={logo}
            alt="JNTUGV"
            className="pass-logo"
          />

          <h1>
            Jawaharlal Nehru Technological University
          </h1>

          <h2>
            Gurajada Vizianagaram
          </h2>


          <h3>
            1 CONVOCATION
          </h3>

          <h4>
            11<sup>th</sup> July 2026
          </h4>

        </div>

        {/* Entry Pass */}

        <div className="entry-title">

          ENTRY PASS

        </div>

        {/* Body */}

        <div className="entry-body">

          {/* Left */}

          <div className="entry-left">

            <div className="program-box">

              <h2>

                {student.degree}

              </h2>

              <p>

                PROGRAM

              </p>

            </div>

            <div className="entry-number">

              <h1>

                {student.convocation_id}

              </h1>

              <p>

                ENTRY PASS NO.

              </p>

            </div>

          </div>

          {/* Right */}

          <div className="entry-right">

            <div className="name-row">

              <span>Name</span>

              <span>:</span>

              <strong>

                {student.full_name}

              </strong>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="entry-footer">

          <img
            src={signature}
            alt="Signature"
            className="signature"
          />

          <p>

            Director of Evaluation

          </p>

        </div>

      </div>

    </div>

  );

}

export default VerifyPage;