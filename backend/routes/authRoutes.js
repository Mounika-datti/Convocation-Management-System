const express = require("express");

const router = express.Router();

const {

  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
  testEmail

} = require("../controllers/authController");

// Register

router.post("/register", register);
router.post("/forgot-password",forgotPassword);
router.get(
  "/test-email",
  testEmail
);
router.post("/verify-otp",verifyOTP);
router.post("/login", login);
router.post("/reset-password",resetPassword);
module.exports = router;