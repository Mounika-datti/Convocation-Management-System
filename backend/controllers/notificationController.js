const pool = require("../config/db");

// =======================================
// Send Notification (Admin)
// =======================================

exports.sendNotification = async (req, res) => {
  try {
    const { student_id, title, message } = req.body;

    if (!student_id || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO notifications
      (
        student_id,
        title,
        message
      )

      VALUES
      ($1,$2,$3)

      RETURNING *;
      `,
      [student_id, title, message]
    );

    res.status(201).json({
      success: true,
      message: "Notification Sent Successfully",
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

// =======================================
// Student Notifications
// =======================================

exports.getStudentNotifications = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *

      FROM notifications

      WHERE student_id=$1

      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      count: result.rows.length,
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

// =======================================
// Admin View All Notifications
// =======================================

exports.getAllNotifications = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT

      notifications.id,

      notifications.title,

      notifications.message,

      notifications.is_read,

      notifications.created_at,

      students.full_name,

      students.hall_ticket_no

      FROM notifications

      JOIN students

      ON notifications.student_id = students.id

      ORDER BY notifications.created_at DESC
      `
    );

    res.json({
      success: true,
      count: result.rows.length,
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

// =======================================
// Mark Notification as Read
// =======================================

exports.markAsRead = async (req, res) => {

  try {

    await pool.query(
      `
      UPDATE notifications

      SET is_read=true

      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Notification Marked As Read",
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
// Delete Notification
// =======================================

exports.deleteNotification = async (req, res) => {

  try {

    await pool.query(
      `
      DELETE FROM notifications

      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Notification Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};