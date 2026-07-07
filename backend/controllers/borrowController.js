const BorrowModel = require("../models/borrowModel");
const BookModel = require("../models/bookModel");

const BorrowController = {
  borrowBook: async (req, res) => {
    try {
      const { bookId } = req.body;
      const userId = req.user.id; // Pulled straight out of our verified JWT token from middleware

      if (!bookId) {
        return res.status(400).json({ message: "Book ID is required." });
      }

      // 1. Check if the book exists and is available
      const book = await BookModel.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }
      if (book.available_copies <= 0) {
        return res.status(400).json({ message: "This book is currently out of stock." });
      }

      // 2. Set default due date to 14 days from now
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      // 3. Process transaction
      const record = await BorrowModel.borrowBook(userId, bookId, dueDate);
      res.status(201).json({ message: "Book borrowed successfully!", transaction: record });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error during checkout process." });
    }
  },

  returnBook: async (req, res) => {
    try {
      const { borrowingId, bookId } = req.body;

      if (!borrowingId || !bookId) {
        return res.status(400).json({ message: "Borrowing ID and Book ID are required." });
      }

      const updatedRecord = await BorrowModel.returnBook(borrowingId, bookId);
      if (!updatedRecord) {
        return res.status(400).json({ message: "Invalid transaction or book already returned." });
      }

      res.status(200).json({ message: "Book returned successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error during return process." });
    }
  },

  getMyBorrowings: async (req, res) => {
    try {
      const userId = req.user.id;
      const history = await BorrowModel.findUserBorrowings(userId);
      res.status(200).json(history);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching history." });
    }
  }
};

module.exports = BorrowController;