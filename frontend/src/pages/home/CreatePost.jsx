import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill, BsXCircleFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiLoader } from "react-icons/fi";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const imgRef = useRef(null);
  const textareaRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
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
      setText("");
      setImg(null);
      toast.success("Post created successfully", {
        icon: "🚀",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !img) {
      toast.error("Post cannot be empty", {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
      return;
    }
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image size should be less than 2MB", {
          style: {
            background: "#111827",
            color: "#EF4444",
            border: "1px solid #6D28D9",
            borderRadius: "8px",
          },
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file", {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB", {
        style: {
          background: "#111827",
          color: "#EF4444",
          border: "1px solid #6D28D9",
          borderRadius: "8px",
        },
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextareaFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleTextareaChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex p-4 items-start gap-4 border-b border-gray-800 bg-gray-900 shadow-md"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="avatar mt-1"
      >
        <div className="w-10 h-10 rounded-full ring-2 ring-green-500 overflow-hidden shadow-lg shadow-green-500/20">
          <motion.img 
            src={authUser?.profileImg || "/avatar-placeholder.png"} 
            alt="User Avatar"
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
      
      <form 
        className="flex flex-col gap-3 w-full" 
        onSubmit={handleSubmit}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`relative transition-all duration-300 ${isDragging ? 'border-2 border-dashed border-green-500 bg-gray-800/50 rounded-lg p-3' : ''}`}>
          <motion.textarea
            ref={textareaRef}
            whileFocus={{ scale: 1.01 }}
            className="w-full p-2 text-lg resize-none border-none focus:outline-none bg-gray-800 text-white placeholder-gray-400 rounded-lg min-h-[60px] transition-all duration-300"
            placeholder="What's on your mind?"
            value={text}
            onChange={handleTextareaChange}
            onFocus={handleTextareaFocus}
            onBlur={() => {
              if (!text) {
                textareaRef.current.style.height = "auto";
              }
            }}
          />
          
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 rounded-lg backdrop-blur-sm pointer-events-none">
              <p className="text-green-400 font-medium">Drop your image here</p>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {img && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md mx-auto my-2 overflow-hidden"
            >
              <div className="relative group rounded-xl overflow-hidden border border-purple-500/30 shadow-lg shadow-purple-500/10">
                <motion.div
                  className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center z-10 opacity-80 hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setImg(null);
                    if (imgRef.current) imgRef.current.value = null;
                  }}
                >
                  <IoCloseSharp className="w-5 h-5" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img 
                    src={img} 
                    className="w-full mx-auto max-h-80 object-contain rounded-xl" 
                    alt="Post preview" 
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center border-t py-3 border-t-gray-700">
          <div className="flex gap-4 items-center">
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <CiImageOn
                className="text-green-500 w-6 h-6 cursor-pointer group-hover:text-green-400 transition-colors duration-300"
                onClick={() => imgRef.current.click()}
              />
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-gray-800 px-2 py-1 rounded"
                initial={{ y: 5 }}
                whileHover={{ y: 0 }}
              >
                Add Image
              </motion.span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <BsEmojiSmileFill className="text-purple-500 w-5 h-5 cursor-pointer group-hover:text-purple-400 transition-colors duration-300" />
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-gray-800 px-2 py-1 rounded"
                initial={{ y: 5 }}
                whileHover={{ y: 0 }}
              >
                Add Emoji
              </motion.span>
            </motion.div>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            hidden 
            ref={imgRef} 
            onChange={handleImgChange} 
          />
          
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 py-2 px-6 rounded-full font-medium transition-all duration-300 ${
              !text.trim() && !img 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-purple-600 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30"
            }`}
            disabled={isPending || (!text.trim() && !img)}
            type="submit"
          >
            {isPending ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FiLoader className="w-4 h-4" />
                </motion.span>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <FiSend className="w-4 h-4" />
                <span>Post</span>
              </>
            )}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {isError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 bg-gray-800 p-3 rounded-lg text-sm border border-red-500/30 shadow-md"
            >
              <div className="flex items-center gap-2">
                <BsXCircleFill className="text-red-500 flex-shrink-0" />
                <span>{error.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default CreatePost;