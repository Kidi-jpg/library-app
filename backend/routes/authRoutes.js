const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// POST route for registering a new user
router.post("/register", AuthController.register);
// POST route for logging in an existing user
router.post("/login", AuthController.login);

module.exports = router;