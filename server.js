const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});