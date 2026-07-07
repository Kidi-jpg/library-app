const express = require("express");
const router = express.Router();
const BorrowController = require("../controllers/borrowController");
const { verifyToken } = require("../middleware/authMiddleware");

// All borrowing actions require a valid login token
router.post("/checkout", verifyToken, BorrowController.borrowBook);
router.post("/return", verifyToken, BorrowController.returnBook);
router.get("/history", verifyToken, BorrowController.getMyBorrowings);

module.exports = router;