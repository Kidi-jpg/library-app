const pool = require("../config/db");

const BorrowModel = {
  // Create a borrowing transaction record
  borrowBook: async (userId, bookId, dueDate) => {
    // We use a transaction or sequential queries to reduce available copies and insert the record
    await pool.query("BEGIN");
    try {
      // 1. Decrement available copies
      await pool.query(
        "UPDATE books SET available_copies = available_copies - 1 WHERE id = $1",
        [bookId]
      );

      // 2. Insert borrowing record
      const query = `
        INSERT INTO borrowings (user_id, book_id, due_date)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [userId, bookId, dueDate]);
      
      await pool.query("COMMIT");
      return rows[0];
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  },

  // Return a book (mark record as returned and increment available copies)
  returnBook: async (borrowingId, bookId) => {
    await pool.query("BEGIN");
    try {
      // 1. Update status to returned
      const query = `
        UPDATE borrowings
        SET status = 'returned'
        WHERE id = $1 AND status = 'active'
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [borrowingId]);

      if (rows.length === 0) {
        await pool.query("ROLLBACK");
        return null; // Record wasn't active or doesn't exist
      }

      // 2. Increment available copies
      await pool.query(
        "UPDATE books SET available_copies = available_copies + 1 WHERE id = $1",
        [bookId]
      );

      await pool.query("COMMIT");
      return rows[0];
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  },

  // Get all active borrowings for a specific user
  findUserBorrowings: async (userId) => {
    const query = `
      SELECT b.id AS borrowing_id, bk.title, bk.author, b.borrow_date, b.due_date, b.status 
      FROM borrowings b
      JOIN books bk ON b.book_id = bk.id
      WHERE b.user_id = $1
      ORDER BY b.borrow_date DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
};

module.exports = BorrowModel;