import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Truck, Shield } from "react-feather";

const Purchase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cards = [
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-600" />,
      title: "Secure Payment",
      text: "100% secure payment methods"
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Fast Delivery",
      text: "Free shipping on orders over $50"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Money Back Guarantee",
      text: "30 days money back guarantee"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Complete Your Purchase
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Secure checkout with multiple payment options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <motion.div 
              variants={itemVariants}
              className="px-6 py-4 border-b border-gray-200"
            >
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex-shrink-0 h-16 w-16 rounded-md bg-gray-200 overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-purple-400 to-indigo-500" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        Product {item}
                      </h3>
                      <p className="text-sm text-gray-500">Size: Medium</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        $49.99
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="text-gray-500">x1</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={itemVariants}
                className="mt-6 border-t border-gray-200 pt-6"
              >
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$149.97</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900 mt-4">
                  <p>Total</p>
                  <p>$149.97</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <motion.div 
              variants={itemVariants}
              className="px-6 py-4 border-b border-gray-200"
            >
              <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Expiration date
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="expiration-date"
                        name="expiration-date"
                        placeholder="MM/YY"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      placeholder="John Smith"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Complete Purchase
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md flex items-start"
              >
                <div className="flex-shrink-0 mr-4">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                  <p className="mt-1 text-gray-500">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Message (Example) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 text-center hidden"
        >
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-800 mb-2">Order confirmed!</h3>
          <p className="text-green-600">
            Your order #12345 has been placed successfully. Weve sent you an email with all the details.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Purchase;