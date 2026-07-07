// 1. Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

const app = express();

// 2. Global Middlewares
app.use(cors());          // Allows our frontend to communicate with this API
app.use(express.json());  // Allows our server to read JSON bodies sent by the user
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use(morgan("dev"));   // Request Logging middleware (Satisfies course requirements)

// 3. Simple Testing Route (Health Check)
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "success",
    message: "Library Management API is running perfectly!" 
  });
});

// 4. Start the Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});