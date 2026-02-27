const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());   // VERY IMPORTANT for req.body

// 🔥 Create / Connect SQLite Database
const db = new sqlite3.Database("./crm.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// 🔥 Create Users Table
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  gmail TEXT UNIQUE,
  password TEXT
)
`);

// ===============================
// ✅ GET ALL USERS (For Login)
// ===============================
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(rows);
  });
});

// ===============================
// ✅ SIGNUP API
// ===============================
app.post("/signup", (req, res) => {
  const { name, gmail, password } = req.body;

  if (!name || !gmail || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO users (name, gmail, password) VALUES (?, ?, ?)`,
    [name, gmail, password],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "User already exists" });
      }

      res.json({
        message: "User created successfully",
        userId: this.lastID
      });
    }
  );
});

// ===============================
// ✅ LOGIN API (Better Version)
// ===============================
app.post("/login", (req, res) => {
  const { gmail, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE gmail = ? AND password = ?`,
    [gmail, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }

      if (!row) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful", user: row });
    }
  );
});

// ===============================
// 🚀 START SERVER
// ===============================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});