import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import { FiTrendingUp, FiUsers } from "react-icons/fi";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-[4_4_0] mr-auto border-r border-purple-800/40 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Header with glass effect */}
      <motion.div 
        className={`sticky top-0 z-10 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-black/70 shadow-lg shadow-purple-900/20" : "bg-transparent"
        }`}
        animate={{
          borderColor: scrolled ? "rgba(147, 51, 234, 0.5)" : "rgba(147, 51, 234, 0.2)"
        }}
      >
        <div className="flex w-full border-b border-purple-700/30 shadow-lg shadow-purple-500/10">
          <motion.div
            className={`
              flex justify-center items-center gap-2 flex-1 py-4 px-3 
              cursor-pointer relative overflow-hidden
            `}
            onClick={() => setFeedType("forYou")}
            whileHover={{ 
              backgroundColor: "rgba(147, 51, 234, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FiTrendingUp className={`${feedType === "forYou" ? "text-purple-400" : "text-gray-400"} transition-colors duration-300`} />
            <span className={`font-semibold ${
              feedType === "forYou" 
                ? "text-purple-300 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              For You
            </span>
            
            {feedType === "forYou" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                initial={{ width: 0, left: "50%", x: "-50%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
          
          <motion.div
            className={`
              flex justify-center items-center gap-2 flex-1 py-4 px-3
              cursor-pointer relative overflow-hidden
            `}
            onClick={() => setFeedType("following")}
            whileHover={{ 
              backgroundColor: "rgba(147, 51, 234, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FiUsers className={`${feedType === "following" ? "text-purple-400" : "text-gray-400"} transition-colors duration-300`} />
            <span className={`font-semibold ${
              feedType === "following" 
                ? "text-purple-300 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              Following
            </span>
            
            {feedType === "following" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                initial={{ width: 0, left: "50%", x: "-50%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Content container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-0"
      >
        {/* CREATE POST INPUT */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sticky top-16 z-10"
        >
          <CreatePost />
        </motion.div>

        {/* POSTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pb-20"
        >
          <Posts feedType={feedType} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;