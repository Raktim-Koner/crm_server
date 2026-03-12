const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const sendEmail = require("../utils/sendEmail"); // 👈 add this

// 🔥 Connect to SQLite DB
const db = new sqlite3.Database("./database.db");


// ======================================================
// CREATE TABLE
// ======================================================

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gmail TEXT UNIQUE,
    password TEXT
  )
`);


// ======================================================
// GET ALL USERS
// ======================================================

router.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// ======================================================
// SIGN UP
// ======================================================

router.post("/signup", (req, res) => {

  const { name, gmail, password } = req.body;

  const sql =
    "INSERT INTO users (name, gmail, password) VALUES (?, ?, ?)";

  db.run(sql, [name, gmail, password], async function (err) {

    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Send Email After Successful Signup
    await sendEmail(
      gmail,
      "Welcome to CRM System",
      `Hello ${name}, your CRM account has been created successfully.`
    );

    res.json({
      message: "User created successfully",
      id: this.lastID
    });

  });

});


// ======================================================
// SIGN IN
// ======================================================

router.post("/signin", (req, res) => {

  const { gmail, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE gmail = ? AND password = ?";

  db.get(sql, [gmail, password], (err, row) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(row);

  });

});

module.exports = router;