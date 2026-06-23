const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getProfile,
  updateProfile,
  getStudentQR,
} = require("../controllers/studentController");

// Get Profile
router.get("/profile", auth, getProfile);

// Update Profile
router.put("/profile", auth, updateProfile);

// Get QR
router.get("/qr", auth, getStudentQR);

module.exports = router;