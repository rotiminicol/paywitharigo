import { motion } from "framer-motion";

const BankLoadingSpinner = ({ size = "md" }) => {
  const sizeMap = {
    xs: "w-4 h-4 sm:w-5 sm:h-5",
    sm: "w-6 h-6 sm:w-8 sm:h-8",
    md: "w-8 h-8 sm:w-10 sm:h-10",
    lg: "w-12 h-12 sm:w-16 sm:h-16",
    xl: "w-16 h-16 sm:w-20 sm:h-20"
  };

  // Define the main spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Define the inner pulse animation
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Define the dollar sign animation
  const dollarVariants = {
    animate: {
      y: [0, -5, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer spinning ring */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={`rounded-full border-4 border-t-transparent border-r-blue-600 border-b-blue-400 border-l-blue-200 ${sizeMap[size]}`}
        style={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
        }}
      />

      {/* Inner pulsing circle */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className={`absolute rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ${
          size === "xs" ? "w-2 h-2" :
          size === "sm" ? "w-3 h-3" :
          size === "md" ? "w-4 h-4" :
          size === "lg" ? "w-6 h-6" : "w-8 h-8"
        }`}
      />

      {/* Bank symbol overlay (dollar sign or euro symbol) */}
      <motion.div
        variants={dollarVariants}
        animate="animate"
        className={`absolute text-white font-bold flex items-center justify-center ${
          size === "xs" ? "text-xs" :
          size === "sm" ? "text-sm" :
          size === "md" ? "text-base" :
          size === "lg" ? "text-lg" : "text-xl"
        }`}
      >
        $
      </motion.div>
      
      {/* Optional subtle blue glow */}
      <div className={`absolute rounded-full bg-blue-500/20 blur-md ${sizeMap[size]}`} />
    </div>
  );
};

// Bank-themed loading component with text
const BankLoader = ({ size = "md", text = "Processing" }) => {
  const dotVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <BankLoadingSpinner size={size} />
      
      {text && (
        <div className="flex items-center text-blue-700 font-medium">
          <span>{text}</span>
          <motion.span
            variants={dotVariants}
            animate="animate"
            className="inline-block ml-1"
          >
            .
          </motion.span>
          <motion.span
            variants={dotVariants}
            animate="animate"
            className="inline-block"
            transition={{ delay: 0.5 }}
          >
            .
          </motion.span>
          <motion.span
            variants={dotVariants}
            animate="animate"
            className="inline-block"
            transition={{ delay: 1 }}
          >
            .
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default BankLoader;