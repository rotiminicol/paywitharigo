import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Truck, Shield, ChevronRight } from "react-feather";

const Purchase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cards = [
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Secure Payment",
      text: "100% secure payment methods",
      bg: "bg-purple-900/30",
      border: "border-purple-500/30"
    },
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Fast Delivery",
      text: "Free shipping on orders over $50",
      bg: "bg-purple-900/30",
      border: "border-purple-500/30"
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Money Back",
      text: "30 days money back guarantee",
      bg: "bg-purple-900/30",
      border: "border-purple-500/30"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
            whileHover={{ scale: 1.01 }}
          >
            Complete Your Purchase
          </motion.h1>
          <motion.p 
            className="text-lg text-purple-300"
            whileHover={{ scale: 1.005 }}
          >
            Secure checkout with multiple payment options
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Order Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
          >
            <motion.div 
              variants={itemVariants}
              className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-700"
            >
              <h2 className="text-lg font-medium text-white">Order Summary</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 sm:p-6">
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ 
                      scale: 1.01,
                      backgroundColor: "rgba(76, 29, 149, 0.2)",
                      borderColor: "rgba(124, 58, 237, 0.5)"
                    }}
                    className="flex items-center p-3 border border-gray-700 rounded-lg bg-gray-800 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md overflow-hidden">
                      <motion.div 
                        className="h-full w-full bg-gradient-to-r from-purple-600 to-purple-900"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        Product {item}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">Size: Medium</p>
                      <p className="text-sm font-medium text-white mt-1">
                        $49.99
                      </p>
                    </div>
                    <div className="ml-2">
                      <span className="text-gray-400 text-sm">x1</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={itemVariants}
                className="mt-4 sm:mt-6 border-t border-gray-700 pt-4 sm:pt-6"
              >
                <div className="flex justify-between text-sm sm:text-base font-medium text-white">
                  <p>Subtotal</p>
                  <p>$149.97</p>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-1">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-medium text-white mt-3 sm:mt-4">
                  <p>Total</p>
                  <motion.p 
                    className="text-purple-400"
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    $149.97
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
          >
            <motion.div 
              variants={itemVariants}
              className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-700"
            >
              <h2 className="text-lg font-medium text-white">Payment Details</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 sm:p-6">
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-300">
                    Card number
                  </label>
                  <div className="mt-1">
                    <motion.input
                      type="text"
                      id="card-number"
                      name="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                      whileFocus={{ 
                        borderColor: "rgba(124, 58, 237, 1)",
                        boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.3)"
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-300">
                      Expiry date
                    </label>
                    <div className="mt-1">
                      <motion.input
                        type="text"
                        id="expiration-date"
                        name="expiration-date"
                        placeholder="MM/YY"
                        className="block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                        whileFocus={{ 
                          borderColor: "rgba(124, 58, 237, 1)",
                          boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.3)"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-300">
                      CVC
                    </label>
                    <div className="mt-1">
                      <motion.input
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        className="block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                        whileFocus={{ 
                          borderColor: "rgba(124, 58, 237, 1)",
                          boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.3)"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-300">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <motion.input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      placeholder="John Smith"
                      className="block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                      whileFocus={{ 
                        borderColor: "rgba(124, 58, 237, 1)",
                        boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.3)"
                      }}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.01,
                    background: "linear-gradient(to right, #7c3aed, #6d28d9)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
                >
                  Complete Purchase
                  <ChevronRight className="ml-2" size={16} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 sm:mt-16"
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-white mb-6 text-center"
            initial={{ y: -15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Why Shop With Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 5px 15px -5px rgba(124, 58, 237, 0.3)"
                }}
                className={`p-4 sm:p-6 rounded-lg flex items-start border ${card.border} ${card.bg} transition-all duration-300`}
              >
                <motion.div 
                  className="flex-shrink-0 mr-3 p-2 sm:p-3 bg-purple-900/50 rounded-full"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {card.icon}
                </motion.div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white">{card.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Message (Hidden) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-12 bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 sm:p-6 text-center hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-3 sm:mb-4" />
          </motion.div>
          <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">Order confirmed!</h3>
          <p className="text-xs sm:text-sm text-purple-300">
            Your order #12345 has been placed successfully.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Purchase;