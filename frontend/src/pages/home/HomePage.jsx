import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import { FiTrendingUp, FiUsers, FiSearch, FiBell, FiMessageCircle } from "react-icons/fi";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const mainRef = useRef(null);

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
      className="flex-[3_3_0] border-r border-indigo-900/40 min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-black relative overflow-hidden"
    >
      {/* Enhanced animated background with more dynamic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          variants={parallaxBg}
          initial="hidden"
          animate="show"
          className="absolute inset-0"
        >
          <motion.div 
            variants={floatingItem}
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-800/15 blur-3xl"
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
          <motion.div 
            variants={floatingItem}
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-700/15 blur-3xl"
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
          <motion.div 
            variants={floatingItem}
            className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-violet-600/15 blur-3xl"
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
        </motion.div>
      </div>

      {/* Enhanced header with premium glass effect */}
      <motion.div 
        className={`sticky top-0 z-20 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "bg-gray-950/80 shadow-xl shadow-indigo-900/30" : "bg-transparent"
        }`}
        animate={{
          borderColor: scrolled ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.2)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-800/30">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex items-center"
          >
            <div className="w-9 h-9 mr-3 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-extrabold text-xl">I</span>
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-500 bg-clip-text text-transparent tracking-tight">
              Ijuewa
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
            >
              <FiSearch className="text-indigo-200 text-lg" />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell className="text-indigo-200 text-lg" />
              <motion.span 
                className="absolute top-0 right-0 w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
            >
              <FiMessageCircle className="text-indigo-200 text-lg" />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-500 cursor-pointer overflow-hidden border-2 border-indigo-300/30 shadow-md"
            >
              <img 
                src="/api/placeholder/100/100" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced feed type selector */}
        <div className="flex w-full border-b border-indigo-800/20">
          <motion.div
            className="flex justify-center items-center gap-2 flex-1 py-4 px-3 cursor-pointer relative overflow-hidden"
            onClick={() => setFeedType("forYou")}
            whileHover={{ 
              backgroundColor: "rgba(99, 102, 241, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FiTrendingUp className={`${feedType === "forYou" ? "text-indigo-400" : "text-gray-400"} transition-colors duration-300 text-lg`} />
            <span className={`font-semibold text-lg ${
              feedType === "forYou" 
                ? "text-indigo-300 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              For You
            </span>
            {feedType === "forYou" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-t-full"
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
              backgroundColor: "rgba(99, 102, 241, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FiUsers className={`${feedType === "following" ? "text-indigo-400" : "text-gray-400"} transition-colors duration-300 text-lg`} />
            <span className={`font-semibold text-lg ${
              feedType === "following" 
                ? "text-indigo-300 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent" 
                : "text-gray-300"
            } transition-all duration-300`}>
              Following
            </span>
            {feedType === "following" && (
              <motion.div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-t-full"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced notifications dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute right-4 top-20 z-30 w-72 bg-gray-900/98 backdrop-blur-xl rounded-xl border border-indigo-800/50 shadow-2xl shadow-indigo-900/40 overflow-hidden"
          >
            <div className="p-3 border-b border-indigo-800/40 bg-gradient-to-r from-indigo-900/20 to-gray-900">
              <h3 className="text-indigo-200 font-semibold text-lg">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item * 0.1 }}
                  className="p-3 border-b border-indigo-800/20 hover:bg-indigo-800/15 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-500 flex-shrink-0 overflow-hidden shadow-md">
                      <img src={`/api/placeholder/${40 + item}/${40 + item}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200 leading-tight">
                        <span className="font-semibold text-indigo-300">User{item}</span> 
                        {item === 1 ? ' liked your post' : 
                         item === 2 ? ' commented on your post' : 
                         item === 3 ? ' followed you' : 
                         ' shared your content'}
                      </p>
                      <span className="text-xs text-gray-400">{item} min ago</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="p-3 text-center text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer bg-gradient-to-t from-indigo-900/10 to-transparent"
              whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.15)" }}
            >
              View all notifications
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)",
            rotate: 90
          }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-600/40 border border-indigo-400/30"
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
    </motion.div>
  );
};

export default HomePage;