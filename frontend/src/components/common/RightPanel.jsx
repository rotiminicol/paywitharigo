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
      transition={{ duration: 0.3 }}
      className="hidden lg:block my-4 mx-2 min-w-[300px]"
    >
      <div className="bg-gray-900 p-4 rounded-xl sticky top-2 border border-gray-800 shadow-lg">
        {/* Header */}
        <motion.div 
          whileHover={{ x: 2 }}
          className="flex items-center justify-between mb-4 pb-2 border-b border-purple-900"
        >
          <h2 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Who to follow
          </h2>
          <FiUsers className="text-purple-400" size={20} />
        </motion.div>
        
        {/* Content */}
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          ) : suggestedUsers?.length > 0 ? (
            <AnimatePresence>
              {suggestedUsers.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    to={`/profile/${user.username}`}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-all group"
                  >
                    <div className="flex gap-3 items-center">
                      <motion.div 
                        whileHover={{ rotate: 5 }}
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-full btn-sm flex items-center gap-1 border-none"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 rounded-lg bg-gray-800/50 border border-dashed border-purple-900/50"
            >
              <div className="text-purple-400 mb-3">
                <FiUsers className="mx-auto" size={28} />
              </div>
              <h3 className="text-gray-300 font-medium">No suggestions yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                Follow more people to get recommendations
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-4 border-t border-gray-800"
        >
          <div className="flex flex-wrap gap-3 text-sm justify-center">
            {["Terms", "Privacy", "Cookies", "More"].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05, color: "#E879F9" }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            © {new Date().getFullYear()} Miamour
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RightPanel;