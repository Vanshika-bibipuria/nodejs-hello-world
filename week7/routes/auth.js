const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

// Dummy user
const user = {
  id: 1,
  username: "vanshika",
  password: "password123", // In real life, store hashed passwords!
};

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authorized.` });
});

module.exports = router;
