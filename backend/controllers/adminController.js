const pool = require("../config/db");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = async (
  to,
  subject,
  html
) => {

  try {

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to,

      subject,

      html

    });

    console.log(
      "Email Sent Successfully"
    );

  } catch(error){

    console.log(
      "Email Error:",
      error
    );

  }

};
// =======================================
// Dashboard Statistics
// =======================================

exports.getDashboardStats = async (req, res) => {
  try {

   const students = await pool.query(
  "SELECT COUNT(*) FROM students"
);

const ugStudents = await pool.query(
  "SELECT COUNT(*) FROM students WHERE program='UG'"
);

const pgStudents = await pool.query(
  "SELECT COUNT(*) FROM students WHERE program='PG'"
);

const registrations = await pool.query(
  "SELECT COUNT(*) FROM registrations"
);

const payments = await pool.query(
  "SELECT COUNT(*) FROM payments"
);

const certificates = await pool.query(
  "SELECT COUNT(*) FROM certificates"
);

    res.status(200).json({
      success: true,
      data: {
        total_students: students.rows[0].count,
        ug_students: ugStudents.rows[0].count,
        pg_students: pgStudents.rows[0].count,
        total_registrations: registrations.rows[0].count,
        total_payments: payments.rows[0].count,
        total_certificates: certificates.rows[0].count,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =======================================
// Get All Students
// =======================================

exports.getAllStudents = async (req, res) => {

  try {
    
    const result = await pool.query(`
      SELECT
      id,
      full_name,
      hall_ticket_no,
      roll_no,
      email,
      phone,
      program,
      degree,
      department,
      college_name,
      graduation_year

      FROM students

      ORDER BY id DESC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// =======================================
// Get All Registrations
// =======================================

exports.getAllRegistrations = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

      registrations.id,

      students.full_name,

      students.hall_ticket_no,

      students.roll_no,

      students.program,

      students.degree,

      students.department,
      students.batch,

      registrations.session_id,

      registrations.attendance_type,

      registrations.status,

      registrations.payment_status

      FROM registrations

      JOIN students

      ON registrations.student_id = students.id

      ORDER BY registrations.id DESC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

exports.generateQR = async (req, res) => {
  try {

    console.log("QR API CALLED");

    const studentId = req.params.id;

    console.log("Student ID:", studentId);

    const result = await pool.query(
      `
      SELECT
      s.id,
      s.full_name,
      s.email,
      s.program,
      r.seat_number,
      r.hall_block,
      r.row_number

      FROM students s
      JOIN registrations r
      ON s.id = r.student_id

      WHERE s.id = $1
      `,
      [studentId]
    );

    console.log("Student Query:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message:"Student not found"
      });
    }

    const student = result.rows[0];

    const qrData = {
      convocation_id: `CONV-${student.id}`,
      student_id: student.id,
      seat_number: student.seat_number,
      hall_block: student.hall_block,
      row_number: student.row_number
    };

    console.log("QR DATA:", qrData);

    const verificationUrl =
`http://localhost:5173/verify/CONV-${student.id}`;

const qrCode = await QRCode.toDataURL(
  verificationUrl,
  {
    width: 500,
    errorCorrectionLevel: "H"
  }
);

    console.log("QR GENERATED");

    // Run database update and email in parallel
    await Promise.all([
      pool.query(
        `
        UPDATE registrations
        SET qr_code=$1
        WHERE student_id=$2
        RETURNING *
        `,
        [qrCode, studentId]
      ),
      // Send email asynchronously (fire and forget)
      (async () => {
        try {
          console.log("📧 Attempting to send QR email to:", student.email);
          await sendEmail(
            student.email,
            "QR Entry Pass Generated",
            `
            <div style="font-family:Arial;padding:20px">
              <h2 style="color:green;">QR Entry Pass Generated</h2>
              <p>Dear ${student.full_name},</p>
              <p>Your Convocation QR Entry Pass has been generated successfully.</p>
              <p>Please login to the portal and view your QR Entry Pass.</p>
              <p>This QR Code is required for entry into the Convocation Hall.</p>
              <br>
              <p>Regards,<br/>JNTU-GV Convocation Team</p>
            </div>
            `
          );
          console.log("✅ QR email sent successfully");
        } catch (err) {
          console.error("❌ Failed to send QR email:", err);
        }
      })()
    ]);

    console.log("UPDATE RESULT: Success");

    res.json({
      success:true,
      qr_code:qrCode
    });

  } catch(error){

    console.log("QR ERROR:", error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
// =======================================
// Approve Registration
// =======================================

exports.approveRegistration = async (req, res) => {
  try {

    const studentId = req.params.id;

    // Check status and get student info in one query
    const statusResult = await pool.query(
      `
      SELECT 
        r.status,
        s.full_name,
        s.email,
        s.roll_no,
        s.program
      FROM registrations r
      JOIN students s ON r.student_id = s.id
      WHERE r.student_id = $1
      `,
      [studentId]
    );

    if (statusResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Registration Not Found",
      });
    }

    const { status, full_name, email, roll_no,program } = statusResult.rows[0];

    if (status === "Approved") {
      return res.status(200).json({
        success: true,
        message: "Student is already approved.",
      });
    }
// // =============================
// Generate Seat Number
// =============================

// Count already allocated seats
const seatResult = await pool.query(
  `
  SELECT COUNT(*) AS total
  FROM registrations
  WHERE seat_number IS NOT NULL
  `
);

const nextSeat = parseInt(seatResult.rows[0].total) + 1;

// Check student program
const prefix = program === "UG" ? "UG" : "PG";

// Generate seat number
const seatNumber = `${prefix}-${100 + nextSeat}`;

// Hall Block
const hallBlock = "Main Hall";

// Row Number (10 seats per row)
const rowNumber = Math.ceil(nextSeat / 10);
// ================================
// Generate Convocation ID
// ================================

const year = new Date().getFullYear();

const convocationId = `CONV-${year}-${String(nextSeat).padStart(4, "0")}`;
    // Update registration and insert notifications in parallel
    const [updateResult] = await Promise.all([
     pool.query(
`
UPDATE registrations

SET

status='Approved',

seat_number=$1,

hall_block=$2,

row_number=$3,

convocation_id=$4,

updated_at=CURRENT_TIMESTAMP

WHERE student_id=$5

RETURNING *;
`,
[
seatNumber,
hallBlock,
rowNumber,
convocationId,
studentId
]
),
      pool.query(
        `
        INSERT INTO notifications
        (student_id, title, message, is_read, created_at)
        VALUES
        ($1, $2, $3, false, CURRENT_TIMESTAMP),
        ($1, $4, $5, false, CURRENT_TIMESTAMP),
        ($1, $6, $7, false, CURRENT_TIMESTAMP)
        `,
        [
          studentId,
          "Registration Approved",
          "Congratulations! Your convocation registration has been approved.",
          "Certificate Ready",
          "Your certificate is ready for download from the Certificate page.",
          "Convocation Event",
          "Please check Event Details for reporting time and venue."
        ]
      ),
      // Send email asynchronously (fire and forget)
      (async () => {
        try {
          console.log("📧 Attempting to send approval email to:", email);
          await sendEmail(
            email,
            "🎓 Convocation Registration Approved",
            `
            <div style="font-family: Arial; padding: 20px;">
              <h2 style="color: green;">Registration Approved</h2>
              <p>Dear <strong>${full_name}</strong>,</p>
              <p>Congratulations! Your Convocation Registration has been approved successfully.</p>
              <p>You can now login to the Convocation Portal to view:
                <ul>
                  <li>Registration Status</li>
                  <li>Seat Allocation</li>
                  <li>QR Entry Pass</li>
                  <li>Notifications</li>
                </ul>
              </p>
              <hr>
              <h3 style="color:#2563eb;">Login Credentials</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${roll_no}</p>
              <p style="color:red;">Please change your password after your first login.</p>
              <br>
              <a href="http://localhost:5173/login" style="background:#2563eb; color:white; padding:12px 25px; text-decoration:none; border-radius:8px; font-weight:bold;">Login Now</a>
              <br><br>
              <p>Regards,<br>Convocation Management Team</p>
            </div>
            `
          );
          console.log("✅ Approval email sent successfully");
        } catch (err) {
          console.error("❌ Failed to send approval email:", err);
        }
      })()
    ]);

    res.json({
      success: true,
      message: "Approved Successfully",
      data: updateResult.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Reject Registration
// =======================================

exports.rejectRegistration = async (req, res) => {
  try {

    const studentId = req.params.id;
    const studentResult = await pool.query(
      `
      SELECT
      full_name,
      email
      FROM students
      WHERE id = $1
      `,
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    const student = studentResult.rows[0];

    // Run update, notification insert, and email in parallel
    const [result] = await Promise.all([
      pool.query(
        `
        UPDATE registrations
        SET status='Rejected', updated_at=CURRENT_TIMESTAMP
        WHERE student_id=$1
        RETURNING *;
        `,
        [studentId]
      ),
      pool.query(
        `
        INSERT INTO notifications
        (student_id, title, message, is_read, created_at)
        VALUES
        ($1, $2, $3, false, CURRENT_TIMESTAMP)
        `,
        [
          studentId,
          "Registration Rejected",
          "Your registration has been rejected. Please contact the administration office."
        ]
      ),
      // Send email asynchronously (fire and forget)
      (async () => {
        try {
          console.log("📧 Attempting to send rejection email to:", student.email);
          await sendEmail(
            student.email,
            "Convocation Registration Rejected",
            `
            <div style="font-family:Arial;padding:20px">
              <h2 style="color:red;">Convocation Registration Rejected</h2>
              <p>Dear ${student.full_name},</p>
              <p>We regret to inform you that your Convocation Registration has been rejected.</p>
              <p>This may be due to:</p>
              <ul>
                <li>Incomplete documents</li>
                <li>Invalid uploaded documents</li>
                <li>Eligibility issues</li>
              </ul>
              <p>Please contact the Convocation Office for further clarification.</p>
              <br>
              <p>Regards,<br/>JNTU-GV Convocation Team</p>
            </div>
            `
          );
          console.log("✅ Rejection email sent successfully");
        } catch (err) {
          console.error("❌ Failed to send rejection email:", err);
        }
      })()
    ]);

    res.json({
      success: true,
      message: "Rejected Successfully",
      data: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getRecentActivities = async (req, res) => {
  try {

    const registrations = await pool.query(`
      SELECT
      'Registration' AS type,
      students.full_name,
      registrations.created_at
      FROM registrations
      JOIN students
      ON registrations.student_id = students.id
      ORDER BY registrations.created_at DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: registrations.rows
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete notifications
    await pool.query(
      "DELETE FROM notifications WHERE student_id = $1",
      [id]
    );

    // Delete certificates
    await pool.query(
      "DELETE FROM certificates WHERE student_id = $1",
      [id]
    );

    // Delete documents
    await pool.query(
      "DELETE FROM documents WHERE student_id = $1",
      [id]
    );

    // Delete registrations
    await pool.query(
      "DELETE FROM registrations WHERE student_id = $1",
      [id]
    );

    // Finally delete the student
    await pool.query(
      "DELETE FROM students WHERE id = $1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================================
// Get All Payments
// =======================================

exports.getAllPayments = async (req, res) => {

  try {

    const result = await pool.query(

      `SELECT

      payments.id,

      students.full_name,

      students.hall_ticket_no,

      students.roll_no,

      students.department,

      students.program,

      payments.transaction_id,

      payments.amount,

      payments.payment_date,

      payments.payment_method,

      payments.bank_name,

      payments.payment_status

      FROM payments

      JOIN students

      ON students.id=payments.student_id

      ORDER BY payments.id DESC`

    );

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
exports.verifyPayment = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(

      `UPDATE payments

      SET payment_status='Verified'

      WHERE id=$1`,

      [id]
    );

    res.json({
      success: true,
      message: "Payment Verified",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
exports.rejectPayment = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(

      `UPDATE payments

      SET payment_status='Rejected'

      WHERE id=$1`,

      [id]
    );

    res.json({
      success: true,
      message: "Payment Rejected",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
// =======================================
// Get All Documents
// =======================================

exports.getAllDocuments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id AS student_id,
        s.full_name,
        s.hall_ticket_no,
        s.program,
        s.department,
        s.batch,

        r.id AS registration_id,
        r.status,
        r.seat_number,
        r.hall_block,
        r.row_number,
        r.qr_code,
        p.amount,
        p.transaction_id,
        p.payment_status,

        d.document_name,
        d.document_path

      FROM students s

      LEFT JOIN documents d
      ON s.id = d.student_id

      LEFT JOIN registrations r
      ON s.id = r.student_id

      LEFT JOIN payments p
      ON s.id = p.student_id

      ORDER BY s.id;
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.searchStudent = async (req, res) => {
  try {

    const { keyword } = req.query;

    const result = await pool.query(
      `
      SELECT *

      FROM students

      WHERE

      full_name ILIKE $1

      OR

      hall_ticket_no ILIKE $1

      OR

      roll_no ILIKE $1

      ORDER BY id DESC
      `,
      [`%${keyword}%`]
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.filterDepartment = async (req, res) => {

  try {

    const { department } = req.params;

    const result = await pool.query(

      `
      SELECT *

      FROM students

      WHERE department=$1

      ORDER BY full_name
      `,

      [department]

    );

    res.json({

      success: true,

      count: result.rows.length,

      data: result.rows

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
exports.filterProgram = async (req, res) => {

  try {

    const { program } = req.params;

    const result = await pool.query(

      `
      SELECT *

      FROM students

      WHERE program=$1
      `,

      [program]

    );

    res.json({

      success: true,

      count: result.rows.length,

      data: result.rows

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
exports.filterGraduationYear = async (req, res) => {

  try {

    const { year } = req.params;

    const result = await pool.query(

      `
      SELECT *

      FROM students

      WHERE graduation_year=$1
      `,

      [year]

    );

    res.json({

      success: true,

      count: result.rows.length,

      data: result.rows

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
exports.allocateSeat = async (req, res) => {
  try {

    const studentId = req.params.id;

    const studentResult = await pool.query(
      `
      SELECT
      students.program,
      students.full_name,
      students.email,
      registrations.status

      FROM students
      JOIN registrations
      ON students.id = registrations.student_id

      WHERE students.id = $1
      `,
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const student = studentResult.rows[0];

    if (student.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Student not approved yet"
      });
    }

    const prefix = student.program === "UG" ? "UG" : "PG";

    const seatCount = await pool.query(
      `
      SELECT COUNT(*)
      FROM registrations
      WHERE seat_number IS NOT NULL
      `
    );

    const nextSeat = parseInt(seatCount.rows[0].count) + 1;
    const seatNumber = `${prefix}-${100 + nextSeat}`;
    const rowNumber = Math.ceil(nextSeat / 10);

    const [result] = await Promise.all([
      pool.query(
        `
        UPDATE registrations
        SET
        seat_number=$1,
        hall_block=$2,
        row_number=$3
        WHERE student_id=$4
        RETURNING *
        `,
        [seatNumber, "Main Hall", rowNumber, studentId]
      ),
      // Send email asynchronously (fire and forget)
      (async () => {
        try {
          console.log("📧 Attempting to send seat allocation email to:", student.email);
          await sendEmail(
            student.email,
            "Convocation Seat Allocation",
            `
            <h2>Hello ${student.full_name}</h2>
            <p>Your seat has been allocated successfully.</p>
            <p><strong>Seat Number:</strong> ${seatNumber}</p>
            <p><strong>Hall Block:</strong> Main Hall</p>
            <p><strong>Row Number:</strong> ${rowNumber}</p>
            <p>Please login to the Convocation Portal to view your QR Entry Pass.</p>
            <p>Regards,<br/>JNTU-GV Convocation Team</p>
            `
          );
          console.log("✅ Seat allocation email sent successfully");
        } catch (err) {
          console.error("❌ Failed to send seat allocation email:", err);
        }
      })()
    ]);

    res.json({
      success: true,
      message: "Seat Allocated Successfully",
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getSeatDetails = async (req, res) => {
  try {

    const result =
      await pool.query(
        `
        SELECT

        students.full_name,

        students.program,
        students.batch,

        registrations.seat_number,

        registrations.hall_block,

        registrations.row_number

        FROM registrations

        JOIN students

        ON registrations.student_id =
        students.id

        WHERE students.id = $1
        `,
        [req.params.id]
      );

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.totalRevenue = async (req, res) => {

  try {

    const result = await pool.query(

      `
      SELECT
      COALESCE(SUM(amount),0) AS total

      FROM payments

      WHERE payment_status='Paid'
      `

    );

    res.json({

      success: true,

      totalRevenue: result.rows[0].total

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
exports.sendEventReminder = async (
  req,
  res
) => {

  try {

    const students = await pool.query(
      `
      SELECT
      full_name,
      email
      FROM students
      `
    );

    for (const student of students.rows) {

      await sendEmail(

        student.email,

        "Convocation Event Reminder",

        `
        <div style="font-family:Arial;padding:20px">

          <h2 style="color:blue;">
            Convocation Event Reminder
          </h2>

          <p>
            Dear ${student.full_name},
          </p>

          <p>
            This is a reminder that the
            Convocation Ceremony is approaching.
          </p>

          <p>

            <strong>Date:</strong>
            15 July 2026

            <br><br>

            <strong>Venue:</strong>
            JNTU-GV Auditorium

            <br><br>

            <strong>Reporting Time:</strong>
            9:00 AM

          </p>

          <p>
            Please bring:
          </p>

          <ul>
            <li>QR Entry Pass</li>
            <li>Identity Card</li>
          </ul>

          <p>
            Regards,<br/>
            Convocation Team
          </p>

        </div>
        `
      );
    }

    res.json({
      success: true,
      message:
      "Reminder Sent Successfully"
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};