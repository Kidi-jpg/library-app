const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  // --- REGISTRATION ---
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await UserModel.create(name, email, hashedPassword, role);

      res.status(201).json({
        message: "User registered successfully!",
        user: newUser
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  // --- LOGIN ---
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Validation
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // 2. Check if user exists
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // 3. Compare entered password with the hashed password in DB
      // Checks BOTH password_hash and password column names safely
      const databasePassword = user.password_hash || user.password; 
      const isMatch = await bcrypt.compare(password, databasePassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // 4. Generate JWT Token (Expires in 2 hours)
      // Provides a fallback string so it never crashes if process.env.JWT_SECRET is missing
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "fallback_super_secret_key_123",
        { expiresIn: "2h" }
      );

      // 5. Respond with success and token
      res.status(200).json({
        message: "Login successful!",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  }
};

module.exports = AuthController;