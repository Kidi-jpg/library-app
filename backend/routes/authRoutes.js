const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// --- AUTHENTICATION ROUTES ---

// 1. User Registration Route (POST /api/auth/register)
router.post('/register', AuthController.register);

// 2. User Login Route (POST /api/auth/login)
router.post('/login', AuthController.login);

module.exports = router;