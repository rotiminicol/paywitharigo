import { motion } from "framer-motion";

const RightPanelSkeleton = () => {
  const shimmerVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: 0.6,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      className='flex flex-col gap-4 w-full my-2 p-4 bg-gray-900/80 rounded-lg border border-purple-900/30 shadow-lg'
    >
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, type: "spring" }}
          className='flex gap-3 items-center'
        >
          <motion.div 
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className='w-10 h-10 rounded-full shrink-0 bg-purple-900/30'
          ></motion.div>
          <div className='flex flex-1 justify-between'>
            <div className='flex flex-col gap-2 w-full'>
              <motion.div 
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className='h-3 w-3/4 rounded-full bg-purple-900/30'
              ></motion.div>
              <motion.div 
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className='h-2 w-1/2 rounded-full bg-purple-900/30'
              ></motion.div>
            </div>
            <motion.div 
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className='h-8 w-16 rounded-full bg-purple-900/30'
            ></motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RightPanelSkeleton;