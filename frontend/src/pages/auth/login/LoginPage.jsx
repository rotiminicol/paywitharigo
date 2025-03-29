import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineMail, MdPassword, MdLightbulbOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const queryClient = useQueryClient();
  const gooContainerRef = useRef(null);

  // Goo effect blobs state
  const [blobs, setBlobs] = useState(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 50,
      speed: Math.random() * 0.5 + 0.2,
    }))
  );

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mouse movement tracker for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate goo blobs
  useEffect(() => {
    if (!gooContainerRef.current) return;
    
    const containerRect = gooContainerRef.current.getBoundingClientRect();
    
    const animateBlobs = () => {
      setBlobs(prevBlobs => 
        prevBlobs.map(blob => {
          // Calculate new position with some mouse influence
          const mouseInfluence = {
            x: (mousePosition.x - containerRect.left) / containerRect.width * 100,
            y: (mousePosition.y - containerRect.top) / containerRect.height * 100
          };
          
          const dx = (mouseInfluence.x - blob.x) * 0.01;
          const dy = (mouseInfluence.y - blob.y) * 0.01;
          
          // Add some randomness for organic movement
          const randomX = (Math.random() - 0.5) * 0.5;
          const randomY = (Math.random() - 0.5) * 0.5;
          
          return {
            ...blob,
            x: blob.x + dx + randomX,
            y: blob.y + dy + randomY,
            // Keep blobs within bounds
            ...(blob.x < 0 && { x: 0 }),
            ...(blob.x > 100 && { x: 100 }),
            ...(blob.y < 0 && { y: 0 }),
            ...(blob.y > 100 && { y: 100 }),
          };
        })
      );
    };
    
    const intervalId = setInterval(animateBlobs, 50);
    return () => clearInterval(intervalId);
  }, [mousePosition]);

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-slate-900">
      {/* SVG filter for goo effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      
      {/* Background gradient with goo effect */}
      <div 
        ref={gooContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ filter: 'url(#goo)' }}
      >
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>
        
        {/* Animated goo blobs */}
        {blobs.map(blob => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.6) 0%, rgba(79, 70, 229, 0.2) 70%)`,
              filter: 'blur(8px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + blob.id,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="max-w-screen-xl mx-auto flex h-screen relative z-10">
        {/* Left Side - Branding */}
        <motion.div 
          className="flex-1 hidden lg:flex items-center justify-center flex-col pr-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="relative mb-16"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative z-10 text-center">
              <motion.div 
                className="text-7xl font-bold text-white mb-3"
                initial={{ scale: 0.9, filter: "blur(8px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
                  iJuewa
                </span>
              </motion.div>
              <motion.div 
                className="text-xl text-indigo-200/80 font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
               Share your memories, Tell your stories, Get Inspired
              </motion.div>
            </div>
            
            {/* Background glow effect */}
            <motion.div 
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Feature highlights */}
          <motion.div 
            className="grid grid-cols-2 gap-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              { title: "Connect", desc: "Network with experts in your field" },
              { title: "Discover", desc: "Explore diverse perspectives" },
              { title: "Contribute", desc: "Share valuable insights" },
              { title: "Evolve", desc: "Continuous learning, every day" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm group"
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-indigo-300 text-2xl mb-3 group-hover:text-indigo-200 transition-colors">
                  <MdLightbulbOutline />
                </div>
                <h3 className="text-white font-medium text-lg">{item.title}</h3>
                <p className="text-white/60 text-sm mt-2 group-hover:text-white/80 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.form 
            className="flex gap-6 flex-col w-full max-w-md p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl"
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)" }}
          >
            <motion.h1 
              className="text-2xl font-semibold text-white text-center mb-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="block text-lg text-indigo-300 mb-1 font-light">Welcome back to</span>
              Your Knowledge Community
            </motion.h1>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-6"
            >
              <label className="group relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-300 group-focus-within:text-indigo-400 transition-colors">
                  <MdOutlineMail className="text-xl" />
                </span>
                <input
                  type="text"
                  className="w-full bg-white/5 text-white placeholder-indigo-200/40 rounded-xl py-4 pl-12 pr-4 border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="Username or Email"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </label>
              
              <label className="group relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-300 group-focus-within:text-indigo-400 transition-colors">
                  <MdPassword className="text-xl" />
                </span>
                <input
                  type="password"
                  className="w-full bg-white/5 text-white placeholder-indigo-200/40 rounded-xl py-4 pl-12 pr-4 border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </label>
            </motion.div>
            
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link 
                to="/forgot-password" 
                className="text-indigo-300 hover:text-indigo-200 text-sm relative group"
              >
                Forgot password?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400/50 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-2"
            >
              <motion.button 
                className="w-full py-4 rounded-xl text-white border-none transition-all duration-300 overflow-hidden relative"
                type="submit"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "linear-gradient(90deg, rgba(79, 70, 229, 1) 0%, rgba(124, 58, 237, 1) 100%)"
                }}
              >
                <span className="relative z-10 font-medium text-lg">
                  {isPending ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Signing in...
                    </span>
                  ) : (
                    "Continue Learning"
                  )}
                </span>
                
                {/* Button hover effect with pseudo goo */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      className="absolute inset-0 flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white/10"
                          style={{
                            width: 20 + i * 15,
                            height: 20 + i * 15,
                            filter: 'blur(8px)',
                          }}
                          animate={{
                            x: [
                              (i - 1) * 40, 
                              (i - 1) * 60, 
                              (i - 1) * 40
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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
            className="flex flex-col gap-4 mt-8 w-full max-w-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="text-white/60">New to iJuewa?</p>
            <Link to="/signup" className="w-full">
              <motion.button 
                className="py-3 rounded-xl w-full text-white border border-indigo-500/30 bg-white/5 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300"
                whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Create an account
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;