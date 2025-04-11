import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ChevronRight } from "lucide-react";
import { DollarSign } from "lucide-react";

const VerificationPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [stage, setStage] = useState("email"); // email -> code -> success

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97 },
    disabled: { opacity: 0.7, scale: 1 },
  };

  // Timer for code resend cooldown
  useEffect(() => {
    let timer;
    if (isCodeSent && timeLeft > 0 && !canResend) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isCodeSent, canResend]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address" });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsCodeSent(true);
      setStage("code");
      setFeedback({ type: "success", message: "Verification code sent to your email!" });
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to send code. Please try again." });
    }
    setLoading(false);
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    if (!canResend) return;

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFeedback({ type: "success", message: "New code sent!" });
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to resend code. Please try again." });
    }
    setLoading(false);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setFeedback({ type: "error", message: "Please enter the complete 6-digit code" });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setFeedback({ type: "success", message: "Verification successful!" });
      setStage("success");
    } catch (error) {
      setFeedback({ type: "error", message: "Invalid code. Please try again." });
    }
    setLoading(false);
  };

  const handleCodeChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split("").slice(0, 6);
      const newCode = [...code];

      digits.forEach((digit, index) => {
        if (index < 6) newCode[index] = digit;
      });

      setCode(newCode);

      const nextEmptyIndex = newCode.findIndex((c) => c === "");
      if (nextEmptyIndex !== -1) {
        const nextInput = document.getElementById(`code-input-${nextEmptyIndex}`);
        if (nextInput) nextInput.focus();
      } else {
        const lastInput = document.getElementById("code-input-5");
        if (lastInput) lastInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex items-center justify-center p-4">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white"></div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col md:flex-row rounded-xl overflow-hidden">
        {/* Left Section - Verification Form */}
        <AnimatePresence mode="wait">
          {stage === "email" && (
            <motion.div
              key="email-form"
              className="w-full md:w-1/2 bg-white border border-blue-100 rounded-xl md:rounded-r-none p-8 shadow-lg max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Identity
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mb-6">
                <Lock size={16} className="text-blue-600" />
                Enter your email to receive a secure verification code
              </p>

              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md mb-4 text-sm ${
                    feedback.type === "error"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-600">
                    We’ll send a 6-digit code to this email
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover={loading ? "" : "hover"}
                  whileTap={loading ? "" : "tap"}
                  animate={loading ? "disabled" : ""}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading ? "Sending..." : "Send Verification Code"}
                </motion.button>
              </form>
            </motion.div>
          )}

          {stage === "code" && (
            <motion.div
              key="code-form"
              className="w-full md:w-1/2 bg-white border border-blue-100 rounded-xl md:rounded-r-none p-8 shadow-lg max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Verification Code
              </h1>
              <p className="text-gray-600 mb-6">
                We’ve sent a 6-digit code to{" "}
                <span className="font-medium text-blue-600">{email}</span>
              </p>

              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md mb-4 text-sm ${
                    feedback.type === "error"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}

              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    6-Digit Code
                  </label>
                  <div className="flex gap-2 justify-between mb-2" onPaste={handlePaste}>
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        className="w-full h-14 bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg text-xl font-bold text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                        disabled={loading}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    The code expires in 5 minutes
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover={loading ? "" : "hover"}
                  whileTap={loading ? "" : "tap"}
                  animate={loading ? "disabled" : ""}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading ? "Verifying..." : "Verify Code"}
                </motion.button>

                <div className="text-center pt-1">
                  <p className="text-sm text-gray-600">
                    Didn’t receive a code?{" "}
                    {canResend ? (
                      <button
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                      >
                        Resend
                      </button>
                    ) : (
                      <span className="text-gray-500">Resend in {timeLeft}s</span>
                    )}
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success-screen"
              className="w-full md:w-1/2 bg-white border border-blue-100 rounded-xl md:rounded-r-none p-8 shadow-lg max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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

              <div className="flex justify-center mb-6">
                <motion.div
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Verification Successful!
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  Your Arigo Pay account is now verified and ready to use.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
                  onClick={() => navigate("/dashboard")}
                >
                  Continue to Dashboard
                  <ChevronRight size={20} className="ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Section - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl rounded-l-none items-center justify-center p-8 relative overflow-hidden"
        >
          {/* Abstract shapes */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 rounded-full bg-blue-200/30 -top-20 -right-20"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-48 h-48 rounded-full bg-blue-300/30 -bottom-10 -left-10"
          ></motion.div>

          {/* SVG Illustration - Banking Theme */}
          <div className="relative z-10 w-full max-w-md">
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="200" r="120" fill="rgba(59, 130, 246, 0.1)" />
              <circle cx="250" cy="200" r="80" fill="rgba(147, 197, 253, 0.1)" />
              <motion.rect
                x="150"
                y="120"
                width="200"
                height="120"
                rx="15"
                fill="rgba(59, 130, 246, 0.3)"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <rect x="160" y="130" width="180" height="20" rx="5" fill="rgba(255, 255, 255, 0.5)" />
              <rect x="160" y="160" width="120" height="15" rx="5" fill="rgba(255, 255, 255, 0.3)" />
              <circle cx="320" cy="190" r="10" fill="rgba(147, 197, 253, 0.5)" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                Secure Banking Starts Here
              </h2>
              <p className="text-gray-600 text-lg max-w-xs">
                Verify your identity to unlock the full power of Arigo Pay.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationPage;