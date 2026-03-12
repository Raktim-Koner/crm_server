const express = require("express");
const router = express.Router();
const db = require("../db");

/* =================================
   CREATE TABLE (Accounts Module)
================================= */
db.run(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountId TEXT,
    company TEXT,
    industryName TEXT,
    location TEXT,
    status TEXT
  )
`);

/* =================================
   GET ALL ACCOUNTS
================================= */
router.get("/accounts", (req, res) => {
  db.all("SELECT * FROM accounts", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/* =================================
   ADD ACCOUNT
================================= */
router.post("/accounts", (req, res) => {
  const { accountId, company, industryName, location, status } = req.body;

  const sql = `
    INSERT INTO accounts (accountId, company, industryName, location, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [accountId, company, industryName, location, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Account added successfully",
      id: this.lastID
    });
  });
});

/* =================================
   DELETE ACCOUNT
================================= */
router.delete("/accounts/:id", (req, res) => {
  db.run("DELETE FROM accounts WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Account deleted successfully" });
  });
});

module.exports = router;