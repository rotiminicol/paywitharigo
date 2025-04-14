const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Initialize transaction (e.g., Add Money)
router.post("/initialize", auth, async (req, res) => {
  const { amount, email } = req.body; // Email optional, defaults to user.email
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email || user.email,
        amount: amount * 100, // Convert to kobo
        currency: "NGN",
        callback_url: "http://localhost:3000/verify-payment", // Adjust for your frontend
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url, access_code, reference } = response.data.data;

    // Save pending transaction
    const transaction = new Transaction({
      userId: user._id,
      type: "credit",
      amount,
      from: "Paystack Funding",
      date: new Date(),
      status: "pending",
      reference,
    });
    await transaction.save();

    res.json({ authorization_url, access_code, reference });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

// Verify transaction (e.g., after payment)
router.get("/verify/:reference", auth, async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, amount, authorization } = response.data.data;
    if (status !== "success") {
      return res.status(400).json({ error: "Transaction not successful" });
    }

    const transaction = await Transaction.findOne({ reference });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.status === "completed") {
      return res.json({ message: "Transaction already processed" });
    }

    // Update transaction
    transaction.status = "completed";
    await transaction.save();

    // Update user balance
    const user = await User.findById(transaction.userId);
    user.balance += amount / 100; // Convert kobo to naira
    if (authorization && authorization.reusable) {
      user.authorizationCode = authorization.authorization_code; // Save for future debits
    }
    await user.save();

    res.json({ message: "Transaction verified", transaction });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

// Fetch user transactions
router.get("/", auth, async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const total = await Transaction.countDocuments({ userId: req.user.id });
    res.json({ transactions, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Charge authorization (e.g., debit for payments)
router.post("/charge", auth, async (req, res) => {
  const { amount, to } = req.body; // 'to' is the recipient (e.g., Netflix)
  try {
    const user = await User.findById(req.user.id);
    if (!user.authorizationCode) {
      return res.status(400).json({ error: "No saved card found" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/charge_authorization",
      {
        email: user.email,
        amount: amount * 100, // Convert to kobo
        authorization_code: user.authorizationCode,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { status, reference } = response.data.data;
    if (status !== "success") {
      return res.status(400).json({ error: "Charge failed" });
    }

    // Save transaction
    const transaction = new Transaction({
      userId: user._id,
      type: "debit",
      amount,
      to,
      date: new Date(),
      status: "completed",
      reference,
    });
    await transaction.save();

    // Update balance
    user.balance -= amount;
    await user.save();

    res.json({ message: "Charge successful", transaction });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

module.exports = router;