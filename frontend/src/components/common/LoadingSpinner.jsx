import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeMap = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`loading loading-spinner ${sizeMap[size]} text-purple-500`}
    />
  );
};
export default LoadingSpinner;