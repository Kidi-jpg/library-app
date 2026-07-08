const pool = require("../config/db"); 

const BookModel = {
  // 1. Get all books
  getAll: async () => {
    const result = await pool.query("SELECT * FROM books ORDER BY id DESC");
    return result.rows;
  },

  // 2. Create a new book
  create: async (title, author, isbn) => {
    const result = await pool.query(
      "INSERT INTO books (title, author, isbn) VALUES ($1, $2, $3) RETURNING *",
      [title, author, isbn]
    );
    return result.rows[0];
  },

  // 3. Delete a book by ID
  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0]; 
  }
};

module.exports = BookModel;