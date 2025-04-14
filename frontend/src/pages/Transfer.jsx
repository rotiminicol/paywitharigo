import { useState, useEffect, useContext } from "react";
import { AlertTriangle, ArrowRight, CheckCircle, ChevronDown, CreditCard, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // Adjust based on your auth setup

// Nigerian banks data (fetch from backend /api/banks in production)
const NIGERIAN_BANKS = [
  { id: 1, name: "Access Bank", code: "044" },
  { id: 2, name: "First Bank", code: "011" },
  { id: 3, name: "GTBank", code: "058" },
  { id: 4, name: "UBA", code: "033" },
  { id: 5, name: "Zenith Bank", code: "057" },
  { id: 6, name: "Kuda Bank", code: "090267" },
  { id: 7, name: "Moniepoint", code: "50515" },
  { id: 8, name: "Palmpay", code: "100033" },
  { id: 9, name: "Sterling Bank", code: "232" },
  { id: 10, name: "Wema Bank", code: "035" },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const Transfer = () => {
  const { user } = useContext(AuthContext) || {
    user: { balance: 250000, email: "" },
  };
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(user.balance);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Fetch recent transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setRecentTransactions(data.slice(0, 3)); // Limit to 3 for sidebar
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Verify account number (Paystack API)
  const verifyAccount = async () => {
    if (!selectedBank || accountNumber.length !== 10) return;

    setVerifying(true);
    try {
      const response = await fetch(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank.code}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.status && data.data.account_name) {
        setAccountName(data.data.account_name);
      } else {
        setTransferError("Unable to verify account. Please check details.");
      }
    } catch (error) {
      setTransferError("Account verification failed.");
      console.error("Verification error:", error);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      verifyAccount();
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  // Handle transfer (Paystack API)
  const handleTransfer = async () => {
    if (!selectedBank || !accountNumber || !accountName || !amount || parseFloat(amount) <= 0) {
      setTransferError("Please fill all required fields correctly");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setTransferError("Insufficient funds");
      return;
    }

    setLoading(true);
    setTransferError(null);

    try {
      // Step 1: Create recipient
      const recipientResponse = await fetch("/api/transfers/recipient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: accountName,
          accountNumber,
          bankCode: selectedBank.code,
        }),
      });
      const { recipientCode } = await recipientResponse.json();

      // Step 2: Initiate transfer
      const transferResponse = await fetch("/api/transfers/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          recipientCode,
          reason: narration || "Bank transfer",
        }),
      });
      const transferData = await transferResponse.json();

      if (transferData.status === "success") {
        setAvailableBalance((prev) => prev - parseFloat(amount));
        setTransferSuccess(true);
        setTimeout(() => {
          setSelectedBank(null);
          setAccountNumber("");
          setAccountName("");
          setAmount("");
          setNarration("");
          setTransferSuccess(false);
        }, 3000);
      } else {
        setTransferError("Transfer failed. Please try again.");
      }
    } catch (error) {
      setTransferError("An error occurred during transfer.");
      console.error("Transfer error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold tracking-tight"
          >
            Transfer Funds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-blue-100"
          >
            Send money securely to any Nigerian bank account
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Transfer Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Transfer Details</h2>

            {transferSuccess && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center mb-6"
              >
                <CheckCircle className="text-emerald-500 mr-3" size={24} />
                <div>
                  <p className="font-medium text-emerald-800">Transfer Successful!</p>
                  <p className="text-emerald-600 text-sm">
                    Sent {formatCurrency(amount)} to {accountName}.
                  </p>
                </div>
              </motion.div>
            )}

            {transferError && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-6"
              >
                <AlertTriangle className="text-red-500 mr-3" size={24} />
                <p className="text-red-700">{transferError}</p>
              </motion.div>
            )}

            {/* Bank Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Bank</label>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setBankDropdownOpen(!bankDropdownOpen)}
                >
                  <span className={selectedBank ? "text-gray-800" : "text-gray-400"}>
                    {selectedBank ? selectedBank.name : "Select a bank"}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.button>
                {bankDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto"
                  >
                    {NIGERIAN_BANKS.map((bank) => (
                      <motion.div
                        key={bank.id}
                        whileHover={{ backgroundColor: "#EFF6FF" }}
                        className="px-4 py-3 cursor-pointer text-gray-800 hover:text-blue-600"
                        onClick={() => {
                          setSelectedBank(bank);
                          setBankDropdownOpen(false);
                        }}
                      >
                        {bank.name}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Account Number</label>
              <input
                type="text"
                maxLength={10}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter 10-digit account number"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setAccountNumber(value);
                  }
                }}
              />
            </div>

            {/* Account Name */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Account Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-600"
                  value={accountName}
                  readOnly
                  placeholder={verifying ? "Verifying..." : "Account name will appear here"}
                />
                {verifying && (
                  <Loader className="absolute right-4 top-3 h-5 w-5 text-blue-500 animate-spin" />
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">₦</span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Available: <span className="font-medium text-blue-600">{formatCurrency(availableBalance)}</span>
              </p>
            </div>

            {/* Narration */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">Narration (Optional)</label>
              <textarea
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's this transfer for?"
                rows={3}
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>

            {/* Transfer Button */}
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#DB2777" }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleTransfer}
              disabled={loading || !selectedBank || !accountNumber || !accountName || !amount}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-3 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  Send Money
                  <ArrowRight className="ml-3 h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/3 space-y-8"
          >
            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Transfers</h3>
              {recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{tx.to || tx.from}</p>
                          <p className="text-sm text-gray-500">{tx.bank || "N/A"}</p>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            tx.status === "completed" ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {tx.status === "completed" ? "Success" : "Failed"}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="font-semibold text-blue-600">{formatCurrency(tx.amount)}</p>
                        <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent transfers</p>
              )}
            </div>

            {/* Transfer Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Always verify account details before sending.",
                  "Transfers are processed instantly within Nigeria.",
                  "Save frequent recipients for quick access.",
                ].map((tip, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                Need Assistance?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our team is here 24/7 to help with your transfers.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-blue-600 font-medium text-sm hover:text-blue-800"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;