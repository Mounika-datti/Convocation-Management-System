const pool = require("./config/db");

(async () => {
  try {
    console.log("Checking if email exists in database...\n");
    
    const result = await pool.query(
      "SELECT id, full_name, email FROM students WHERE email = $1",
      ["mounikadatti05@gmail.com"]
    );

    if (result.rows.length > 0) {
      console.log("✓ Email FOUND in database:");
      console.log("  ID:", result.rows[0].id);
      console.log("  Name:", result.rows[0].full_name);
      console.log("  Email:", result.rows[0].email);
    } else {
      console.log("✗ Email NOT found in database");
    }
    
    console.log("\nChecking otp_verification table...");
    const otpCheck = await pool.query(
      "SELECT * FROM otp_verification WHERE email = $1",
      ["mounikadatti05@gmail.com"]
    );
    
    console.log(`Found ${otpCheck.rows.length} OTP record(s)`);
    if (otpCheck.rows.length > 0) {
      console.log("Latest OTP:", otpCheck.rows[0]);
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
