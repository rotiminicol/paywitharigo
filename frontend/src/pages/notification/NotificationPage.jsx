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
          background: '#8b5cf6',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#8b5cf6',
        },
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
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
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-black bg-opacity-90 z-10 backdrop-blur-sm">
        <motion.p 
          className="font-bold text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Notifications
        </motion.p>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="m-1 hover:text-purple-500 transition-colors">
            <IoSettingsOutline className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-52 border border-gray-700"
          >
            <li>
              <a 
                onClick={deleteNotifications}
                className="hover:bg-purple-900/30 hover:text-purple-400"
              >
                Clear all notifications
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {notifications?.length === 0 && (
        <motion.div 
          className="text-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-4xl mb-4">🔔</div>
          <p className="font-bold text-lg text-gray-400">No notifications yet</p>
          <p className="text-gray-500">When you get notifications, theyll show up here</p>
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-gray-800"
      >
        <AnimatePresence>
          {notifications?.map((notification) => (
            <motion.div
              key={notification._id}
              variants={item}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="hover:bg-gray-900/50 transition-colors"
            >
              <div className="flex gap-3 p-4 items-start">
                <motion.div 
                  className="p-2 rounded-full bg-purple-900/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {notification.type === "follow" && (
                    <FaUser className="w-5 h-5 text-purple-500" />
                  )}
                  {notification.type === "like" && (
                    <FaHeart className="w-5 h-5 text-pink-500" />
                  )}
                </motion.div>
                
                <Link 
                  to={`/profile/${notification.from.username}`}
                  className="flex-1"
                >
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 mb-1"
                  >
                    <div className="avatar">
                      <div className="w-8 rounded-full ring-1 ring-purple-500">
                        <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                      </div>
                    </div>
                    <span className="font-bold hover:text-purple-400 transition-colors">
                      @{notification.from.username}
                    </span>
                  </motion.div>
                  <p className="text-gray-400">
                    {notification.type === "follow" 
                      ? "started following you" 
                      : "liked your post"}
                  </p>
                  {notification.type === "like" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Post: {notification.post?.text?.substring(0, 30)}...
                    </p>
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