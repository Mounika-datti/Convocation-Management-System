require("dotenv").config();

const http = require("http");

const email = "mounikadatti05@gmail.com";
const postData = JSON.stringify({ email });

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/auth/forgot-password",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

console.log("Testing OTP email send to:", email);
console.log("Timestamp:", new Date().toISOString());
console.log("=".repeat(50));

const req = http.request(options, (res) => {
  console.log("Status Code:", res.statusCode);
  console.log("Headers:", res.headers);

  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response Body:", data);
    try {
      const json = JSON.parse(data);
      console.log("OTP in response:", json.otp ? "YES (bad!)" : "NO (good!)");
    } catch (e) {
      console.log("Could not parse response as JSON");
    }
    console.log("=".repeat(50));
    console.log("Test complete. Check backend logs above for email send status.");
  });
});

req.on("error", (error) => {
  console.error("Request Error:", error);
});

req.write(postData);
req.end();
