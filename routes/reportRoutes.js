const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔥 Create Reports Table
db.run(`
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slNo TEXT,
  projectId TEXT,
  projectName TEXT
)
`);

// ===============================
// GET ALL REPORTS
// ===============================
router.get("/reports", (req, res) => {
  db.all("SELECT * FROM reports", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch reports" });
    }
    res.json(rows);
  });
});

// ===============================
// ADD REPORT
// ===============================
router.post("/reports", (req, res) => {
  const { slNo, projectId, projectName } = req.body;

  db.run(
    `INSERT INTO reports (slNo, projectId, projectName) VALUES (?, ?, ?)`,
    [slNo, projectId, projectName],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Insert failed" });
      }

      res.json({
        message: "Report added successfully",
        reportId: this.lastID
      });
    }
  );
});

// ===============================
// DELETE REPORT
// ===============================
router.delete("/reports/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM reports WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Delete failed" });
    }

    res.json({ message: "Report deleted successfully" });
  });
});

module.exports = router;