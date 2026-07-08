const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Grab the token from the HTTP Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token using your secret key fallback
    const verified = jwt.verify(token, process.env.JWT_SECRET || "fallback_super_secret_key_123");
    req.user = verified; // Attach user details (id, role) to the request object
    next(); // Move forward to the controller!
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;