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
          background: "#4c1d95",
          color: "#f3e8ff",
          border: "1px solid #a855f7",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !img) return;
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      className="flex p-4 items-start gap-4 border-b border-purple-300/10 bg-gradient-to-b from-purple-950/40 to-purple-900/10 backdrop-blur-sm shadow-md"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="avatar mt-1"
      >
        <div className="w-10 h-10 rounded-full ring-2 ring-purple-500 overflow-hidden shadow-lg shadow-purple-500/20">
          <motion.img 
            src={authUser?.profileImg || "/avatar-placeholder.png"} 
            alt="User Avatar"
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
      
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <div className={`relative transition-all duration-300 ${isDragging ? 'border-2 border-dashed border-purple-400 bg-purple-900/20 rounded-lg p-3' : ''}`}>
          <motion.textarea
            ref={textareaRef}
            whileFocus={{ scale: 1.01 }}
            className="w-full p-2 text-lg resize-none border-none focus:outline-none bg-purple-900/20 text-purple-100 placeholder-purple-400/50 rounded-lg min-h-[60px] transition-all duration-300"
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
            <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50 rounded-lg backdrop-blur-sm pointer-events-none">
              <p className="text-purple-200 font-medium">Drop your image here</p>
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
                  className="absolute top-2 right-2 text-white bg-purple-800 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center z-10 opacity-80 hover:opacity-100"
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
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center border-t py-3 border-t-purple-300/10">
          <div className="flex gap-4 items-center">
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <CiImageOn
                className="text-purple-400 w-6 h-6 cursor-pointer group-hover:text-purple-300 transition-colors duration-300"
                onClick={() => imgRef.current.click()}
              />
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-purple-900/90 px-2 py-1 rounded"
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
              <BsEmojiSmileFill className="text-purple-400 w-5 h-5 cursor-pointer group-hover:text-purple-300 transition-colors duration-300" />
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-purple-900/90 px-2 py-1 rounded"
                initial={{ y: 5 }}
                whileHover={{ y: 0 }}
              >
                Add Emoji
              </motion.span>
            </motion.div>
          </div>
          
          <input type="file" accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
          
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 py-2 px-6 rounded-full font-medium transition-all duration-300 ${
              !text.trim() && !img 
                ? "bg-purple-700/50 text-purple-300/70 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md shadow-purple-700/30 hover:shadow-lg hover:shadow-purple-700/40"
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
              className="text-purple-300 bg-purple-900/70 p-3 rounded-lg text-sm border border-purple-700/50 shadow-md"
            >
              <div className="flex items-center gap-2">
                <BsXCircleFill className="text-purple-400 flex-shrink-0" />
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