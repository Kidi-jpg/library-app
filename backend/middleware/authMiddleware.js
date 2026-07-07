const jwt = require("jsonwebtoken");

const authMiddleware = {
  // 1. Verify if the user is logged in at all
  verifyToken: (req, res, next) => {
    // Extract token from Authorization header (Format: "Bearer <token>")
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      // Decode and verify token using our hidden secret key
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attaches user id and role to the request object
      next(); // Pass control to the next function (controller)
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token." });
    }
  },

  // 2. Strict check to see if the logged-in user is an Admin
  isAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden. Admin access required." });
    }
    next();
  }
};

module.exports = authMiddleware;