import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
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
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-green-900/20"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
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
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">IJ</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text">
              iJuewa
            </span>
          </div>
        </motion.div>

        {/* Left section - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl md:rounded-r-none p-8 shadow-lg"
        >
          {/* Logo/Brand - visible on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-2 mb-8"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">IJ</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text">
              iJuewa
            </span>
          </motion.div>

          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-gray-400">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                  <MdOutlineMail />
                </div>
                <input
                  type="email"
                  className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>
            </motion.div>

            {/* Username Field */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  placeholder="Choose a username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                  required
                />
              </div>
            </motion.div>

            {/* Full Name Field */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                  <MdDriveFileRenameOutline />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
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
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                  <MdPassword />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  placeholder="Create a password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-purple-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineRemoveRedEye />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-green-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isPending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </motion.div>

            {isError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-900/50 text-red-300 rounded-lg text-sm"
              >
                {error.message}
              </motion.div>
            )}

            {/* Login link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-2 text-gray-400"
            >
              <p>Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Right section - Illustration/Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-900/40 to-green-900/40 backdrop-blur-sm border border-gray-800 rounded-xl rounded-l-none items-center justify-center p-8 relative overflow-hidden"
        >
          {/* Abstract shapes and elements */}
          <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 -top-20 -right-20"></div>
          <div className="absolute w-48 h-48 rounded-full bg-green-600/20 -bottom-10 -left-10"></div>
          
          {/* SVG Illustration */}
          <div className="relative z-10 w-full max-w-md">
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              {/* Background elements */}
              <circle cx="250" cy="200" r="120" fill="rgba(139, 92, 246, 0.1)" />
              <circle cx="250" cy="200" r="80" fill="rgba(16, 185, 129, 0.1)" />
              
              {/* Grid lines */}
              <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
                {[...Array(10)].map((_, i) => (
                  <line key={`h-${i}`} x1="50" y1={100 + i * 20} x2="450" y2={100 + i * 20} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line key={`v-${i}`} x1={150 + i * 20} y1="50" x2={150 + i * 20} y2="350" />
                ))}
              </g>

              {/* Decorative elements */}
              <path d="M150,150 Q250,50 350,150 T550,150" stroke="rgba(139, 92, 246, 0.6)" fill="none" strokeWidth="2" />
              <path d="M150,250 Q250,350 350,250 T550,250" stroke="rgba(16, 185, 129, 0.6)" fill="none" strokeWidth="2" />

              {/* Abstract user profile */}
              <circle cx="250" cy="180" r="40" fill="rgba(88, 80, 236, 0.5)" />
              <circle cx="250" cy="160" r="15" fill="rgba(255, 255, 255, 0.8)" />
              <path d="M215,210 Q250,240 285,210" stroke="rgba(255, 255, 255, 0.8)" fill="none" strokeWidth="3" />
              
              {/* Connected nodes representing community */}
              <circle cx="180" cy="280" r="15" fill="rgba(139, 92, 246, 0.6)" />
              <circle cx="320" cy="280" r="15" fill="rgba(16, 185, 129, 0.6)" />
              <circle cx="220" cy="240" r="10" fill="rgba(255, 255, 255, 0.4)" />
              <circle cx="280" cy="240" r="10" fill="rgba(255, 255, 255, 0.4)" />
              
              <line x1="180" y1="280" x2="220" y2="240" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              <line x1="220" y1="240" x2="250" y2="200" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              <line x1="250" y1="200" x2="280" y2="240" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              <line x1="280" y1="240" x2="320" y2="280" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              
              {/* Floating icons/elements */}
              <g transform="translate(150, 120)">
                <rect width="25" height="25" rx="5" fill="rgba(139, 92, 246, 0.5)" />
                <line x1="7" y1="12.5" x2="18" y2="12.5" stroke="white" strokeWidth="2" />
                <line x1="12.5" y1="7" x2="12.5" y2="18" stroke="white" strokeWidth="2" />
              </g>
              
              <g transform="translate(350, 150)">
                <circle cx="12.5" cy="12.5" r="12.5" fill="rgba(16, 185, 129, 0.5)" />
                <polyline points="7,12.5 11,16.5 18,9" stroke="white" fill="none" strokeWidth="2" />
              </g>
              
              <g transform="translate(320, 120)">
                <polygon points="0,0 25,0 12.5,25" fill="rgba(245, 158, 11, 0.5)" />
                <line x1="12.5" y1="5" x2="12.5" y2="15" stroke="white" strokeWidth="2" />
                <circle cx="12.5" cy="19" r="1" fill="white" />
              </g>
            </svg>

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text mb-4">
                Join Our Network
              </h2>
              <p className="text-white/70 text-lg max-w-xs">
                Connect, collaborate, and create with like-minded individuals in our growing community
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;