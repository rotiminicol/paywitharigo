import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Ghost } from "lucide-react";
import { toast } from "react-hot-toast";

const Posts = ({ feedType, username, userId }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/all";
      case "following":
        return "/api/posts/following";
      case "posts":
        return `/api/posts/user/${username}`;
      case "likes":
        return `/api/posts/likes/${userId}`;
      default:
        return "/api/posts/all";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", feedType, username, userId],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    staleTime: 60000, // 1 minute
    retry: 2, // Retry failed requests twice
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
      } catch (error) {
        toast.error(error.message, {
          style: {
            background: "#111827",
            color: "#EF4444",
            border: "1px solid #6D28D9",
            borderRadius: "8px",
          },
        });
      }
    };
    fetchData();
  }, [feedType, refetch, username, userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success("Posts refreshed", {
        style: {
          background: "#111827",
          color: "#10B981",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
    } catch (error) {
      toast.error(error.message, {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="relative w-full space-y-4">
      {/* Refresh button */}
      <motion.button
        onClick={handleRefresh}
        className="absolute top-0 right-0 -mt-12 p-2 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg z-10 text-green-400 border border-gray-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || isRefetching}
        aria-label="Refresh posts"
      >
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw size={18} />
        </motion.div>
      </motion.button>

      {/* Loading state */}
      <AnimatePresence mode="wait">
        {(isLoading || isRefetching) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
            key="loading"
          >
            {[1, 2, 3].map((i) => (
              <PostSkeleton key={i} delay={i * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      <AnimatePresence>
        {isError && !isLoading && !isRefetching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-gray-800/50 border border-red-500/30 rounded-lg text-center backdrop-blur-sm"
          >
            <p className="text-red-400 mb-2">
              {error?.message || "Failed to load posts"}
            </p>
            <motion.button
              onClick={() => refetch()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={14} /> Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {!isLoading && !isRefetching && !isError && posts?.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center p-10 bg-gray-800/30 rounded-lg border border-gray-700 backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "mirror" 
              }}
              className="mb-4 text-purple-400"
            >
              <Ghost size={48} />
            </motion.div>
            <p className="text-center text-green-400 font-medium">
              No posts available in this tab
            </p>
            <p className="text-center text-gray-400 text-sm mt-1">
              Try switching to a different feed or check back later
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      <AnimatePresence mode="wait">
        {!isLoading && !isRefetching && posts && posts.length > 0 && (
          <motion.div
            key="posts-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="space-y-4"
          >
            {posts.map((post) => (
              <motion.div
                key={post._id}
                variants={itemVariants}
                layoutId={`post-${post._id}`}
                className="transform-gpu" // Hardware acceleration
              >
                <Post post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Posts;