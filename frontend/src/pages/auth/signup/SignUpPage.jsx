import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, DollarSign, Eye, EyeOff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import IjeuwaLogo from "/ijuewa.png";
=======
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, fullName, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to create account. Please try again.");
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
        {/* Logo/Brand - visible only on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 md:hidden"
        >
          <div className="flex items-center space-x-2">
<<<<<<< HEAD
          <img src={IjeuwaLogo} alt="iJeuwa Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text">
              iJeuwa
=======
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
            >
              <DollarSign size={20} className="text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              Arigo Pay
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            </span>
          </div>
        </motion.div>

        {/* Left section - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-white border border-blue-100 rounded-xl md:rounded-r-none p-8 shadow-lg max-w-md mx-auto md:mx-0"
        >
          {/* Logo/Brand - visible on desktop */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-2 mb-8"
          >
<<<<<<< HEAD
            <img src={IjeuwaLogo} alt="iJeuwa Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text">
              iJeuwa
=======
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
            >
              <DollarSign size={20} className="text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              Arigo Pay
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            </span>
          </motion.div>

          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Open Your Account</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Lock size={16} className="text-blue-600" />
              Securely join Arigo Pay today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>
            </motion.div>

            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  placeholder="Enter your full name"
                  name="fullName"
                  onChange={handleInputChange}
                  value={formData.fullName}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  placeholder="Create a password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
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
                    Creating account...
                  </span>
                ) : (
                  "Open Account"
                )}
              </motion.button>
            </motion.div>

            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              >
                {error.message}
              </motion.div>
            )}

            {/* Login link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-2 text-gray-600 text-center"
            >
              <p>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Right section - Illustration */}
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text mb-4">
                Start Banking Smarter
              </h2>
              <p className="text-gray-600 text-lg max-w-xs">
                Open an account with Arigo Pay for seamless payments, savings, and more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;