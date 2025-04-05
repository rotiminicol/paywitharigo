import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineMail, MdArrowBack } from "react-icons/md";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    mutate: forgotPasswordMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (email) => {
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordMutation(email);
  };

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
          
          {/* Welcome message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center md:text-left px-4 md:px-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-300 text-transparent bg-clip-text mb-4">
              Forgot Password?
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              No worries! Enter your email address and well send you instructions to reset your password.
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

          {/* Forgot Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg"
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                  <p className="text-gray-400">Enter your email to receive a reset link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
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
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
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
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/20 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
                <p className="text-gray-400 mb-6">
                  Weve sent password reset instructions to:
                  <br />
                  <span className="text-purple-400 font-medium block mt-2">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  If you dont see the email, check other places it might be, like your spam, junk, social, or other folders.
                </p>
                <button
                  onClick={() => {
                    setEmail("");
                    setIsSubmitted(false);
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center mx-auto"
                >
                  <MdArrowBack className="mr-1" /> Back to reset password
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Back to login link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-6 text-gray-400"
          >
            <p>Remember your password?{' '}
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Back to Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

     
    </div>
  );
};

export default ForgotPasswordPage;