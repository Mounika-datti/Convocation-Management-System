const express = require("express");

const router = express.Router();

const {

sendInvitations

} = require("../controllers/invitationController");

router.post("/send", sendInvitations);

module.exports = router;