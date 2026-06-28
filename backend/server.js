// Load Environment Variables
require("dotenv").config();
console.log("SERVER FILE LOADED");
console.log(__dirname);
// Import Packages
const express = require("express");
const cors = require("cors");
const path = require("path");

// Connect Database
require("./config/db");

// Create Express App
const app = express();

// ======================
// Middlewares
// ======================
app.use(
  cors({
    origin: [
       "https://convocation-management-system.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// Import Routes
// ======================

const authRoutes = require("./routes/authRoutes");

const studentRoutes = require("./routes/studentRoutes");

const documentRoutes = require("./routes/documentRoutes");

const registrationRoutes = require("./routes/registrationRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes =require("./routes/reportRoutes");
const paymentRoutes=require("./routes/paymentRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const idCardRoutes = require("./routes/idCardRoutes");
// ======================
// API Routes
// ======================

// Authentication
app.use("/api/auth", authRoutes);
// Student Profile
app.use("/api/student", studentRoutes);

// Document Upload
app.use("/api/documents", documentRoutes);

// Convocation Registration
app.use("/api/registration", registrationRoutes);
app.use( "/api/admin/auth",adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use( "/api/reports",reportRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/id-card", idCardRoutes);
// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JNTU-GV Convocation Management API Running",
  });
});

// ======================
// 404 Route
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;
app.get("/test", (req, res) => {
  res.send("SERVER WORKING");
});
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});