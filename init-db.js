const sqlite3 = require('sqlite3').verbose();

// Connect to the database (or create it)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid TEXT NOT NULL
  )`);
  console.log('Table created or already exists.');
});

db.close();
