const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {

  getDashboardStats,

  getAllStudents,

  getAllRegistrations,

  approveRegistration,

  rejectRegistration,

  getAllPayments,
  getRecentActivities,
  getAllDocuments,
  searchStudent,
  filterDepartment,
  filterProgram,
  filterGraduationYear,
  totalRevenue,
  allocateSeat,
getSeatDetails,
sendEventReminder,
} = require("../controllers/adminController");

const {
  deleteStudent,
} = require("../controllers/adminController");
// ================= Dashboard =================
router.delete(
  "/student/:id",
  adminAuth,
  deleteStudent
);
router.get(
  "/dashboard",
  adminAuth,
  getDashboardStats
);
router.post(
  "/send-event-reminder",
  adminAuth,
  sendEventReminder
);
router.get(
  "/activities",
  adminAuth,
  getRecentActivities
);

router.get(
  "/search",
  adminAuth,
  searchStudent
);

router.get(
  "/department/:department",
  adminAuth,
  filterDepartment
);

router.get(
  "/program/:program",
  adminAuth,
  filterProgram
);

router.get(
  "/graduation/:year",
  adminAuth,
  filterGraduationYear
);

router.get(
  "/revenue",
  adminAuth,
  totalRevenue
);
// ================= Students =================

router.get(
  "/students",
  adminAuth,
  getAllStudents
);

router.put(
  "/seat/:id",
  adminAuth,
  allocateSeat
);

router.get(
  "/seat/:id",
  adminAuth,
  getSeatDetails
);
// ================= Registrations =================

router.get(
  "/registrations",
  adminAuth,
  getAllRegistrations
);


// ================= Approve Registration =================

router.put(
  "/approve/:id",
  adminAuth,
  approveRegistration
);


// ================= Reject Registration =================

router.put(
  "/reject/:id",
  adminAuth,
  rejectRegistration
);


// ================= Payments =================

router.get(
  "/payments",
  adminAuth,
  getAllPayments
);


// ================= Documents =================

router.get(
  "/documents",
  adminAuth,
  getAllDocuments
);

module.exports = router;