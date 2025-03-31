import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useFollow from "../../hooks/useFollow";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import { FiUsers, FiUserPlus, FiChevronRight, FiUserCheck, FiRefreshCw } from "react-icons/fi";

const RightPanel = () => {
  // State for toggling between suggested and mutual friends
  const [activeTab, setActiveTab] = useState("suggested");
  
  // Queries for different user types
  const { data: suggestedUsers, isLoading: isSuggestedLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { data: mutualFriends, isLoading: isMutualLoading } = useQuery({
    queryKey: ["mutualFriends"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/mutual");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    enabled: activeTab === "mutual",
  });

  const { follow, isPending } = useFollow();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle glow effects
  const [glowEffect, setGlowEffect] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Get current data based on active tab
  const currentData = activeTab === "suggested" ? suggestedUsers : mutualFriends;
  const isLoading = activeTab === "suggested" ? isSuggestedLoading : isMutualLoading;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="hidden lg:block my-4 mx-2 min-w-[320px]"
    >
      <div className="bg-black bg-opacity-90 p-5 rounded-xl sticky top-2 border border-purple-900 shadow-xl backdrop-blur-md overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-900/20 blur-3xl"
            animate={{ 
              x: ['-20%', '30%', '-20%'],
              y: ['10%', '60%', '10%'],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-pink-600/10 blur-2xl right-0 top-0"
            animate={{ 
              x: ['20%', '-30%', '20%'],
              y: ['30%', '10%', '30%'],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
        </div>
        
        {/* Main content with relative positioning to stay above background */}
        <div className="relative z-10">
          {/* Header with glow effect */}
          <motion.div 
            className={`flex items-center justify-between mb-5 pb-3 border-b ${glowEffect ? 'border-purple-600/70' : 'border-purple-900/50'}`}
            animate={{ 
              boxShadow: glowEffect 
                ? '0 4px 12px -2px rgba(139, 92, 246, 0.3)' 
                : '0 4px 6px -6px rgba(139, 92, 246, 0.1)'
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.h2 
              className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
                textShadow: glowEffect 
                  ? '0 0 8px rgba(168, 85, 247, 0.4)' 
                  : '0 0 0px rgba(168, 85, 247, 0)'
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                },
                textShadow: {
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
            >
              Connect with Others
            </motion.h2>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: glowEffect ? 1.1 : 1
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, repeatDelay: 2 },
                scale: { duration: 1.5, ease: "easeInOut" }
              }}
            >
              <FiUsers className={`${glowEffect ? 'text-purple-300' : 'text-purple-500'}`} size={22} />
            </motion.div>
          </motion.div>
          
          {/* Tabs */}
          <motion.div 
            className="flex items-center gap-1 mb-4 bg-gray-900/70 p-1 rounded-lg border border-purple-900/40"
            whileHover={{ boxShadow: "0 0 12px rgba(139, 92, 246, 0.3)" }}
          >
            {[
              { id: "suggested", label: "Suggested", icon: <FiUserPlus /> },
              { id: "mutual", label: "Mutual", icon: <FiUserCheck /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white" 
                    : "text-gray-400 hover:text-purple-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: activeTab !== tab.id ? 1.03 : 1 }}
                whileTap={{ scale: 0.97 }}
                initial={false}
                animate={activeTab === tab.id ? {
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)"
                } : {
                  boxShadow: "none"
                }}
              >
                <motion.span
                  animate={{ rotate: activeTab === tab.id ? [0, 0] : [0, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.icon}
                </motion.span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Content with tab-specific animations */}
          <motion.div 
            className="flex flex-col gap-3"
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <RightPanelSkeleton />
            ) : currentData?.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {currentData.map((user, index) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    custom={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      boxShadow: "0 4px 20px -2px rgba(139, 92, 246, 0.25)"
                    }}
                    className="rounded-lg overflow-hidden backdrop-blur-sm border border-transparent hover:border-purple-900/50"
                  >
                    <Link
                      to={`/profile/${user.username}`}
                      className="flex items-center justify-between gap-4 p-3 transition-all group"
                    >
                      <div className="flex gap-3 items-center">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative w-12 h-12 rounded-full"
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-80"
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          <div className="absolute inset-0.5 rounded-full overflow-hidden bg-black">
                            <img 
                              src={user.profileImg || "/avatar-placeholder.png"} 
                              alt={user.username}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        </motion.div>
                        <div className="flex flex-col overflow-hidden">
                          <motion.span 
                            className="font-semibold text-white truncate max-w-[160px]"
                            whileHover={{ 
                              color: "#d8b4fe", 
                              transition: { duration: 0.2 } 
                            }}
                          >
                            {user.fullName}
                          </motion.span>
                          <motion.span 
                            className="text-sm text-gray-400 truncate"
                            animate={{
                              color: ["#9ca3af", "#a78bfa", "#9ca3af"],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                          >
                            @{user.username}
                          </motion.span>
                          {/* Conditionally show mutual friends count */}
                          {activeTab === "mutual" && user.mutualCount && (
                            <motion.span 
                              className="text-xs text-purple-400 mt-1 flex items-center gap-1"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + (index * 0.1) }}
                            >
                              <FiUsers size={12} />
                              {user.mutualCount} mutual
                            </motion.span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          background: "linear-gradient(to right, #7e22ce, #db2777)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-full py-1.5 px-3 flex items-center gap-1.5 border-none shadow-lg shadow-purple-900/30 text-sm font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          follow(user._id);
                        }}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <FiUserPlus size={16} />
                            Follow
                          </>
                        )}
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className="text-center p-6 rounded-lg bg-gray-900/40 border border-dashed border-purple-800/50"
              >
                <motion.div 
                  className="text-purple-400 mb-3"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {activeTab === "suggested" ? (
                    <FiUsers className="mx-auto" size={30} />
                  ) : (
                    <FiUserCheck className="mx-auto" size={30} />
                  )}
                </motion.div>
                <h3 className="text-gray-200 font-medium">
                  {activeTab === "suggested" ? "No suggestions yet" : "No mutual friends"}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {activeTab === "suggested" 
                    ? "Follow more people to get recommendations" 
                    : "Connect with others to find mutual friends"}
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    color: "#e879f9"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 text-sm flex items-center justify-center gap-1.5 mx-auto text-purple-400 hover:text-purple-300 bg-purple-900/20 px-4 py-2 rounded-full"
                >
                  <FiRefreshCw size={14} />
                  Refresh
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* See more button */}
          {currentData?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(139, 92, 246, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 rounded-lg text-sm text-purple-400 flex items-center justify-center gap-1.5 border border-purple-900/30 bg-purple-900/10 hover:text-purple-300 transition-colors"
              >
                See more <FiChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 pt-4 border-t border-purple-900/30"
          >
            <div className="flex flex-wrap gap-3 text-sm justify-center">
              {["Terms", "Privacy", "Cookies", "About"].map((item, index) => (
                <motion.a
                  key={item}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "#e879f9",
                    textShadow: "0 0 8px rgba(232, 121, 249, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="text-gray-500 hover:text-purple-400 transition-colors"
                  animate={{
                    textShadow: glowEffect && index === Math.floor(Math.random() * 4) 
                      ? "0 0 8px rgba(232, 121, 249, 0.4)" 
                      : "0 0 0px rgba(232, 121, 249, 0)"
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <motion.p 
              className="text-xs text-gray-600 text-center mt-4"
              animate={{
                opacity: [0.6, 1, 0.6],
                textShadow: glowEffect 
                  ? "0 0 5px rgba(139, 92, 246, 0.3)" 
                  : "0 0 0px rgba(139, 92, 246, 0)"
              }}
              transition={{
                opacity: { duration: 4, repeat: Infinity },
                textShadow: { duration: 1.5, ease: "easeInOut" }
              }}
            >
              © {new Date().getFullYear()} Miamour
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RightPanel;