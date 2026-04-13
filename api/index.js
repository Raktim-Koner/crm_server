const express = require("express");
const cors = require("cors");
const app = express();

// 1. Better CORS configuration
app.use(cors({
  origin: "https://pro-client-crm.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// 2. Import Routes (Check these paths carefully!)
const userRoutes = require("../routes/userRoutes");
const reportRoutes = require("../routes/reportRoutes");
const accountRoutes = require("../routes/accountRoutes");
const dealRoutes = require("../routes/dealRoutes");
const projectRoutes = require("../routes/projectRoutes");
const taskRoutes = require("../routes/taskRoutes");

// 3. Use Routes
app.use("/", userRoutes);
app.use("/", reportRoutes);
app.use("/", accountRoutes);
app.use("/", dealRoutes);
app.use("/", projectRoutes);
app.use("/", taskRoutes);

module.exports = app;