const sendEmail = require("../utils/sendEmail");

exports.sendInvitations = async (req, res) => {
  try {

    const { eventName, emails } = req.body;

    let sent = 0;
    let failed = 0;

    for (const college of emails) {

      try {

        await sendEmail(

          college.email,

          `Invitation - ${eventName}`,

          `
          <div style="font-family:Arial;padding:20px">

            <h2 style="color:#2563eb;">
              JNTU-GV Convocation Invitation
            </h2>

            <p>Dear Sir/Madam,</p>

            <p>
              Greetings from JNTU-GV.
            </p>

            <p>
              We are pleased to invite
              <b>${college.college_name}</b>
              to attend
              <b>${eventName}</b>.
            </p>

            <hr>

            <h3>Event Details</h3>

            <p><b>Event :</b> ${eventName}</p>

            <p>
              We would be honored by your presence.
            </p>

            <br>

            <p>
              Regards,<br>
              Convocation Committee<br>
              JNTU-GV
            </p>

          </div>
          `
        );

        sent++;

      } catch (err) {

        console.log(err);

        failed++;

      }

    }

    res.json({
      success: true,
      sent,
      failed
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};