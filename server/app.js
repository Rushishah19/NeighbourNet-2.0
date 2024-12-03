const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
   origin: 'http://localhost:5173', // Replace with your frontend's URL in production
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));

// Define routes
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app; // Export only the app, not the server



