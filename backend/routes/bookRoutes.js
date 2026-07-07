const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public route: Anyone can see available books
router.get("/", BookController.getAllBooks);

// Protected Admin routes: Must be logged in AND an admin to perform CRUD modifications
router.post("/", verifyToken, isAdmin, BookController.createBook);
router.put("/:id", verifyToken, isAdmin, BookController.updateBook);
router.delete("/:id", verifyToken, isAdmin, BookController.deleteBook);

module.exports = router;