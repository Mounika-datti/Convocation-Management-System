const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const adminAuth = require("../middleware/adminAuth");

const {

  sendNotification,

  getStudentNotifications,

  getAllNotifications,

  markAsRead,

  deleteNotification

} = require("../controllers/notificationController");


// Student Notifications

router.get(
  "/student",
  auth,
  getStudentNotifications
);


// Admin Notifications

router.get(
  "/admin",
  adminAuth,
  getAllNotifications
);


// Send Notification

router.post(
  "/send",
  adminAuth,
  sendNotification
);


// Mark Read

router.put(
  "/read/:id",
  auth,
  markAsRead
);


// Delete

router.delete(
  "/delete/:id",
  adminAuth,
  deleteNotification
);

module.exports = router;