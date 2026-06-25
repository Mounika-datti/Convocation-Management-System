const pool = require("../config/db");

// Student submits payment details

exports.submitPayment = async (req, res) => {
  try {
    const {
      transaction_id,
      amount,
      payment_date,
      payment_method,
      bank_name,
    } = req.body;

    const student_id = req.user.id;

    const check = await pool.query(
      "SELECT * FROM payments WHERE student_id=$1",
      [student_id]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Payment details already submitted",
      });
    }

    const result = await pool.query(
      `INSERT INTO payments
      (
      student_id,
      transaction_id,
      amount,
      payment_date,
      payment_method,
      bank_name
      )

      VALUES($1,$2,$3,$4,$5,$6)

      RETURNING *`,
      [
        student_id,
        transaction_id,
        amount,
        payment_date,
        payment_method,
        bank_name,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Student Payment Status

exports.getPayment = async (req, res) => {

  try {

    const result = await pool.query(

      `SELECT * FROM payments
       WHERE student_id=$1`,

      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows[0],
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
      `
      UPDATE payments
      SET payment_status='Verified'
      WHERE id=$1
      `,
      [id]
    );

    await pool.query(
      `
      UPDATE registrations
      SET payment_status='Verified'
      WHERE student_id=
      (
        SELECT student_id
        FROM payments
        WHERE id=$1
      )
      `,
      [id]
    );

    res.json({
      success:true,
      message:"Payment Verified"
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

};
exports.getAllPayments = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT

      payments.id,

      students.full_name,

      students.hall_ticket_no,

      students.roll_no,

      students.program,

      students.department,

      payments.transaction_id,

      payments.amount,

      payments.payment_date,

      payments.payment_method,

      payments.bank_name,

      payments.payment_status

      FROM payments

      JOIN students
      ON students.id = payments.student_id

      ORDER BY payments.id DESC
      `
    );

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
exports.rejectPayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Update payment status
    await pool.query(
      `
      UPDATE payments
      SET payment_status = 'Rejected'
      WHERE id = $1
      `,
      [id]
    );

    // Update registration payment status
    await pool.query(
      `
      UPDATE registrations
      SET payment_status = 'Rejected'
      WHERE student_id = (
        SELECT student_id
        FROM payments
        WHERE id = $1
      )
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Payment Rejected",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};