import { motion } from "framer-motion";

const PostSkeleton = ({ delay = 0 }) => {
  // Variants for shimmer effect
  const shimmer = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: "500px 0",
    },
  };

  // Pulse animation for subtle scale effect
  const pulse = {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }
      }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-3 w-full p-4 sm:p-6 bg-black rounded-xl border border-purple-900/30 overflow-hidden shadow-lg"
    >
      <div className="flex gap-3 sm:gap-4 items-center">
        <motion.div 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 bg-green-900/20 overflow-hidden"
          variants={{ ...shimmer, ...pulse }}
          initial="initial"
          animate="animate"
          transition={{
            backgroundPosition: {
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
            },
          }}
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(34, 197, 94, 0.1) 100%)",
            backgroundSize: "1000px 100%",
          }}
        />
        <div className="flex flex-col gap-2 w-full">
          <motion.div 
            className="h-3 w-20 sm:w-24 rounded-full bg-purple-900/20 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
              delay: 0.1,
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0.1) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
          <motion.div 
            className="h-2 w-32 sm:w-36 rounded-full bg-purple-900/20 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
              delay: 0.2,
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0.1) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
        </div>
      </div>
      
      <motion.div 
        className="h-40 sm:h-48 w-full bg-black rounded-lg overflow-hidden border border-green-900/30"
        variants={{ ...shimmer, ...pulse }}
        initial="initial"
        animate="animate"
        transition={{
          backgroundPosition: {
            repeat: Infinity,
            duration: 1.8,
            ease: "linear",
            delay: 0.3,
          },
        }}
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(34, 197, 94, 0.1) 100%)",
          backgroundSize: "1000px 100%",
        }}
      />
      
      <div className="flex gap-4 sm:gap-6 mt-2">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="h-4 w-12 sm:w-16 rounded-full bg-purple-900/20 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
              delay: 0.4 + (i * 0.1),
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0.1) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PostSkeleton;