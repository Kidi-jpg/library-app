const BookModel = require("../models/bookModel");

const BookController = {
  // Fetch all books
  getBooks: async (req, res) => {
    try {
      const books = await BookModel.getAll();
      res.status(200).json(books);
    } catch (error) {
      console.error("Fetch Books Error:", error);
      res.status(500).json({ message: "Server error while fetching books" });
    }
  },

  // Add a new book
  addBook: async (req, res) => {
    try {
      const { title, author, isbn } = req.body;
      if (!title || !author) {
        return res.status(400).json({ message: "Title and Author are required" });
      }
      const newBook = await BookModel.create(title, author, isbn);
      res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
      console.error("Add Book Error:", error);
      res.status(500).json({ message: "Server error while adding book" });
    }
  },

  // Delete an existing book
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedBook = await BookModel.delete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book deleted successfully!", book: deletedBook });
    } catch (error) {
      console.error("Delete Book Error:", error);
      res.status(500).json({ message: "Server error while deleting book" });
    }
  }
};

module.exports = BookController;