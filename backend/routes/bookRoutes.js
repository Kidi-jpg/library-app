const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const verifyToken = require("../middleware/authMiddleware");

// Secure Endpoints
router.get("/", verifyToken, BookController.getBooks);
router.post("/", verifyToken, BookController.addBook);
router.delete("/:id", verifyToken, BookController.deleteBook); // Dynamic parameter ':id'

module.exports = router;