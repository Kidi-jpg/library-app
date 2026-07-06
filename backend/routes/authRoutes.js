const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// POST route for registering a new user
router.post("/register", AuthController.register);

module.exports = router;