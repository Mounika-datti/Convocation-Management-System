const pool = require("../config/db");

// ================= GET PROFILE =================

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `
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
        graduation_year,
        address,
        created_at
      FROM students
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
  try {

    const {
      full_name,
      phone,
      program,
      degree,
      department,
      college_name,
      graduation_year,
      address,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE students
      SET
        full_name = $1,
        phone = $2,
        program = $3,
        degree = $4,
        department = $5,
        college_name = $6,
        graduation_year = $7,
        address = $8
      WHERE id = $9
      RETURNING *;
      `,
      [
        full_name,
        phone,
        program,
        degree,
        department,
        college_name,
        graduation_year,
        address,
        req.user.id,
      ]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET QR =================

const getStudentQR = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
      s.full_name,
      s.hall_ticket_no,
      s.program,

      r.seat_number,
      r.hall_block,
      r.row_number,
      r.qr_code

      FROM students s

      JOIN registrations r
      ON s.id = r.student_id

      WHERE s.id = $1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message:"QR Pass Not Found"
      });
    }

    res.json({
      success:true,
      data:result.rows[0]
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
module.exports = {
  getProfile,
  updateProfile,
  getStudentQR,
};