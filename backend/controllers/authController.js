const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
console.log("UPDATED AUTH CONTROLLER LOADED");
// ================= REGISTER =================

exports.register = async (req, res) => {

  try {

    const {
      full_name,
      hall_ticket_no,
      roll_no,
      email,
      password,
      phone,
      program,
      degree,
      department,
      college_name,
      batch,
      graduation_year,
      address
    } = req.body;

    // Check Email

    const emailExists = await pool.query(
      "SELECT * FROM students WHERE email=$1",
      [email]
    );

    if (emailExists.rows.length > 0) {

      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });

    }

    // Check Hall Ticket

    const hallExists = await pool.query(
      "SELECT * FROM students WHERE hall_ticket_no=$1",
      [hall_ticket_no]
    );

    if (hallExists.rows.length > 0) {

      return res.status(400).json({
        success: false,
        message: "Hall Ticket already exists"
      });

    }

    // Check Roll Number

    const rollExists = await pool.query(
      "SELECT * FROM students WHERE roll_no=$1",
      [roll_no]
    );

    if (rollExists.rows.length > 0) {

      return res.status(400).json({
        success: false,
        message: "Roll Number already exists"
      });

    }

    // Hash Password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Insert Student
  console.log("REQ BODY:", req.body);
console.log("BATCH VALUE:", batch);
    await pool.query(

      `INSERT INTO students
      (
        full_name,
        hall_ticket_no,
        roll_no,
        email,
        password,
        phone,
        program,
        degree,
        department,
        college_name,
        batch,
        graduation_year,
        address
      )

      VALUES

      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,

      [
        full_name,
        hall_ticket_no,
        roll_no,
        email,
        hashedPassword,
        phone,
        program,
        degree,
        department,
        college_name,
        batch,
        graduation_year,
        address
      ]

    );

    res.status(201).json({

      success: true,
      message: "Student Registered Successfully"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

};

// ================= LOGIN =================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const student = await pool.query(

      "SELECT * FROM students WHERE email=$1",

      [email]

    );

    if (student.rows.length === 0) {

      return res.status(400).json({

        success: false,
        message: "Student Not Found"

      });

    }

    const user = student.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,
        message: "Invalid Password"

      });

    }

    const token = jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }

    );

    res.status(200).json({

      success: true,

      token,

      student: {

        id: user.id,

        full_name: user.full_name,

        hall_ticket_no: user.hall_ticket_no,

        department: user.department,

        program: user.program

      }

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

};

// =======================================
// FORGOT PASSWORD
// =======================================

exports.forgotPassword = async (
  req,
  res
) => {

  console.log("\\n\\n@@@ FORGOT PASSWORD HANDLER EXECUTING @@@\\n\\n");

  const uniqueMarker = "HANDLER_V2_EXEC_UNIQUE_MARKER_20260621";
  console.log(uniqueMarker);

  const fs = require("fs");
  const path = require("path");
  const logPath = path.join(__dirname, "handler.log");
  fs.appendFileSync(logPath, `\\n[${new Date().toISOString()}] ${uniqueMarker}\\n`);

  console.error(
    "\\n\\n=== FORGOT PASSWORD HANDLER CALLED ===\\n"
  );
  console.log(
    "Forgot Password API Hit"
  );

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({

        success: false,

        message:
          "Email is required",

      });

    }

    const student =
      await pool.query(

        `
        SELECT *

        FROM students

        WHERE email = $1
        `,

        [email]

      );

    if (
      student.rows.length === 0
    ) {

      return res.status(404).json({

        success: false,

        message:
          "Student not found",

      });

    }

    const otp =
      generateOTP();

    console.log("OTP =", otp);

    await pool.query(

      `
      DELETE FROM otp_verification

      WHERE email = $1
      `,

      [email]

    );

    await pool.query(

      `
      INSERT INTO otp_verification
      (
        email,
        otp
      )

      VALUES
      ($1,$2)
      `,

      [
        email,
        otp
      ]

    );

    console.log(
      "Calling sendEmail..."
    );

    await sendEmail(

      email,

      "Password Reset OTP",

      `
      <div
        style="
        font-family:Arial;
        padding:20px;
        "
      >

        <h2
          style="
          color:#2563eb;
          "
        >
          Password Reset OTP
        </h2>

        <p>
          Dear Student,
        </p>

        <p>
          Your OTP for password reset:
        </p>

        <h1
          style="
          text-align:center;
          background:#f3f4f6;
          padding:15px;
          border-radius:10px;
          "
        >
          ${otp}
        </h1>

        <p>
          Valid for 10 minutes.
        </p>

        <p>
          Do not share this OTP.
        </p>

      </div>
      `

    );

    console.log(
      "OTP sent successfully"
    );

    // IMPORTANT: Do NOT include OTP in response - send via email only
    res.status(200).json({

      success: true,

      message:
        "OTP Sent To Email Successfully",
      
      timestamp: new Date().toISOString(),
      codeVersion: "updated-20260621-12-03"
      // OTP NOT included in response

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};
// =======================================
// VERIFY OTP
// =======================================

exports.verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const result = await pool.query(
      `
      SELECT *
      FROM otp_verification
      WHERE email = $1
      AND otp = $2
      `,
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
// =======================================
// RESET PASSWORD
// =======================================

exports.resetPassword = async (req, res) => {

  try {

    const {
      email,
      newPassword
    } = req.body;

    // Validate Input

    if (!email || !newPassword) {

      return res.status(400).json({

        success: false,
        message: "Email and New Password are required"

      });

    }

    // Check Student Exists

    const student = await pool.query(

      `
      SELECT *

      FROM students

      WHERE email = $1
      `,

      [email]

    );

    if (student.rows.length === 0) {

      return res.status(404).json({

        success: false,
        message: "Student Not Found"

      });

    }

    // Hash Password

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    // Update Password

    await pool.query(

      `
      UPDATE students

      SET password = $1

      WHERE email = $2
      `,

      [
        hashedPassword,
        email
      ]

    );

    // Delete OTP

    await pool.query(

      `
      DELETE FROM otp_verification

      WHERE email = $1
      `,

      [email]

    );

    res.json({

      success: true,
      message: "Password Reset Successfully"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};
exports.testEmail = async (req, res) => {
  try {

    await sendEmail(
      "mounikadatti05@gmail.com",
      "Test Email",
      "<h2>Email Working Successfully</h2>"
    );

    res.json({
      success: true,
      message: "Email Sent"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};