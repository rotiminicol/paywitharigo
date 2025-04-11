import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DollarSign, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Paystack API base URL and secret key (replace with your own)
const PAYSTACK_API_BASE = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = "sk_test_your_paystack_secret_key"; // Replace with your Paystack secret key

const fetchBanks = async () => {
  const res = await fetch(`${PAYSTACK_API_BASE}/bank?country=nigeria`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch banks");
  return data.data;
};

const resolveAccount = async ({ accountNumber, bankCode }) => {
  const res = await fetch(
    `${PAYSTACK_API_BASE}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
    {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to resolve account");
  return data.data;
};

const initiateTransfer = async ({ recipient, amount, reason }) => {
  const res = await fetch(`${PAYSTACK_API_BASE}/transfer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "balance", // Assumes transfer from Paystack balance
      amount: amount * 100, // Paystack expects amount in kobo
      recipient,
      reason,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to initiate transfer");
  return data.data;
};

const InternationalTransfer = () => {
  const [stage, setStage] = useState("form"); // form -> confirmation -> success
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState({
    bankCode: "",
    accountNumber: "",
    amount: "",
    reason: "",
  });
  const [accountName, setAccountName] = useState("");
  const [transferDetails, setTransferDetails] = useState(null);

  // Fetch banks on mount
  useEffect(() => {
    const loadBanks = async () => {
      try {
        const bankList = await fetchBanks();
        setBanks(bankList);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadBanks();
  }, []);

  // Resolve account mutation
  const resolveAccountMutation = useMutation({
    mutationFn: resolveAccount,
    onSuccess: (data) => {
      setAccountName(data.account_name);
      toast.success("Account verified successfully!");
    },
    onError: (error) => {
      setAccountName("");
      toast.error(error.message);
    },
  });

  // Initiate transfer mutation
  const initiateTransferMutation = useMutation({
    mutationFn: initiateTransfer,
    onSuccess: (data) => {
      setTransferDetails(data);
      setStage("success");
      toast.success(`Debit Alert: ₦${formData.amount} transferred to ${accountName}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "accountNumber" || name === "bankCode") {
      setAccountName("");
      if (formData.bankCode && value.length === 10) {
        resolveAccountMutation.mutate({ accountNumber: value, bankCode: formData.bankCode });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountName) {
      toast.error("Please verify the account details first.");
      return;
    }
    setStage("confirmation");
  };

  const confirmTransfer = () => {
    const recipient = `${formData.bankCode}-${formData.accountNumber}`; // Simplified recipient code; use Paystack recipient API in production
    initiateTransferMutation.mutate({
      recipient,
      amount: parseFloat(formData.amount),
      reason: formData.reason || "International Transfer",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97 },
    disabled: { opacity: 0.7, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-lg bg-white border border-blue-200 rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center space-x-2 mb-6">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
          >
            <DollarSign size={20} className="text-white" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Arigo Pay
          </span>
        </div>

        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                International Transfer
              </h1>
              <p className="text-gray-600 mb-6">
                Send money securely to any Nigerian bank account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recipient Bank
                  </label>
                  <select
                    name="bankCode"
                    value={formData.bankCode}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Select a bank</option>
                    {banks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    maxLength={10}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="Enter 10-digit account number"
                    required
                  />
                  {accountName && (
                    <p className="mt-1 text-sm text-blue-600">
                      Account Name: {accountName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="Enter amount"
                    min="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reason (Optional)
                  </label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="e.g., Payment for services"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={resolveAccountMutation.isPending || initiateTransferMutation.isPending}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
                >
                  {resolveAccountMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  Proceed to Confirm
                </motion.button>
              </form>
            </motion.div>
          )}

          {stage === "confirmation" && (
            <motion.div
              key="confirmation"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Transfer
              </h1>
              <p className="text-gray-600 mb-6">
                Please review the details below before proceeding.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">
                  <span className="font-medium">Bank:</span>{" "}
                  {banks.find((b) => b.code === formData.bankCode)?.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Account Number:</span> {formData.accountNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Account Name:</span> {accountName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Amount:</span> ₦{formData.amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Reason:</span>{" "}
                  {formData.reason || "International Transfer"}
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setStage("form")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={confirmTransfer}
                  disabled={initiateTransferMutation.isPending}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                >
                  {initiateTransferMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  Confirm Transfer
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Transfer Successful!
                </h1>
                <p className="text-gray-600 text-center mb-6">
                  Your transfer of ₦{formData.amount} to {accountName} has been completed.
                </p>
                <p className="text-gray-600 text-center mb-6">
                  Transfer Code: {transferDetails?.transfer_code}
                </p>
              </motion.div>

              <motion.button
                onClick={() => setStage("form")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md"
              >
                Make Another Transfer
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InternationalTransfer;