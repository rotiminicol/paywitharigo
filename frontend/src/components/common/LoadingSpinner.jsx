import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeMap = {
    xs: "w-4 h-4 sm:w-5 sm:h-5",
    sm: "w-6 h-6 sm:w-8 sm:h-8",
    md: "w-8 h-8 sm:w-10 sm:h-10",
    lg: "w-12 h-12 sm:w-16 sm:h-16",
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      borderColor: [
        "#9333EA", // purple
        "#22C55E", // green
        "#FFFFFF", // white
        "#9333EA", // purple
      ],
    },
    transition: {
      rotate: {
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      borderColor: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      variants={spinnerVariants}
      animate="animate"
      className={`rounded-full border-4 border-t-transparent ${sizeMap[size]}`}
      style={{
        borderColor: "#9333EA", // Initial purple color
        background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
      }}
    />
  );
};

export default LoadingSpinner;