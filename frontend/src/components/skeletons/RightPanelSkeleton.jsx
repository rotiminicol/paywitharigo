import { motion } from "framer-motion";

const RightPanelSkeleton = () => {
  const shimmerVariants = {
    initial: { backgroundPosition: "-500px 0" },
    animate: { 
      backgroundPosition: "500px 0",
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className='flex flex-col gap-3 w-full my-2 p-3 sm:p-4 bg-black rounded-xl border border-purple-900/50 shadow-lg'
    >
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
          className='flex gap-2 sm:gap-3 items-center'
        >
          <motion.div 
            variants={{ ...shimmerVariants, ...pulseVariants }}
            initial="initial"
            animate="animate"
            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 bg-green-900/30 overflow-hidden'
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(34, 197, 94, 0.1) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
          <div className='flex flex-1 justify-between items-center'>
            <div className='flex flex-col gap-2 w-full max-w-[70%]'>
              <motion.div 
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className='h-2 sm:h-3 w-3/4 rounded-full bg-purple-900/30 overflow-hidden'
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0.1) 100%)",
                  backgroundSize: "1000px 100%",
                }}
              />
              <motion.div 
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className='h-2 w-1/2 rounded-full bg-purple-900/30 overflow-hidden'
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0.1) 100%)",
                  backgroundSize: "1000px 100%",
                }}
              />
            </div>
            <motion.div 
              variants={{ ...shimmerVariants, ...pulseVariants }}
              initial="initial"
              animate="animate"
              className='h-6 sm:h-8 w-12 sm:w-16 rounded-full bg-green-900/30 overflow-hidden'
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(34, 197, 94, 0.1) 100%)",
                backgroundSize: "1000px 100%",
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RightPanelSkeleton;