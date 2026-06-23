const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  registerConvocation,
  getRegistrationStatus
} = require("../controllers/registrationController");

router.post(
  "/register",
  auth,
  registerConvocation
);

router.get(
  "/status",
  auth,
  getRegistrationStatus
);

module.exports = router;