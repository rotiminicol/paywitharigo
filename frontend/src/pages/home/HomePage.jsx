import { useState, useEffect, useRef } from "react";
import { motion, } from "framer-motion";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const parallaxBg = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const floatingItem = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-[3_3_0] border-r border-purple-900/40 min-h-screen bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Enhanced animated background with dynamic elements in new color scheme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          variants={parallaxBg}
          initial="hidden"
          animate="show"
          className="absolute inset-0"
        >
          {/* Green glowing orb */}
          <motion.div 
            variants={floatingItem}
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          {/* Purple glowing orb */}
          <motion.div 
            variants={floatingItem}
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-700/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1.1, 1.4, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          {/* Smaller green orb */}
          <motion.div 
            variants={floatingItem}
            className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-green-600/15 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          {/* Additional purple accent */}
          <motion.div 
            variants={floatingItem}
            className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-800/15 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          {/* Green accent */}
          <motion.div 
            variants={floatingItem}
            className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full bg-emerald-700/15 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </motion.div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, "-100%"],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>

      {/* Simplified header with just logo and name */}
      <motion.div 
        className={`sticky top-0 z-20 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "bg-black/80 shadow-xl shadow-purple-900/30" : "bg-transparent"
        }`}
        animate={{
          borderColor: scrolled ? "rgba(126, 34, 206, 0.6)" : "rgba(126, 34, 206, 0.2)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800/30">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex items-center"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 15px rgba(52, 211, 153, 0.7)"
              }}
              className="w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <motion.span 
                className="text-white font-extrabold text-xl"
                animate={{ 
                  textShadow: ["0 0 5px rgba(255,255,255,0.3)", "0 0 15px rgba(255,255,255,0.7)", "0 0 5px rgba(255,255,255,0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                I
              </motion.span>
            </motion.div>
            <motion.h1 
              className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-white to-purple-500 bg-clip-text text-transparent tracking-tight"
              whileHover={{ scale: 1.05 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Ijeuwa            </motion.h1>
          </motion.div>
        </div>

        {/* Enhanced feed type selector with new color scheme */}
        <div className="flex w-full border-b border-purple-800/20">
          <motion.div
            className="flex justify-center items-center gap-2 flex-1 py-4 px-3 cursor-pointer relative overflow-hidden"
            onClick={() => setFeedType("forYou")}
            whileHover={{ 
              backgroundColor: "rgba(126, 34, 206, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${feedType === "forYou" ? "text-green-400" : "text-gray-400"} transition-colors duration-300`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className={`font-semibold text-lg ${
              feedType === "forYou" 
                ? "text-green-300 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              For You
            </span>
            {feedType === "forYou" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-green-600 to-purple-500 rounded-t-full"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </motion.div>
          
          <motion.div
            className="flex justify-center items-center gap-2 flex-1 py-4 px-3 cursor-pointer relative overflow-hidden"
            onClick={() => setFeedType("following")}
            whileHover={{ 
              backgroundColor: "rgba(126, 34, 206, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${feedType === "following" ? "text-green-400" : "text-gray-400"} transition-colors duration-300`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className={`font-semibold text-lg ${
              feedType === "following" 
                ? "text-green-300 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              Following
            </span>
            {feedType === "following" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-green-600 to-purple-500 rounded-t-full"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Content container with enhanced animations */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-[108px] z-10 mt-4"
        >
          <CreatePost />
        </motion.div>

        <motion.div
          variants={container}
          className="pb-20 mt-6 space-y-6"
        >
          <Posts feedType={feedType} />
        </motion.div>
      </motion.div>
      
      {/* Enhanced floating action button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.8
        }}
        className="fixed bottom-8 right-8 z-20"
      >
        <motion.button
          whileHover={{ 
            scale: 1.15, 
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
            rotate: 180
          }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/40 border border-green-400/30"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Decorative side accents */}
      <div className="absolute left-0 top-1/3 h-32 w-1 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-70"></div>
      <div className="absolute right-0 top-2/3 h-32 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-70"></div>
    </motion.div>
  );
};

export default HomePage;