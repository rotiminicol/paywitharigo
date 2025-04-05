import { motion } from "framer-motion";

const ProfileHeaderSkeleton = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Shimmer animation for skeleton elements
  const shimmer = {
    hidden: { x: "-100%", opacity: 0.3 },
    show: {
      x: "100%", 
      opacity: 0.6,
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className='flex flex-col gap-2 w-full my-2 p-4 bg-gradient-to-b from-black via-purple-900/40 to-green-900/20 rounded-lg border border-white/10 shadow-lg shadow-purple-500/20'
    >
      <div className='flex gap-2 items-center'>
        <div className='flex flex-1 gap-1'>
          <div className='flex flex-col gap-1 w-full'>
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-4 w-12 rounded-full bg-purple-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-4 w-16 rounded-full bg-green-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-40 sm:h-48 w-full relative bg-black overflow-hidden rounded-t-lg border border-purple-500/20'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent"
              />
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className='skeleton h-20 w-20 rounded-full border-2 border-green-400/30 absolute -bottom-10 left-3 bg-black relative overflow-hidden'
              >
                <motion.div 
                  variants={shimmer} 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              whileHover={{ scale: 1.05 }}
              className='skeleton h-6 mt-4 w-24 ml-auto rounded-full bg-green-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-4 w-14 rounded-full mt-6 bg-purple-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-4 w-20 rounded-full bg-green-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className='skeleton h-4 w-2/3 rounded-full bg-purple-900/40 relative overflow-hidden'
            >
              <motion.div 
                variants={shimmer} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeaderSkeleton;