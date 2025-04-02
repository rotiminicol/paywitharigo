import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useFollow from "../../hooks/useFollow";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import { FiUsers, FiUserPlus, FiChevronRight, FiUserCheck,  FiTrendingUp, FiHash } from "react-icons/fi";

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState("suggested");
  const [glowEffect, setGlowEffect] = useState(false);

  // Existing queries (suggestedUsers, mutualFriends) remain unchanged
  const { data: suggestedUsers, isLoading: isSuggestedLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
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
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    enabled: activeTab === "mutual",
  });

  // New query for trending topics
  const { data: trendingTopics, isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trendingTopics"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        return data.slice(0, 5); // Limit to top 5 trends
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  useEffect(() => {
    const interval = setInterval(() => setGlowEffect(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const currentData = activeTab === "suggested" ? suggestedUsers : mutualFriends;
  const isLoading = activeTab === "suggested" ? isSuggestedLoading : isMutualLoading;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="hidden lg:block my-4 mx-2 min-w-[320px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-gray-900"
    >
      <div className="bg-black bg-opacity-90 p-5 rounded-xl sticky top-2 border border-purple-900 shadow-2xl backdrop-blur-md">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-72 h-72 rounded-full bg-purple-900/25 blur-3xl"
            animate={{ x: ['-30%', '40%', '-30%'], y: ['0%', '70%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-pink-600/15 blur-2xl right-0 bottom-0"
            animate={{ x: ['30%', '-40%', '30%'], y: ['70%', '20%', '70%'] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            className={`flex items-center justify-between mb-6 pb-3 border-b ${glowEffect ? 'border-purple-600/70' : 'border-purple-900/50'}`}
            animate={{ boxShadow: glowEffect ? '0 4px 20px rgba(139, 92, 246, 0.4)' : 'none' }}
          >
            <motion.h2 
              className="font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
              transition={{ backgroundPosition: { duration: 6, repeat: Infinity, repeatType: "reverse" } }}
            >
              Connect & Trends
            </motion.h2>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <FiUsers className={`${glowEffect ? 'text-purple-300' : 'text-purple-500'}`} size={24} />
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div className="flex items-center gap-1 mb-6 bg-gray-900/70 p-1 rounded-lg border border-purple-900/40">
            {[
              { id: "suggested", label: "Suggested", icon: <FiUserPlus /> },
              { id: "mutual", label: "Mutual", icon: <FiUserCheck /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium ${
                  activeTab === tab.id ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: activeTab !== tab.id ? 1.05 : 1, boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Users Section */}
          <motion.div className="flex flex-col gap-4 mb-8" variants={containerVariants} initial="hidden" animate="visible">
            {isLoading ? (
              <RightPanelSkeleton />
            ) : currentData?.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {currentData.map((user, ) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 25px rgba(139, 92, 246, 0.3)" }}
                    className="rounded-lg border border-purple-900/50 bg-gray-900/30 p-3"
                  >
                    <Link to={`/profile/${user.username}`} className="flex items-center justify-between gap-4">
                      <div className="flex gap-3 items-center">
                        <motion.img 
                          src={user.profileImg || "/avatar-placeholder.png"} 
                          alt={user.username}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-600/50"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div>
                          <span className="font-semibold text-white">{user.fullName}</span>
                          <span className="text-sm text-gray-400 block">@{user.username}</span>
                          {activeTab === "mutual" && user.mutualCount && (
                            <span className="text-xs text-purple-400 flex items-center gap-1">
                              <FiUsers size={12} /> {user.mutualCount} mutual
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, background: "linear-gradient(to right, #7e22ce, #db2777)" }}
                        className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-full py-1.5 px-3"
                        onClick={(e) => { e.preventDefault(); follow(user._id); }}
                        disabled={isPending}
                      >
                        {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div className="text-center p-6 bg-gray-900/40 rounded-lg border border-dashed border-purple-800/50">
                <FiUsers className="mx-auto text-purple-400 mb-3" size={30} />
                <h3 className="text-gray-200">No {activeTab === "suggested" ? "suggestions" : "mutual friends"} yet</h3>
              </motion.div>
            )}
          </motion.div>

          {/* Trending Topics Section */}
          <motion.div 
            className="mt-8 pt-6 border-t border-purple-900/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="flex items-center justify-between mb-5"
              animate={{ boxShadow: glowEffect ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none' }}
            >
              <motion.h3 
                className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                Trending Now
              </motion.h3>
              <motion.div animate={{ scale: glowEffect ? 1.2 : 1 }}>
                <FiTrendingUp className="text-purple-400" size={22} />
              </motion.div>
            </motion.div>

            {isTrendingLoading ? (
              <RightPanelSkeleton />
            ) : trendingTopics?.length > 0 ? (
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic._id || index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: "rgba(139, 92, 246, 0.15)",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.2)"
                    }}
                    className="p-3 rounded-lg border border-purple-900/40 bg-gray-900/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          <FiHash className="text-white" size={18} />
                        </motion.div>
                        <div>
                          <span className="font-medium text-white">{topic.name}</span>
                          <motion.span 
                            className="text-sm text-gray-400 block"
                            animate={{ color: ["#9ca3af", "#a78bfa", "#9ca3af"] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          >
                            {topic.postCount} posts
                          </motion.span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        className="text-purple-400"
                      >
                        <FiChevronRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div className="text-center p-6 bg-gray-900/40 rounded-lg border border-dashed border-purple-800/50">
                <FiTrendingUp className="mx-auto text-purple-400 mb-3" size={30} />
                <h3 className="text-gray-200">No trends yet</h3>
                <p className="text-sm text-gray-400 mt-1">Check back later!</p>
              </motion.div>
            )}

            {/* See more trends */}
            {trendingTopics?.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                className="w-full mt-4 py-2 rounded-lg text-sm text-purple-400 flex items-center justify-center gap-1.5 border border-purple-900/30 bg-purple-900/10"
              >
                See more trends <FiChevronRight />
              </motion.button>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div className="mt-8 pt-6 border-t border-purple-900/30">
            <div className="flex flex-wrap gap-3 text-sm justify-center">
              {["Terms", "Privacy", "Cookies", "About"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.1, color: "#e879f9" }}
                  href="#"
                  className="text-gray-500"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <motion.p 
              className="text-xs text-gray-600 text-center mt-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
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