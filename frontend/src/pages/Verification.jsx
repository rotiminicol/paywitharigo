import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [stage, setStage] = useState('email'); // email -> code -> success

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      backgroundColor: "#9333ea",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.97 },
    disabled: {
      opacity: 0.7,
      scale: 1
    }
  };

  // Timer for code resend cooldown
  useEffect(() => {
    let timer;
    if (isCodeSent && timeLeft > 0 && !canResend) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isCodeSent, canResend]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback({ type: 'error', message: 'Please enter a valid email address' });
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsCodeSent(true);
      setStage('code');
      setFeedback({ type: 'success', message: 'Verification code sent!' });
      
      // Reset timer for resend
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Failed to send code. Please try again.' });
    }
    setLoading(false);
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    if (!canResend) return;
    
    setLoading(true);
    setFeedback({ type: '', message: '' });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFeedback({ type: 'success', message: 'New code sent!' });
      
      // Reset timer for resend
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Failed to resend code. Please try again.' });
    }
    setLoading(false);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });
    
    // Check if code is complete
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setFeedback({ type: 'error', message: 'Please enter the complete 6-digit code' });
      setLoading(false);
      return;
    }
    
    // Simulate API call to verify code
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      // Success scenario
      setFeedback({ type: 'success', message: 'Verification successful!' });
      setStage('success');
    } catch (error) {
      setFeedback({ type: 'error', message: 'Invalid code. Please try again.' });
    }
    setLoading(false);
  };

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    // Handle backspace - focus previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is only digits and right length
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split('').slice(0, 6);
      const newCode = [...code];
      
      digits.forEach((digit, index) => {
        if (index < 6) newCode[index] = digit;
      });
      
      setCode(newCode);
      
      // Focus on the next empty input or the last input
      const nextEmptyIndex = newCode.findIndex(c => c === '');
      if (nextEmptyIndex !== -1) {
        const nextInput = document.getElementById(`code-input-${nextEmptyIndex}`);
        if (nextInput) nextInput.focus();
      } else {
        const lastInput = document.getElementById(`code-input-5`);
        if (lastInput) lastInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
                opacity: Math.random() * 0.8 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`
              }}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {stage === 'email' && (
          <motion.div 
            key="email-form"
            className="bg-gray-900 w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-800 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80" />
            
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2 text-center">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">ijeuwa</span>
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Lets verify your identity to get started
            </p>

            {feedback.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md mb-4 text-sm ${
                  feedback.type === 'error' 
                    ? 'bg-red-900/30 text-red-200 border border-red-800' 
                    : 'bg-green-900/30 text-green-200 border border-green-800'
                }`}
              >
                {feedback.message}
              </motion.div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Well send a verification code to this email
                </p>
              </div>
              
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover={loading ? "" : "hover"}
                whileTap={loading ? "" : "tap"}
                animate={loading ? "disabled" : ""}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Sending...' : 'Send Verification Code'}
              </motion.button>
            </form>

            <div className="mt-8 text-center border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Log in
                </a>
              </p>
            </div>
          </motion.div>
        )}

        {stage === 'code' && (
          <motion.div 
            key="code-form"
            className="bg-gray-900 w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-800 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80" />
            
            <button 
              onClick={() => setStage('email')}
              className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2 text-center">
              Check your inbox
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Weve sent a 6-digit verification code to <span className="text-white font-medium">{email}</span>
            </p>

            {feedback.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md mb-4 text-sm ${
                  feedback.type === 'error' 
                    ? 'bg-red-900/30 text-red-200 border border-red-800' 
                    : 'bg-green-900/30 text-green-200 border border-green-800'
                }`}
              >
                {feedback.message}
              </motion.div>
            )}

            <form onSubmit={handleCodeSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Enter verification code
                </label>
                <div 
                  className="flex gap-2 justify-between mb-2"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className="w-full h-14 bg-gray-800/70 border border-gray-700 rounded-lg text-white text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      disabled={loading}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  The code will expire in 5 minutes
                </p>
              </div>
              
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover={loading ? "" : "hover"}
                whileTap={loading ? "" : "tap"}
                animate={loading ? "disabled" : ""}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Verifying...' : 'Verify Code'}
              </motion.button>
              
              <div className="text-center pt-1">
                <p className="text-sm text-gray-400">
                  Didnt receive a code?{' '}
                  {canResend ? (
                    <button 
                      onClick={handleResendCode}
                      disabled={loading}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Resend
                    </button>
                  ) : (
                    <span className="text-gray-500">
                      Resend in {timeLeft}s
                    </span>
                  )}
                </p>
              </div>
            </form>

            <div className="mt-8 text-center border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                Having issues?{' '}
                <a href="mailto:support@ijeuwa.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Contact support
                </a>
              </p>
            </div>
          </motion.div>
        )}

        {stage === 'success' && (
          <motion.div 
            key="success-screen"
            className="bg-gray-900 w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-800 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-green-500 opacity-80" />
            
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center shadow-lg">
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.3 
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-white mb-2 text-center">
                Verification Complete!
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Your account has been successfully verified
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
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center"
                onClick={() => navigate('/')}
              >
                Continue to Dashboard
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-500 text-sm">
                Thank you for joining <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">ijeuwa</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verification;