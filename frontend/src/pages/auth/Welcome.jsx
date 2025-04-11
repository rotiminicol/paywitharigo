import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Lock, Phone, Calendar, MapPin, User, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const WelcomePage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    gender: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Generate a random 10-digit account number (demo purposes)
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      // Mock userId from auth context (replace with actual user data)
      const userId = "mock-user-id-123"; // Replace with auth context or token

      // Simulate account number generation (replace with backend logic)
      const accountNumber = generateAccountNumber();

      // Mock API call to save data
      const res = await fetch("/api/account/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          accountNumber,
          ...data,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to complete setup");
      return result;
    },
    onSuccess: () => {
      toast.success("Account setup completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/dashboard"); // Redirect to dashboard or next step
    },
    onError: () => {
      toast.error("Failed to complete setup. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex items-center justify-center p-4">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white"></div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden">
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
        {/* Logo/Brand - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 md:hidden"
        >
          <div className="flex items-center space-x-2">
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
        </motion.div>

        {/* Left Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-white border border-blue-100 rounded-xl md:rounded-r-none p-8 shadow-lg max-w-md mx-auto md:mx-0"
        >
          {/* Logo/Brand - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-2 mb-8"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
            >
              <DollarSign size={20} className="text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Arigo Pay
            </span>
          </motion.div>

          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Arigo Pay!</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Lock size={16} className="text-blue-600" />
              Complete your profile to activate your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <User size={20} />
                </div>
                <select
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
              >
                {isPending ? (
                  <span className="flex items-center">
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
                    Setting up...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Complete Setup
                    <ChevronRight size={20} className="ml-2" />
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Error Message */}
            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              >
                {error.message}
              </motion.div>
            )}
          </form>
        </motion.div>

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
              {/* Background elements */}
              <circle cx="250" cy="200" r="120" fill="rgba(59, 130, 246, 0.1)" />
              <circle cx="250" cy="200" r="80" fill="rgba(147, 197, 253, 0.1)" />

              {/* Card-like shape */}
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

              {/* Secure nodes */}
              <motion.circle
                cx="180"
                cy="300"
                r="15"
                fill="rgba(59, 130, 246, 0.6)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="320"
                cy="300"
                r="15"
                fill="rgba(147, 197, 253, 0.6)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <line
                x1="180"
                y1="300"
                x2="320"
                y2="300"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
              />

              {/* Floating icons */}
              <motion.g
                transform="translate(150, 80)"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect width="25" height="25" rx="5" fill="rgba(59, 130, 246, 0.5)" />
                <path d="M8,8 L17,17 M17,8 L8,17" stroke="white" strokeWidth="2" />
              </motion.g>
              <motion.g
                transform="translate(320, 80)"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <circle cx="12.5" cy="12.5" r="12.5" fill="rgba(147, 197, 253, 0.5)" />
                <path d="M8,12.5 H17" stroke="white" strokeWidth="2" />
                <path d="M12.5,8 V17" stroke="white" strokeWidth="2" />
              </motion.g>
            </svg>

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                Your Journey Begins
              </h2>
              <p className="text-gray-600 text-lg max-w-xs">
                Set up your account to start banking smarter with Arigo Pay.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;