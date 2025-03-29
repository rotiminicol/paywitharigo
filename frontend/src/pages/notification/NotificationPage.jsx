import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications cleared successfully", {
        style: {
          background: '#1a1a1a',
          color: '#8b5cf6',
          border: '1px solid #8b5cf6'
        },
        iconTheme: {
          primary: '#8b5cf6',
          secondary: '#1a1a1a',
        },
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          background: '#1a1a1a',
          color: '#ef4444',
          border: '1px solid #ef4444'
        },
      });
    },
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-800 min-h-screen bg-black">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black bg-opacity-90 z-10 backdrop-blur-sm">
        <motion.p 
          className="font-bold text-xl text-purple-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          Notifications
        </motion.p>
        <div className="dropdown dropdown-end">
          <motion.div 
            tabIndex={0} 
            role="button" 
            className="m-1 text-gray-400 hover:text-purple-500 transition-colors"
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoSettingsOutline className="w-5 h-5" />
          </motion.div>
          <motion.ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 rounded-box w-52 border border-purple-900/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <li>
              <motion.a 
                onClick={deleteNotifications}
                className="hover:bg-purple-900/30 hover:text-purple-400 text-gray-300"
                whileHover={{ x: 5 }}
              >
                Clear all notifications
              </motion.a>
            </li>
          </motion.ul>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <motion.div 
          className="flex justify-center h-full items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="lg" color="purple" />
        </motion.div>
      )}

      {/* Empty state */}
      {notifications?.length === 0 && (
        <motion.div 
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div 
            className="text-4xl mb-4 text-purple-500"
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            🔔
          </motion.div>
          <p className="font-bold text-lg text-purple-300">No notifications yet</p>
          <p className="text-gray-500">When you get notifications, theyll show up here</p>
        </motion.div>
      )}

      {/* Notifications list */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-gray-800"
      >
        <AnimatePresence mode="popLayout">
          {notifications?.map((notification) => (
            <motion.div
              key={notification._id}
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover="hover"
              className="p-4"
            >
              <div className="flex gap-3 items-start">
                <motion.div 
                  className="p-2 rounded-full bg-purple-900/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {notification.type === "follow" && (
                    <FaUser className="w-5 h-5 text-purple-400" />
                  )}
                  {notification.type === "like" && (
                    <FaHeart className="w-5 h-5 text-purple-400" />
                  )}
                </motion.div>
                
                <Link 
                  to={`/profile/${notification.from.username}`}
                  className="flex-1"
                >
                  <motion.div 
                    className="flex items-center gap-2 mb-1"
                    whileHover={{ x: 5 }}
                  >
                    <div className="avatar">
                      <motion.div 
                        className="w-8 rounded-full ring-1 ring-purple-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                      </motion.div>
                    </div>
                    <span className="font-bold text-purple-300 hover:text-purple-200 transition-colors">
                      @{notification.from.username}
                    </span>
                  </motion.div>
                  <p className="text-gray-300">
                    {notification.type === "follow" 
                      ? "started following you" 
                      : "liked your post"}
                  </p>
                  {notification.type === "like" && (
                    <motion.p 
                      className="text-sm text-gray-400 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Post: {notification.post?.text?.substring(0, 30)}...
                    </motion.p>
                  )}
                </Link>
                
                <motion.div 
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {new Date(notification.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NotificationPage;