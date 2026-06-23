const pool = require("../config/db");

// ===================================
// Dashboard Summary
// ===================================

exports.dashboardSummary = async (req, res) => {
  try {

    const students =
      await pool.query("SELECT COUNT(*) FROM students");

    const registrations =
      await pool.query("SELECT COUNT(*) FROM registrations");

    const payments =
      await pool.query("SELECT COUNT(*) FROM payments");

    const certificates =
      await pool.query("SELECT COUNT(*) FROM certificates");

    const notifications =
      await pool.query("SELECT COUNT(*) FROM notifications");

    res.json({
      success: true,
      data: {
        total_students: students.rows[0].count,
        total_registrations: registrations.rows[0].count,
        total_payments: payments.rows[0].count,
        total_certificates: certificates.rows[0].count,
        total_notifications: notifications.rows[0].count
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ===================================
// Student Report
// ===================================

exports.studentReport = async (req, res) => {

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
      graduation_year

      FROM students

      ORDER BY id DESC
    `);

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

// ===================================
// Registration Report
// ===================================

exports.registrationReport = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

      registrations.id,

      students.full_name,

      students.hall_ticket_no,

      students.program,

      registrations.attendance_type,

      registrations.status,

      registrations.payment_status

      FROM registrations

      JOIN students

      ON registrations.student_id = students.id

      ORDER BY registrations.id DESC
    `);

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

// ===================================
// Payment Report
// ===================================

exports.paymentReport = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

      payments.*,

      students.full_name,

      students.hall_ticket_no

      FROM payments

      JOIN students

      ON payments.student_id = students.id

      ORDER BY payments.id DESC
    `);

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

// ===================================
// Certificate Report
// ===================================

exports.certificateReport = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

      certificates.*,

      students.full_name,

      students.hall_ticket_no

      FROM certificates

      JOIN students

      ON certificates.student_id = students.id

      ORDER BY certificates.id DESC
    `);

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