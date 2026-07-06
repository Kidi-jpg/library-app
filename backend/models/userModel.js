const pool = require("../config/db");

const UserModel = {
  // Method to create a new user in the database
  create: async (name, email, hashedPassword, role = "client") => {
    const query = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at;
    `;
    const values = [name, email, hashedPassword, role];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Returns the newly created user (minus the password)
  },

  // Method to find an existing user by email (useful for login later)
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
};

module.exports = UserModel;