import { motion } from "framer-motion";

const RightPanelSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col gap-4 w-52 my-2 p-4 bg-gradient-to-b from-purple-950/30 to-purple-900/10 rounded-lg border border-purple-200/10'
    >
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className='flex gap-3 items-center'
        >
          <div className='skeleton w-8 h-8 rounded-full shrink-0 bg-purple-900/30'></div>
          <div className='flex flex-1 justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='skeleton h-2 w-16 rounded-full bg-purple-900/30'></div>
              <div className='skeleton h-2 w-24 rounded-full bg-purple-900/30'></div>
            </div>
            <div className='skeleton h-6 w-14 rounded-full bg-purple-900/30'></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default RightPanelSkeleton;