const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Use ONLY this CORS config
app.use(cors({
  origin: "https://pro-client-crm.netlify.app",
  credentials: true
}));

app.use(express.json());

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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});