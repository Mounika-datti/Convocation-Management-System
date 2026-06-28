const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {

  getStudentIDCard

} = require("../controllers/idCardController");

router.get("/", auth, getStudentIDCard);

module.exports = router;