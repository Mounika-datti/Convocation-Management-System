const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Invitation Route Working"
  });
});

const { sendInvitations } = require("../controllers/invitationController");

router.post("/send", sendInvitations);

module.exports = router;