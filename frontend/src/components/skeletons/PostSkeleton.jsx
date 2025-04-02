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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay,
          duration: 0.3,
        }
      }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4 w-full p-6 bg-gradient-to-b from-purple-950/30 to-purple-900/10 rounded-lg border border-purple-200/10 overflow-hidden"
    >
      <div className="flex gap-4 items-center">
        <motion.div 
          className="w-12 h-12 rounded-full shrink-0 bg-purple-900/30 overflow-hidden"
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(147, 51, 234, 0.05) 100%)",
            backgroundSize: "1000px 100%",
          }}
        />
        <div className="flex flex-col gap-2">
          <motion.div 
            className="h-3 w-24 rounded-full bg-purple-900/30 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
              delay: 0.1,
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(147, 51, 234, 0.05) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
          <motion.div 
            className="h-2 w-36 rounded-full bg-purple-900/30 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
              delay: 0.2,
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(147, 51, 234, 0.05) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
        </div>
      </div>
      
      <motion.div 
        className="h-48 w-full bg-purple-900/30 rounded-lg overflow-hidden"
        variants={shimmer}
        initial="initial"
        animate="animate"
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
          delay: 0.3,
        }}
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(147, 51, 234, 0.05) 100%)",
          backgroundSize: "1000px 100%",
        }}
      />
      
      <div className="flex gap-6 mt-2">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="h-4 w-16 rounded-full bg-purple-900/30 overflow-hidden"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
              delay: 0.4 + (i * 0.1),
            }}
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(147, 51, 234, 0.05) 100%)",
              backgroundSize: "1000px 100%",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PostSkeleton;