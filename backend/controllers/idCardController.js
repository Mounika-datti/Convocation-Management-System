const pool = require("../config/db");

// =======================================
// Get Student ID Card Details
// =======================================

exports.getStudentIDCard = async (req, res) => {

  try {

    const studentId = req.user.id;

   const result = await pool.query(
`
SELECT

s.id,
s.full_name,
s.hall_ticket_no,
s.roll_no,
s.program,
s.degree,
s.department,
s.batch,
s.graduation_year,

r.status,
r.id_card_generated,
r.seat_number,
r.row_number,
r.hall_block,
r.convocation_id,

d.document_path

FROM students s

JOIN registrations r
ON s.id=r.student_id

LEFT JOIN documents d
ON
s.id=d.student_id
AND d.document_name='Passport Photo'

WHERE s.id=$1
`,
[studentId]
);
    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Student Not Found"
      });

    }

    const student = result.rows[0];
    if (!student.id_card_generated) {

  return res.status(400).json({
    success: false,
    message: "Please complete your convocation registration first."
  });

}
   const photoUrl = student.document_path
  ? `${req.protocol}://${req.get("host")}/uploads/${student.document_path}`
  : null;
    res.json({

      success: true,

      data: {

        university:
          "Jawaharlal Nehru Technological University Gurajada Vizianagaram",

        convocation:
          "1 CONVOCATION",

        date:
          "11 July 2026",

        controller:
          "Controller of Examination",

        ...student,
     photo: photoUrl
      }

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