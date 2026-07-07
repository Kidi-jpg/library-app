const BookModel = require("../models/bookModel");

const BookController = {
  createBook: async (req, res) => {
    try {
      const { title, author, isbn, genre, available_copies } = req.body;
      if (!title || !author || !isbn) {
        return res.status(400).json({ message: "Title, author, and ISBN are required." });
      }
      const newBook = await BookModel.create(title, author, isbn, genre, available_copies || 1);
      res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while adding book." });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await BookModel.findAll();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while fetching books." });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, isbn, genre, available_copies } = req.body;
      const updatedBook = await BookModel.update(id, title, author, isbn, genre, available_copies);
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found." });
      }
      res.status(200).json({ message: "Book updated successfully!", book: updatedBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while updating book." });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await BookModel.delete(id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found." });
      }
      res.status(200).json({ message: "Book deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while deleting book." });
    }
  }
};

module.exports = BookController;