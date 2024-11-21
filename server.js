const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  const db = new sqlite3.Database("./database.sqlite");

  db.all("SELECT userid FROM users", [], (err, rows) => {
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const ratelimit = require("express-rate-limit");

const limiter = ratelimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
