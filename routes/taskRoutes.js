const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔥 Create Task table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId TEXT,
    taskName TEXT,
    assignTo TEXT,
    priority TEXT,
    status TEXT,
    dueDate TEXT
  )
`);

/* =========================
   GET ALL TASKS
========================= */
router.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/* =========================
   ADD TASK
========================= */
router.post("/tasks", (req, res) => {
  const { taskId, taskName, assignTo, priority, status, dueDate } = req.body;

  const sql = `
    INSERT INTO tasks (taskId, taskName, assignTo, priority, status, dueDate)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [taskId, taskName, assignTo, priority, status, dueDate],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Task added successfully",
        id: this.lastID
      });
    }
  );
});

/* =========================
   DELETE TASK
========================= */
router.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;