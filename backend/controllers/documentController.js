const pool = require("../config/db");

// Upload Document

exports.uploadDocument = async (req, res) => {
  try {
    const student_id = req.user.id;

    const document_name = req.body.document_name;

    const document_path = req.file.filename;

    const result = await pool.query(
      `
      INSERT INTO documents
      (
        student_id,
        document_name,
        document_path
      )

      VALUES

      ($1,$2,$3)

      RETURNING *;
      `,
      [
        student_id,
        document_name,
        document_path,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Document Uploaded Successfully",
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

// Get Documents

exports.getDocuments = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM documents
      WHERE student_id=$1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json({
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
exports.checkStudentDocuments = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `
      SELECT document_name
      FROM documents
      WHERE student_id = $1
      `,
      [studentId]
    );

    res.status(200).json({
      success: true,
      documents: result.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};