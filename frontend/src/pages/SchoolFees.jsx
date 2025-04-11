import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DollarSign, CreditCard, Loader2, CheckCircle } from "lucide-react";

// Paystack API setup (replace with your secret key)
const PAYSTACK_API_BASE = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = "sk_test_your_paystack_secret_key"; // Replace with your Paystack secret key

const initializePayment = async ({ email, amount }) => {
  const res = await fetch(`${PAYSTACK_API_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      currency: "NGN",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to initialize payment");
  return data.data;
};

const SchoolFees = () => {
  const [stage, setStage] = useState("form"); // form -> confirmation -> success
  const [formData, setFormData] = useState({
    schoolType: "",
    institution: "",
    studentId: "",
    amount: "",
    email: "",
  });
  const [paymentDetails, setPaymentDetails] = useState(null);

  const paymentMutation = useMutation({
    mutationFn: initializePayment,
    onSuccess: (data) => {
      setPaymentDetails(data);
      setStage("success");
      toast.success(`Payment of ₦${formData.amount} initiated for ${formData.institution}`);
      // In production, redirect to data.authorization_url for Paystack checkout
      window.location.href = data.authorization_url;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.email || !formData.institution || !formData.studentId) {
      toast.error("Please fill all required fields.");
      return;
    }
    setStage("confirmation");
  };

  const confirmPayment = () => {
    paymentMutation.mutate({
      email: formData.email,
      amount: parseFloat(formData.amount),
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

  // Nigerian school fee structure (approximate ranges)
  const feeStructure = {
    primary: {
      public: "₦5,000 - ₦20,000 per term",
      private: "₦50,000 - ₦500,000 per term",
    },
    secondary: {
      public: "₦10,000 - ₦50,000 per term",
      private: "₦100,000 - ₦3,000,000 per term",
    },
    tertiary: {
      public: "₦30,000 - ₦200,000 per session",
      private: "₦300,000 - ₦2,000,000 per session",
    },
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
                Pay School Fees
              </h1>
              <p className="text-gray-600 mb-6">
                Securely pay fees for any Nigerian school.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    School Type
                  </label>
                  <select
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Select school type</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                  </select>
                  {formData.schoolType && (
                    <p className="mt-1 text-xs text-gray-600">
                      Typical Fees: {feeStructure[formData.schoolType].public} (Public),{" "}
                      {feeStructure[formData.schoolType].private} (Private)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="e.g., Lagos State University"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="Enter student ID"
                    required
                  />
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={paymentMutation.isPending}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
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
                Confirm Payment
              </h1>
              <p className="text-gray-600 mb-6">
                Review the details before completing the payment.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">
                  <span className="font-medium">School Type:</span> {formData.schoolType}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Institution:</span> {formData.institution}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Student ID:</span> {formData.studentId}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Amount:</span> ₦{formData.amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {formData.email}
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
                  onClick={confirmPayment}
                  disabled={paymentMutation.isPending}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                >
                  {paymentMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="w-5 h-5 mr-2" />
                  )}
                  Confirm Payment
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
                  Payment Successful!
                </h1>
                <p className="text-gray-600 text-center mb-6">
                  Your payment of ₦{formData.amount} to {formData.institution} has been initiated.
                </p>
                <p className="text-gray-600 text-center mb-6">
                  Reference: {paymentDetails?.reference}
                </p>
              </motion.div>

              <motion.button
                onClick={() => setStage("form")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md"
              >
                Pay Another Fee
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SchoolFees;