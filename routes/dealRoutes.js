const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   CREATE DEAL TABLE
========================= */
db.run(`
  CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dealId TEXT,
    dealName TEXT,
    company TEXT,
    amount TEXT,
    status TEXT,
    action TEXT,
    closeDate TEXT
  )
`, (err) => {
  if (err) {
    console.error("Error creating deals table:", err.message);
  } else {
    console.log("Deals table ready");
  }
});


/* =========================
   GET ALL DEALS
========================= */
router.get("/deals", (req, res) => {
  db.all("SELECT * FROM deals", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


/* =========================
   ADD DEAL
========================= */
router.post("/deals", (req, res) => {
  const { dealId, dealName, company, amount, status, action, closeDate } = req.body;

  const sql = `
    INSERT INTO deals (dealId, dealName, company, amount, status, action, closeDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [dealId, dealName, company, amount, status, action, closeDate], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Deal added successfully",
      id: this.lastID
    });
  });
});


/* =========================
   DELETE DEAL
========================= */
router.delete("/deals/:id", (req, res) => {
  db.run("DELETE FROM deals WHERE id = ?", req.params.id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Deal deleted successfully" });
  });
});

module.exports = router;