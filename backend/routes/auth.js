const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Generate unique account number (simplified)
    const accountNumber = `ACC${Date.now()}${Math.floor(Math.random() * 1000)}`;

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      accountNumber,
      balance: 0.0, // New users start with 0.00
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { id: user._id, name, email, accountNumber, balance: user.balance } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { id: user._id, name: user.name, email, accountNumber: user.accountNumber, balance: user.balance } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;