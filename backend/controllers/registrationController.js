const pool = require("../config/db");

// Register for Convocation
exports.registerConvocation = async (req, res) => {
  try {
    const student_id = req.user.id;
    const { session_id, attendance_type } = req.body;

    if (!session_id || !attendance_type) {
      return res.status(400).json({
        success: false,
        message: "Session and attendance type are required."
      });
    }

    const existing = await pool.query(
      "SELECT * FROM registrations WHERE student_id = $1",
      [student_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already registered.",
        data: existing.rows[0]
      });
    }

    // Get student program (UG / PG)
    const studentResult = await pool.query(
      "SELECT program FROM students WHERE id = $1",
      [student_id]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const program = studentResult.rows[0].program;

    const result = await pool.query(
      `
      INSERT INTO registrations
      (
        student_id,
        session_id,
        attendance_type,
        status,
        payment_status,
        program
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *;
      `,
      [
        student_id,
        session_id,
        attendance_type,
        "Pending",
        "Pending",
        program
      ]
    );

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "You have already registered."
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Registration failed."
    });
  }
};

// Get Registration Status

exports.getRegistrationStatus = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM registrations
      WHERE student_id=$1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Registration Not Found"
      });

    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};