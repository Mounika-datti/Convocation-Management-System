import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getIDCard } from "../services/idCardService";
import "./StudentIDCard.css";

import {
  FaIdCard,
  FaPrint,
  FaDownload,
} from "react-icons/fa";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import logo from "../assets/jntugvlogo.jpg";
import graduation from "../assets/graduation.jpg";
import ribbon from "../assets/ribbon.jpg";
import signature from "../assets/signature.png";

function StudentIDCard() {

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIDCard();
  }, []);

  const fetchIDCard = async () => {
    try {

      const res = await getIDCard();

      if (res.data.success) {
        setCard(res.data.data);
      }

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Unable to load ID Card"
      );

    } finally {
      setLoading(false);
    }
  };
const handlePrint = () => {

    document.title =
      `${card.full_name}_Convocation_ID`;

    window.print();

};

  const handleDownload = async () => {

  const input = document.getElementById("id-card");

  const canvas = await html2canvas(input, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();

  const pageHeight =
    (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight
  );

  pdf.save(`${card.full_name}_Convocation_ID.pdf`);

};

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading ID Card...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <h1>{error}</h1>
      </div>
    );
  }

  return (

    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* Page Header */}

        <div className="page-header">

          <FaIdCard size={40} />

          <div>

            <h1>Student ID Card</h1>

            <p>
              JNTU-GV Convocation Identity Card
            </p>

          </div>

        </div>

        {/* ID CARD */}

        <div className="card-wrapper">

          <div
            id="id-card"
            className="id-card"
          >

            {/* ================= HEADER ================= */}

            <div className="id-header">

              <img
                src={logo}
                alt="JNTUGV"
                className="logo"
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

            </div>

            {/* ===== PART 2 STARTS HERE ===== */}
            {/* ================= PHOTO & GRADUATION ================= */}

<div className="photo-section">

  {/* Student Photo */}

  <div className="photo-box">

    <img
      src={card.photo}
      alt="Student"
      className="student-photo"
    />

  </div>

  {/* Graduation Cap */}

  <div className="cap-box">

    <img
      src={graduation}
      alt="Graduation"
      className="graduation-image"
    />

  </div>

</div>

{/* ================= STUDENT DETAILS ================= */}

<div className="details-section">

  {/* Name */}

  <div className="detail-row">

    <span className="detail-label">

      NAME

    </span>

    <span className="colon">:</span>

    <span className="detail-value">

      {card.full_name}

    </span>

  </div>

  {/* Hall Ticket */}

  <div className="detail-row">

    <span className="detail-label">

      HALL TICKET NO

    </span>

    <span className="colon">:</span>

    <span className="detail-value">

      {card.hall_ticket_no}

    </span>

  </div>

  {/* Branch */}

  <div className="detail-row">

    <span className="detail-label">

      BRANCH

    </span>

    <span className="colon">:</span>

    <span className="detail-value">

      {card.department}

    </span>

  </div>

</div>

{/* ===== PART 3 STARTS HERE ===== */}
{/* ================= DEGREE ================= */}

<div className="degree-section">

  <h2 className="degree-text">

    {card.degree}

  </h2>

</div>

{/* ================= GOLD RIBBON ================= */}

<div className="ribbon-section">

  <div className="gold-strip"></div>

  <img
    src={ribbon}
    alt="Ribbon"
    className="ribbon-image"
  />

</div>

{/* ================= FOOTER ================= */}

<div className="footer-section">

  {/* Date */}

  <div className="footer-left">

    <h3 className="footer-date">

      11<sup>th</sup> July 2026

    </h3>

  </div>

  {/* Signature */}

  <div className="footer-right">

    <img
      src={signature}
      alt="Signature"
      className="signature-image"
    />

    <h3 className="controller-text">

      Controller of Examination

    </h3>

  </div>

</div>

{/* ================= BUTTONS ================= */}

</div>

</div>

<div className="button-section">

  <button
    onClick={handlePrint}
    className="print-btn"
  >
    <FaPrint />
    Print ID Card
  </button>

  <button
    onClick={handleDownload}
    className="download-btn"
  >
    <FaDownload />
    Download PDF
  </button>

</div>

      </div>

    </div>

  );

}

export default StudentIDCard;