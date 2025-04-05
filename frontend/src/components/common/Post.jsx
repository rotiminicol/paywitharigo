import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash, FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser?._id);
  const isMyPost = authUser?._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Post deleted successfully", {
        style: {
          background: "#111827",
          color: "#10B981",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
    }
  });

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${post._id}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
    },
  });

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        if (!comment.trim()) {
          throw new Error("Comment cannot be empty");
        }
        
        const res = await fetch(`/api/posts/comment/${post._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Comment posted successfully", {
        style: {
          background: "#111827",
          color: "#10B981",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
    },
  });

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost();
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost();
  };

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex gap-3 items-start p-4 border-b border-gray-800 bg-gray-900'
    >
      <div className='avatar'>
        <Link 
          to={`/profile/${postOwner.username}`} 
          className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-500'
        >
          <img 
            src={postOwner.profileImg || "/avatar-placeholder.png"} 
            alt={`${postOwner.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className='flex flex-col flex-1 gap-2'>
        <div className='flex gap-2 items-center'>
          <Link 
            to={`/profile/${postOwner.username}`} 
            className='font-bold text-white hover:text-green-400 transition-colors'
          >
            {postOwner.fullName}
          </Link>
          <span className='text-gray-400 flex gap-1 text-sm'>
            <Link 
              to={`/profile/${postOwner.username}`} 
              className="hover:text-purple-400 transition-colors"
            >
              @{postOwner.username}
            </Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          
          {isMyPost && (
            <div className='flex justify-end flex-1'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {isDeleting ? <LoadingSpinner size='sm' /> : <FaTrash className="w-4 h-4" />}
              </motion.button>
            </div>
          )}
        </div>
        
        <div className='flex flex-col gap-3 overflow-hidden'>
          <p className='text-white'>{post.text}</p>
          {post.img && (
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="rounded-lg border border-gray-800 overflow-hidden"
            >
              <img
                src={post.img}
                className='w-full max-h-96 object-contain'
                alt='Post content'
                loading="lazy"
              />
            </motion.div>
          )}
        </div>
        
        <div className='flex justify-between mt-2'>
          <div className='flex gap-4 items-center w-full'>
            {/* Comments */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-1 items-center cursor-pointer group'
              onClick={() => setIsCommentModalOpen(true)}
            >
              <FaRegComment className='w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors' />
              <span className='text-sm text-gray-400 group-hover:text-purple-500 transition-colors'>
                {post.comments.length}
              </span>
            </motion.div>

            {/* Repost */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-1 items-center group cursor-pointer'
            >
              <BiRepost className='w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors' />
              <span className='text-sm text-gray-400 group-hover:text-green-500 transition-colors'>0</span>
            </motion.div>

            {/* Likes */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-1 items-center group cursor-pointer' 
              onClick={handleLikePost}
            >
              {isLiking ? (
                <LoadingSpinner size='sm' />
              ) : isLiked ? (
                <FaHeart className='w-4 h-4 text-pink-500' />
              ) : (
                <FaRegHeart className='w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors' />
              )}
              <span className={`text-sm ${isLiked ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-500 transition-colors'}`}>
                {post.likes.length}
              </span>
            </motion.div>

            {/* Bookmark */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-1 items-center cursor-pointer'
            >
              <FaRegBookmark className='w-4 h-4 text-gray-400 hover:text-purple-500 transition-colors' />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <AnimatePresence>
        {isCommentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setIsCommentModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-md max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <h3 className='font-bold text-lg text-white mb-4'>COMMENTS</h3>
                <div className='flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2'>
                  {post.comments.length === 0 ? (
                    <p className='text-sm text-gray-400 text-center py-4'>
                      No comments yet 🤔 Be the first one 😉
                    </p>
                  ) : (
                    post.comments.map((comment) => (
                      <motion.div 
                        key={comment._id} 
                        className='flex gap-2 items-start p-2 rounded-lg bg-gray-800'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className='avatar'>
                          <Link 
                            to={`/profile/${comment.user.username}`}
                            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-green-500"
                          >
                            <img
                              src={comment.user.profileImg || "/avatar-placeholder.png"}
                              alt={`${comment.user.username}'s profile`}
                            />
                          </Link>
                        </div>
                        <div className='flex flex-col flex-1'>
                          <div className='flex items-center gap-1'>
                            <Link 
                              to={`/profile/${comment.user.username}`} 
                              className='font-bold text-white hover:text-green-400 text-sm'
                            >
                              {comment.user.fullName}
                            </Link>
                            <span className='text-gray-400 text-xs'>
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className='text-sm text-white'>{comment.text}</div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
                
                <form
                  className='flex gap-2 items-center mt-4 border-t border-gray-800 pt-3'
                  onSubmit={handlePostComment}
                >
                  <textarea
                    className='flex-1 textarea p-2 rounded-lg text-sm resize-none border focus:outline-none bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-purple-500'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isCommenting}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isCommenting 
                        ? 'bg-gray-700 text-gray-400' 
                        : 'bg-gradient-to-r from-green-600 to-purple-600 text-white'
                    }`}
                  >
                    {isCommenting ? <LoadingSpinner size='sm' /> : "Post"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Post;