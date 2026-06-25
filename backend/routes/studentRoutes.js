const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getProfile,
  updateProfile,
  getStudentQR,
  verifyQR,
} = require("../controllers/studentController");

// Get Profile
router.get("/profile", auth, getProfile);

// Update Profile
router.put("/profile", auth, updateProfile);

// Get QR
router.get("/qr", auth, getStudentQR);
// Verify QR (No Login Required)
router.get("/verify/:convocationId", verifyQR);

module.exports = router;