import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline, MdLightbulbOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();

  // Background gradient animation
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setGradientPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at ${50 + gradientPos.x * 20}% ${50 + gradientPos.y * 20}%, #4f46e5, #1e1e1e)`
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="max-w-screen-xl mx-auto flex h-screen relative z-10">
        {/* Left Side - Graphic */}
        <motion.div 
          className="flex-1 hidden lg:flex items-center justify-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative mb-8"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative z-10 text-center">
              <motion.div 
                className="text-6xl font-bold text-white mb-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                iJuewa
              </motion.div>
              <motion.div 
                className="text-xl text-indigo-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Join Our Knowledge Community
              </motion.div>
            </div>
            
            <motion.div 
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[
              "Connect with experts worldwide",
              "Share your unique knowledge",
              "Discover new perspectives",
              "Grow your skills daily"
            ].map((text, index) => (
              <motion.div
                key={index}
                className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-indigo-300 text-2xl mb-2">
                  <MdLightbulbOutline />
                </div>
                <h3 className="text-white font-medium">Benefit #{index+1}</h3>
                <p className="text-white/70 text-sm mt-1">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center p-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.form 
            className="flex gap-4 flex-col w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg"
            onSubmit={handleSubmit}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex justify-center mb-2">
              <motion.div 
                className="text-4xl font-bold text-white"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                iJuewa
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-2xl font-semibold text-white text-center mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Start your knowledge journey
            </motion.h1>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="group relative block mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-200">
                  <MdOutlineMail className="text-xl" />
                </span>
                <input
                  type="email"
                  className="w-full bg-black/30 text-white placeholder-indigo-200/50 rounded-lg py-3 pl-10 pr-3 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                  placeholder="Email address"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </label>
            </motion.div>

            <div className="flex gap-4">
              <motion.div
                className="flex-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="group relative block mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-200">
                    <FaUser className="text-lg" />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-black/30 text-white placeholder-indigo-200/50 rounded-lg py-3 pl-10 pr-3 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </label>
              </motion.div>

              <motion.div
                className="flex-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="group relative block mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-200">
                    <MdDriveFileRenameOutline className="text-xl" />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-black/30 text-white placeholder-indigo-200/50 rounded-lg py-3 pl-10 pr-3 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                    placeholder="Full name"
                    name="fullName"
                    onChange={handleInputChange}
                    value={formData.fullName}
                  />
                </label>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="group relative block mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-200">
                  <MdPassword className="text-xl" />
                </span>
                <input
                  type="password"
                  className="w-full bg-black/30 text-white placeholder-indigo-200/50 rounded-lg py-3 pl-10 pr-3 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                  placeholder="Create password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </label>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button 
                className="btn w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white border-none hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 overflow-hidden relative"
                type="submit"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Creating account...
                    </span>
                  ) : (
                    "Join the Community"
                  )}
                </span>
                {isHovered && (
                  <motion.span 
                    className="absolute inset-0 bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </motion.div>
            
            <AnimatePresence>
              {isError && (
                <motion.p 
                  className="text-red-400 text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
          
          <motion.div 
            className="flex flex-col gap-4 mt-6 w-full max-w-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-white/80">Already part of iJuewa?</p>
            <Link to="/login">
              <motion.button 
                className="btn rounded-full btn-outline w-full text-white border-indigo-500 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in to your account
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating knowledge bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 80],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <MdLightbulbOutline className="text-white/30 text-xs" />
        </motion.div>
      ))}
    </div>
  );
};

export default SignUpPage;