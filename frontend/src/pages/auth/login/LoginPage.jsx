import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DollarSign, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import ArigoPayLogo from "/Money.png"; // Assuming you have a logo for Arigo Pay

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex items-center justify-center p-4">
      {/* Background subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      {/* Subtle floating particles */}
=======
    <div className="min-h-screen w-full bg-white text-gray-900 flex items-center justify-center p-4">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white"></div>

      {/* Floating particles for subtle animation */}
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
<<<<<<< HEAD
            className="absolute rounded-full bg-blue-200/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
=======
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center relative z-10 gap-8">
        {/* Left side illustration/visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex md:w-1/2 flex-col items-center md:items-start"
        >
<<<<<<< HEAD
          {/* Logo and welcome section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-8"
          >
            <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-12 w-12" />
            <span className="text-2xl font-semibold text-blue-700">
              Arigo Pay
            </span>
          </motion.div>

          {/* Abstract visual made with SVG */}
          <div className="mb-6 md:mb-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-64 h-64 md:w-80 md:h-80 relative"
            >
              {/* Subtle SVG shapes for a banking visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-blue-100/20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-blue-200/20 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-blue-300/30 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 border-2 border-blue-200/30 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 bg-blue-100/30 rounded-lg transform rotate-45 animate-pulse" style={{ animationDuration: "5s" }}></div>
              </div>
            </motion.div>
          </div>
          
=======
          {/* Abstract SVG visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-80 h-80 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-56 h-56 border-2 border-blue-200 rounded-full"
              ></motion.div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 bg-blue-100 rounded-full"
              ></motion.div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform rotate-45"
              ></motion.div>
            </div>
          </motion.div>

>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center md:text-left px-4 md:px-0 mt-6"
          >
<<<<<<< HEAD
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to Arigo Pay
            </h2>
            <p className="text-gray-600 text-lg max-w-md text-center">
              Securely manage your finances with ease and confidence.
=======
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text mb-4">
              Welcome to Arigo Pay
            </h2>
            <p className="text-gray-600 text-lg max-w-md">
              Sign in to access your account and manage your finances with ease and security.
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            </p>
          </motion.div>
        </motion.div>

        {/* Right side login form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
<<<<<<< HEAD
          {/* Logo/Brand for mobile */}
          <motion.div 
=======
          {/* Logo/Brand */}
          <motion.div
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-2">
<<<<<<< HEAD
              <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-10 w-10" />
              <span className="text-2xl font-semibold text-blue-700">
=======
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
              >
                <DollarSign size={20} className="text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                Arigo Pay
              </span>
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
<<<<<<< HEAD
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Log In</h1>
              <p className="text-gray-600">Access your Arigo Pay account</p>
=======
            className="bg-white border border-blue-100 rounded-xl p-8 shadow-lg max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Lock size={16} className="text-blue-600" />
                Securely access your account
              </p>
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-700">
<<<<<<< HEAD
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                    <MdOutlineMail />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your username or email"
                    name="username"
=======
                  Email
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
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  />
                </div>
              </motion.div>

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
<<<<<<< HEAD
                    <MdPassword />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
=======
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-blue-50/50 border border-blue-200 text-gray-900 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                  />
<<<<<<< HEAD
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600 transition-colors"
=======
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-blue-600 transition-colors"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
<<<<<<< HEAD
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
=======
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  disabled={isPending}
<<<<<<< HEAD
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center shadow-md"
=======
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
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
                      Logging in...
                    </span>
                  ) : (
                    "Log In"
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
            </form>
          </motion.div>

          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mt-6 text-gray-600"
          >
<<<<<<< HEAD
            <p>Dont have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
=======
            <p>
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
              >
                Open an Account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;