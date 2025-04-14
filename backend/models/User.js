const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0.0 },
  currency: { type: String, default: "NGN" },
  authorizationCode: { type: String }, // For recurring charges
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);