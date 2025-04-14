const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  from: { type: String },
  to: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  reference: { type: String, unique: true }, // Paystack transaction reference
});

module.exports = mongoose.model("Transaction", transactionSchema);