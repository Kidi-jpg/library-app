const pool = require("../config/db");

const BookModel = {
  // Create a new book
  create: async (title, author, isbn, genre, available_copies) => {
    const query = `
      INSERT INTO books (title, author, isbn, genre, available_copies)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, author, isbn, genre, available_copies]);
    return rows[0];
  },

  // Get all books
  findAll: async () => {
    const query = `SELECT * FROM books ORDER BY id DESC;`;
    const { rows } = await pool.query(query);
    return rows;
  },

  // Find a specific book by ID
  findById: async (id) => {
    const query = `SELECT * FROM books WHERE id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Update book details
  update: async (id, title, author, isbn, genre, available_copies) => {
    const query = `
      UPDATE books
      SET title = $1, author = $2, isbn = $3, genre = $4, available_copies = $5
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, author, isbn, genre, available_copies, id]);
    return rows[0];
  },

  // Delete a book
  delete: async (id) => {
    const query = `DELETE FROM books WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = BookModel;