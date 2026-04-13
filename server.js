const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIX CORS (manual + reliable for Vercel)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pro-client-crm.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ very important
  }

  next();
});

// ✅ optional (safe to keep)
app.use(cors());

app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const accountRoutes = require("./routes/accountRoutes");
const dealRoutes = require("./routes/dealRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/", userRoutes);
app.use("/", reportRoutes);
app.use("/", accountRoutes);
app.use("/", dealRoutes);
app.use("/", projectRoutes);
app.use("/", taskRoutes);

module.exports = app;