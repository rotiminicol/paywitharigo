import { motion } from 'framer-motion';

const Modal = ({ children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-4 w-full p-2 text-gray-600 border border-gray-300 rounded-md"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;