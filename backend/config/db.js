const { Pool } = require("pg");

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '2834', // <-- Just the clean password string here! No process.env.
});

// Test the database connection automatically on startup
pool.connect((err, client, release) => {
  if (err) {
    return console.error("[DATABASE] Connection failed:", err.message);
  }
  console.log("[DATABASE] Connected successfully to the database!");
  release();
});

module.exports = pool;