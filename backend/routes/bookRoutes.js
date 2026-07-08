const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const verifyToken = require("../middleware/authMiddleware"); // Import our guard!

// Endpoint to get all books (Now protected!)
router.get("/", verifyToken, BookController.getBooks);

// Endpoint to add a book (Now protected!)
router.post("/", verifyToken, BookController.addBook);

module.exports = router;