const pool = require("../config/db");
const jwt = require("jsonwebtoken");

// =======================
// ADMIN LOGIN
// =======================

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate Input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    // Check Admin
    const result = await pool.query(
      `
      SELECT *
      FROM admins
      WHERE username = $1
      `,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const admin = result.rows[0];

    // Plain Text Password Check
    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token: token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};