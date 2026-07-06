const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const AuthController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // 1. Simple validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // 2. Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      // 3. Hash the password securely (10 salt rounds)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 4. Save user to database via the Model
      const newUser = await UserModel.create(name, email, hashedPassword, role);

      // 5. Send back success response
      res.status(201).json({
        message: "User registered successfully!",
        user: newUser
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  }
};

module.exports = AuthController;