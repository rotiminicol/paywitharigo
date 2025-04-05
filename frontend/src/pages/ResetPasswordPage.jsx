import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MdPassword, MdOutlineRemoveRedEye, MdOutlineVisibilityOff, MdLockReset } from "react-icons/md";
import { motion } from "framer-motion";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  // Verify token validity
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/verify-reset-token/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setIsTokenVerified(true);
        } else {
          setIsTokenVerified(false);
        }
      } catch (error) {
        setIsTokenVerified(false);
      } finally {
        setIsTokenChecking(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsTokenVerified(false);
      setIsTokenChecking(false);
    }
  }, [token]);

  const {
    mutate: resetPasswordMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await fetch(`/api/auth/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        });

        const responseData = await res.json();

        if (!res.ok) {
          throw new Error(responseData.error || "Something went wrong");
        }
        
        return responseData;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const validatePassword = (password) => {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number and special character");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
    
    // Check if passwords match
    if (name === "confirmPassword" || (name === "password" && formData.confirmPassword)) {
      if (name === "password") {
        setIsValid(value === formData.confirmPassword && validatePassword(value));
      } else {
        setIsValid(formData.password === value && validatePassword(formData.password));
      }
    }
    
    // Validate password requirements
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setIsValid(false);
      return;
    }
    
    if (!validatePassword(formData.password)) {
      return;
    }
    
    resetPasswordMutation(formData);
  };

  if (isTokenChecking) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-green-900/20"></div>
        <div className="text-center relative z-10">
          <div className="inline-block w-12 h-12 mb-4">
            <svg className="animate-spin w-full h-full text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl text-gray-300">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  if (!isTokenVerified) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-green-900/20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10 max-w-md bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-500/20 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Invalid or Expired Link</h2>
          <p className="text-gray-400 mb-8">
            This password reset link is invalid or has expired. Please request a new password reset link.
          </p>
          <Link 
            to="/forgot-password" 
            className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-green-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Request New Link
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-green-900/20"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 max-w-md bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/20 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Password Reset Complete!</h2>
          <p className="text-gray-400 mb-8">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <Link 
            to="/login" 
            className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-green-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-green-900/20"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
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
          className="w-full md:w-1/2 flex flex-col items-center md:items-start"
        >
          {/* Abstract 3D visual made with SVG */}
          <div className="mb-6 md:mb-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-64 h-64 md:w-80 md:h-80 relative"
            >
              {/* Abstract SVG shapes to create a tech visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-purple-500/10 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-green-500/10 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-4 border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: "15s" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 border-2 border-green-500/20 rounded-full animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 bg-gradient-to-br from-purple-600/40 to-green-500/40 rounded-lg transform rotate-45 animate-bounce" style={{ animationDuration: "4s" }}></div>
              </div>
            </motion.div>
          </div>
          
          {/* Reset message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center md:text-left px-4 md:px-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text mb-4">
              Create New Password
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Your password reset link is valid. Enter a new secure password to protect your account.
            </p>
          </motion.div>
        </motion.div>

        {/* Right side form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          {/* Logo/Brand */}
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
                iJeuwa
              </span>
            </div>
          </motion.div>

          {/* Reset Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-500/20 text-purple-400">
                <MdLockReset className="text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
              <p className="text-gray-400">Create a new secure password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                    <MdPassword />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    placeholder="Enter new password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                {passwordError && (
                  <p className="mt-1 text-sm text-red-400">{passwordError}</p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                    <MdPassword />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-purple-400 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <MdOutlineVisibilityOff /> : <MdOutlineRemoveRedEye />}
                  </button>
                </div>
                {!isValid && (
                  <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
                )}
              </motion.div>

              {isError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm"
                >
                  {error.message}
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                type="submit"
                disabled={isPending || !isValid || passwordError}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isPending || !isValid || passwordError 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90'}`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </motion.button>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-6 text-center"
            >
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                Remember your password? Login instead
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
};

export default ResetPasswordPage;