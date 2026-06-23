const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {

  dashboardSummary,

  studentReport,

  registrationReport,

  paymentReport,

  certificateReport

} = require("../controllers/reportController");

router.get(
  "/dashboard",
  adminAuth,
  dashboardSummary
);

router.get(
  "/students",
  adminAuth,
  studentReport
);

router.get(
  "/registrations",
  adminAuth,
  registrationReport
);

router.get(
  "/payments",
  adminAuth,
  paymentReport
);

router.get(
  "/certificates",
  adminAuth,
  certificateReport
);

module.exports = router;