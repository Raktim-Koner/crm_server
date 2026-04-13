const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS
app.use(cors({
  origin: "https://pro-client-crm.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// routes
const userRoutes = require("../routes/userRoutes");
const reportRoutes = require("../routes/reportRoutes");
const accountRoutes = require("../routes/accountRoutes");
const dealRoutes = require("../routes/dealRoutes");
const projectRoutes = require("../routes/projectRoutes");
const taskRoutes = require("../routes/taskRoutes");

app.use("/", userRoutes);
app.use("/", reportRoutes);
app.use("/", accountRoutes);
app.use("/", dealRoutes);
app.use("/", projectRoutes);
app.use("/", taskRoutes);

// ✅ export for Vercel
module.exports = app;