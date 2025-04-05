import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useFollow from "../../hooks/useFollow";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import { FiUsers, FiUserPlus, FiUserCheck, FiHash, FiTrendingUp, FiStar, FiInfo } from "react-icons/fi";

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState("suggested");
  const [animateBackground, setAnimateBackground] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setAnimateBackground(prev => !prev), 15000); // Faster animation switch
    return () => clearInterval(interval);
  }, []);

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

  const { data: trendingTopics, isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trendingTopics"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        return data.slice(0, 8);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { data: featuredUsers, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ["featuredUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/featured");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        return data.slice(0, 3);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
  };

  const trendingVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: custom * 0.1,
        type: "spring", 
        stiffness: 200 
      } 
    })
  };

  const backgroundVariants = {
    pattern1: {
      scale: [1, 1.3, 1.1, 1.4, 1],
      rotate: [0, 15, -15, 10, 0],
      opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
    },
    pattern2: {
      scale: [1.3, 1, 1.4, 0.9, 1.3],
      rotate: [0, -20, 15, -10, 0],
      opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const currentData = activeTab === "suggested" ? suggestedUsers : mutualFriends;
  const isLoading = activeTab === "suggested" ? isSuggestedLoading : isMutualLoading;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:block my-2 mx-1 w-96 h-[calc(100vh-0.5rem)] overflow-hidden bg-black/90 border-2 border-gradient-to-r from-green-600 via-purple-600 to-green-600 rounded-2xl shadow-2xl shadow-purple-500/30"
    >
      <div id="right-panel-container" className="h-full flex flex-col relative overflow-y-auto scrollbar-hide">
        {/* Vibrant Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 -left-20 w-64 h-64 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={animateBackground ? "pattern1" : "pattern2"}
            variants={backgroundVariants}
          />
          <motion.div 
            className="absolute bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-full blur-3xl"
            animate={animateBackground ? "pattern2" : "pattern1"}
            variants={backgroundVariants}
          />
          <motion.div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Header */}
        <motion.div 
          className="p-5 border-b border-purple-600/50 bg-gradient-to-b from-black/80 to-transparent"
          whileHover={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
        >
          <motion.h2 
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-purple-400"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%"],
              textShadow: ["0 0 10px rgba(34, 197, 94, 0.5)", "0 0 20px rgba(147, 51, 234, 0.5)", "0 0 10px rgba(34, 197, 94, 0.5)"]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            Connect & Discover
          </motion.h2>
          <motion.p
            className="text-sm text-white/80 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Vibrant connections await!
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="px-4 py-3 border-b border-purple-600/50">
          <div className="flex gap-3">
            {[
              { id: "suggested", label: "Suggested", icon: <FiUserPlus /> },
              { id: "mutual", label: "Mutual", icon: <FiUserCheck /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-semibold ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-green-600 via-white/20 to-purple-600 text-white shadow-lg shadow-green-500/30" 
                    : "text-white/70 bg-black/50 hover:bg-green-900/30"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <motion.span
                  animate={activeTab === tab.id ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: activeTab === tab.id ? Infinity : 0 }}
                >
                  {tab.icon}
                </motion.span> 
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Users Section */}
        {featuredUsers && featuredUsers.length > 0 && (
          <div className="px-4 py-4 border-b border-purple-600/50">
            <motion.h3 
              className="text-lg font-bold text-white mb-3 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FiStar className="text-green-400 animate-pulse" /> Featured Stars
            </motion.h3>
            <motion.div 
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
              variants={containerVariants}
            >
              {isFeaturedLoading ? (
                <div className="flex-1 flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                featuredUsers.map((user) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                    className="flex-shrink-0 w-28"
                  >
                    <Link to={`/profile/${user.username}`} className="block">
                      <div className="relative group">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 via-white/20 to-purple-600 p-0.5 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all duration-500">
                          <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm"></div>
                        </div>
                        <div className="relative flex flex-col items-center p-3">
                          <motion.div 
                            className="w-14 h-14 rounded-full border-2 border-green-400 mb-2 overflow-hidden relative"
                            whileHover={{ scale: 1.15, rotate: 360 }}
                            transition={{ duration: 0.7 }}
                          >
                            <img 
                              src={user.profileImg || "/avatar-placeholder.png"}
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.5 }}
                            />
                          </motion.div>
                          <p className="text-sm font-bold text-white text-center truncate w-full group-hover:text-green-300 transition-colors duration-500">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-purple-400 text-center truncate w-full group-hover:text-white transition-colors duration-500">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        )}

        {/* Users Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
          <motion.div className="flex flex-col gap-4" variants={containerVariants}>
            {isLoading ? (
              <RightPanelSkeleton />
            ) : currentData?.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {currentData.map((user) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-2xl border border-purple-600/30"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 0 25px rgba(34, 197, 94, 0.5)" 
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-white/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    <Link 
                      to={`/profile/${user.username}`} 
                      className="flex items-center justify-between gap-3 p-4 hover:bg-green-900/30 transition-all duration-500"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                          <motion.div 
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 via-white/20 to-purple-600 opacity-80 group-hover:opacity-100 transition-all duration-500"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          ></motion.div>
                          <img 
                            src={user.profileImg || "/avatar-placeholder.png"} 
                            alt={user.username}
                            className="relative w-full h-full rounded-full object-cover border-2 border-green-400 group-hover:border-white transition-all duration-500"
                          />
                        </div>
                        <div className="min-w-0">
                          <motion.p 
                            className="text-sm font-bold text-white line-clamp-1 group-hover:text-green-300 transition-colors duration-500"
                            whileHover={{ x: 5 }}
                          >
                            {user.fullName}
                          </motion.p>
                          <p className="text-xs text-gray-300 group-hover:text-purple-300 transition-colors duration-500 truncate">
                            @{user.username}
                          </p>
                          {user.bio && (
                            <p className="text-xs text-gray-400 line-clamp-1 mt-1 group-hover:text-white transition-colors duration-500">
                              {user.bio}
                            </p>
                          )}
                          {activeTab === "mutual" && user.mutualCount && (
                            <span className="text-xs text-green-400 flex items-center gap-1 mt-1 group-hover:text-white transition-colors duration-500">
                              <FiUsers size={12} /> {user.mutualCount} mutual
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 15px rgba(147, 51, 234, 0.7)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-600 via-white/20 to-purple-600 text-white rounded-full py-1.5 px-4 text-sm font-semibold"
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
              <motion.div 
                className="text-center p-8 text-white/70 bg-gradient-to-b from-black/50 to-purple-900/20 rounded-2xl"
                variants={itemVariants}
              >
                <motion.div 
                  className="inline-block mb-3"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {activeTab === "suggested" ? <FiUserPlus size={32} className="text-green-400" /> : <FiUserCheck size={32} className="text-purple-400" />}
                </motion.div>
                <p className="text-sm">No {activeTab === "suggested" ? "suggestions" : "mutual friends"} yet</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Trending Topics Section */}
        <div className="px-4 py-4 border-t border-purple-600/50 bg-gradient-to-t from-black/80 to-transparent">
          <motion.h3 
            className="text-lg font-bold text-white mb-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiTrendingUp className="text-purple-400 animate-bounce" /> Trending Now
          </motion.h3>
          <motion.div className="grid grid-cols-2 gap-3">
            {isTrendingLoading ? (
              <RightPanelSkeleton />
            ) : trendingTopics?.length > 0 ? (
              trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic._id || index}
                  custom={index}
                  variants={trendingVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
                  }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30 transition-all duration-500"
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 via-white/20 to-purple-600 flex items-center justify-center group-hover:scale-115 transition-all duration-500"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <FiHash className="text-white" size={16} />
                      </motion.div>
                      <div className="min-w-0">
                        <motion.span 
                          className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors duration-500 block truncate"
                          whileHover={{ x: 3 }}
                        >
                          {topic.name}
                        </motion.span>
                        <span className="text-xs text-gray-300 block group-hover:text-white transition-colors duration-500">
                          {topic.postCount} posts
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 via-white to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center p-4 text-white/70 bg-gradient-to-b from-black/50 to-purple-900/20 rounded-2xl col-span-2"
                variants={itemVariants}
              >
                <motion.div 
                  className="inline-block mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiTrendingUp size={32} className="text-green-400" />
                </motion.div>
                <p className="text-sm">No trends yet</p>
              </motion.div>
            )}
          </motion.div>
          {trendingTopics?.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 p-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-purple-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-500 transition-all duration-500"
            >
              Explore More Trends
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <motion.div 
          className="p-4 border-t border-purple-600/50 bg-gradient-to-t from-black/80 to-transparent"
          whileHover={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
        >
          <div className="flex flex-wrap gap-3 text-sm text-white/70 justify-center mb-3">
            {["Terms", "Privacy", "Cookies", "About", "Help", "Settings"].map((item, idx) => (
              <motion.a
                key={item}
                href="#"
                className="hover:text-green-300 transition-colors duration-500"
                whileHover={{ scale: 1.1, y: -3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.div 
            className="text-xs text-white/60 text-center flex items-center justify-center gap-1"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FiInfo size={14} className="text-purple-400" /> 
            <p>
              © {new Date().getFullYear()} Miamour • Powered by Passion
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RightPanel;