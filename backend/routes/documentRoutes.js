const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const upload = require("../middleware/upload");

const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

// Upload Document

router.post(
  "/upload",
  auth,
  upload.single("document"),
  uploadDocument
);

// Get Documents

router.get(
  "/",
  auth,
  getDocuments
);

module.exports = router;

const {
  checkStudentDocuments,
} = require("../controllers/documentController");

router.get(
  "/check/:studentId",
  checkStudentDocuments
);