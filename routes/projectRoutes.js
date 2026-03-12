const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔹 Create Projects Table (only once)
db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dealId TEXT,
    projectId TEXT,
    projectName TEXT,
    assignTo TEXT,
    amount TEXT,
    status TEXT,
    dueDate TEXT
  )
`);

// =====================================
// GET All Projects
// =====================================
router.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// =====================================
// ADD Project
// =====================================
router.post("/projects", (req, res) => {
  const { dealId, projectId, projectName, assignTo, amount, status, dueDate } = req.body;

  const sql = `
    INSERT INTO projects 
    (dealId, projectId, projectName, assignTo, amount, status, dueDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [dealId, projectId, projectName, assignTo, amount, status, dueDate], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Project added successfully",
      id: this.lastID
    });
  });
});

// =====================================
// DELETE Project
// =====================================
router.delete("/projects/:id", (req, res) => {
  db.run("DELETE FROM projects WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Project deleted successfully" });
  });
});

module.exports = router;