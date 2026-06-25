const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const adminAuth = require("../middleware/adminAuth");

const paymentController = require("../controllers/paymentController");

router.post(
  "/submit",
  auth,
  paymentController.submitPayment
);

router.get(
  "/student",
  auth,
  paymentController.getPayment
);

router.get(
  "/admin",
  adminAuth,
  paymentController.getAllPayments
);

router.put(
  "/verify/:id",
  adminAuth,
  paymentController.verifyPayment
);

router.put(
  "/reject/:id",
  adminAuth,
  paymentController.rejectPayment
);

module.exports = router;