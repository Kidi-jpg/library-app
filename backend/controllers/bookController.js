const BookModel = require("../models/bookModel");

const BookController = {
  // 1. Fetch all books from the database
  getBooks: async (req, res) => {
    try {
      const books = await BookModel.getAll();
      res.status(200).json(books);
    } catch (error) {
      console.error("Fetch Books Error:", error);
      res.status(500).json({ message: "Server error while fetching books" });
    }
  },

  // 2. Add a new book to the database
  addBook: async (req, res) => {
    try {
      const { title, author, isbn } = req.body;

      // Simple Validation
      if (!title || !author) {
        return res.status(400).json({ message: "Title and Author are required" });
      }

      const newBook = await BookModel.create(title, author, isbn);
      res.status(201).json({
        message: "Book added successfully!",
        book: newBook
      });
    } catch (error) {
      console.error("Add Book Error:", error);
      res.status(500).json({ message: "Server error while adding book" });
    }
  }
};

module.exports = BookController;