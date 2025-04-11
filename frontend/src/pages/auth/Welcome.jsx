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

  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      const userId = "mock-user-id-123";
      const accountNumber = generateAccountNumber();
      const res = await fetch("/api/account/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, accountNumber, ...data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to complete setup");
      return result;
    },
    onSuccess: () => {
      toast.success("Account setup completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/dashboard");
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
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex items-center justify-center p-4 font-sans">
      {/* Subtle Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-80"></div>
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2zM6 34v4h4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4H6zM6 4v4h4v4h2v-4h4v-2h-4v-4H6v2h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-5xl w-full relative z-10 flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-xl">
        {/* Left Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 mb-8"
          >
            <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
              <DollarSign size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-900">Arigo Pay</span>
          </motion.div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Arigo Pay</h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <Lock size={16} className="text-blue-600" />
              Securely complete your profile to activate your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 opacity-60">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  aria-label="Phone Number"
                />
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 opacity-60">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  aria-label="Date of Birth"
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 opacity-60">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  aria-label="Address"
                />
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 opacity-60">
                  <User size={18} />
                </div>
                <select
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  aria-label="Gender"
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
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02, backgroundColor: "#2563EB" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg transition-all flex items-center justify-center shadow-sm disabled:opacity-50"
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
                className="p-3 bg-red-50 text-red-700 rounded-lg text-sm"
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
          transition={{ duration: 0.5 }}
          className="hidden md:flex md:w-1/2 bg-blue-50 rounded-r-2xl items-center justify-center p-10 relative overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md"
          >
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              {/* Background Circle */}
              <circle cx="200" cy="150" r="100" fill="rgba(59, 130, 246, 0.1)" />

              {/* Card Shape */}
              <rect x="100" y="80" width="200" height="100" rx="10" fill="#1E3A8A" />
              <rect x="110" y="90" width="180" height="15" rx="3" fill="rgba(255, 255, 255, 0.3)" />
              <rect x="110" y="115" width="120" height="10" rx="3" fill="rgba(255, 255, 255, 0.2)" />
              <circle cx="270" cy="140" r="8" fill="#60A5FA" />

              {/* Floating Elements */}
              <motion.circle
                cx="120"
                cy="220"
                r="10"
                fill="#60A5FA"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="280"
                cy="220"
                r="10"
                fill="#FBBF24"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <path
                d="M120 220 L280 220"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Start Banking Smarter</h2>
              <p className="text-gray-600 text-base max-w-xs">
                Securely set up your account with Arigo Pay for a seamless financial experience.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

     
    </div>
  );
};

export default WelcomePage;