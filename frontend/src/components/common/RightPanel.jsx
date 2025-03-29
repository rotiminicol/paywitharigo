import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useFollow from "../../hooks/useFollow";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import { FiUsers, FiUserPlus, FiChevronRight } from "react-icons/fi";

const RightPanel = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
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

  const { follow, isPending } = useFollow();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="hidden lg:block my-4 mx-2 min-w-[300px]"
    >
      <div className="bg-gray-900 p-4 rounded-xl sticky top-2 border border-gray-800 shadow-lg backdrop-blur-sm">
        {/* Header */}
        <motion.div 
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between mb-4 pb-2 border-b border-purple-900/50"
        >
          <motion.h2 
            className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            Who to follow
          </motion.h2>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FiUsers className="text-purple-400" size={20} />
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <RightPanelSkeleton />
          ) : suggestedUsers?.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {suggestedUsers.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                  className="rounded-lg overflow-hidden"
                >
                  <Link
                    to={`/profile/${user.username}`}
                    className="flex items-center justify-between gap-4 p-3 transition-all group"
                  >
                    <div className="flex gap-3 items-center">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-0.5"
                      >
                        <img 
                          src={user.profileImg || "/avatar-placeholder.png"} 
                          alt={user.username}
                          className="w-full h-full rounded-full object-cover border border-gray-800"
                        />
                      </motion.div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-white truncate max-w-[160px]">
                          {user.fullName}
                        </span>
                        <span className="text-sm text-gray-400 truncate">@{user.username}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        background: "linear-gradient(to right, #7e22ce, #ec4899)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full btn-sm flex items-center gap-1 border-none shadow-lg shadow-purple-900/30"
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
              className="text-center p-6 rounded-lg bg-gray-800/50 border border-dashed border-purple-900/50"
            >
              <motion.div 
                className="text-purple-400 mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FiUsers className="mx-auto" size={28} />
              </motion.div>
              <h3 className="text-gray-300 font-medium">No suggestions yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                Follow more people to get recommendations
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  color: "#e879f9"
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 text-sm flex items-center justify-center gap-1 mx-auto text-purple-400 hover:text-purple-300"
              >
                Explore users <FiChevronRight />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-4 border-t border-gray-800"
        >
          <div className="flex flex-wrap gap-3 text-sm justify-center">
            {["Terms", "Privacy", "Cookies", "More"].map((item) => (
              <motion.a
                key={item}
                whileHover={{ 
                  scale: 1.05, 
                  color: "#e879f9",
                  textShadow: "0 0 8px rgba(232, 121, 249, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.p 
            className="text-xs text-gray-600 text-center mt-3"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            © {new Date().getFullYear()} Miamour
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RightPanel;