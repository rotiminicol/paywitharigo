import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Smartphone, Lock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-blue-100"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center"
          >
            <DollarSign size={18} className="text-white" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
            Arigo Pay
          </span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <motion.a
            whileHover={{ y: -2 }}
            href="#features"
            className="hover:text-blue-600 transition-colors"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="#security"
            className="hover:text-blue-600 transition-colors"
          >
            Security
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="#pricing"
            className="hover:text-blue-600 transition-colors"
          >
            Pricing
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full text-white transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Sign In
          </motion.a>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 right-6 bg-white border border-blue-100 rounded-lg shadow-xl p-4 z-50"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#security" className="hover:text-blue-600 transition-colors">
                  Security
                </a>
                <a href="#pricing" className="hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <a
                  href="/signin"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-center transition-colors"
                >
                  Sign In
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 max-w-6xl mx-auto">
        <div
          className={`absolute top-20 -left-10 h-64 w-64 bg-blue-400 rounded-full filter blur-3xl opacity-20 ${
            isVisible ? 'animate-pulse' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 h-64 w-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 ${
            isVisible ? 'animate-pulse' : 'opacity-0'
          }`}
        ></div>

        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Banking, <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Reimagined</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Arigo Pay offers a seamless, secure, and modern banking experience. Pay, save, and invest with ease—all in one app.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center space-x-2 text-white transition-all shadow-lg hover:shadow-blue-500/30"
              >
                <span>Open Account</span>
                <CreditCard size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-blue-400 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="md:w-1/2"
          >
            <div className="relative w-full h-96 ml-auto">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute top-8 right-8 w-64 h-64 bg-blue-200 rounded-xl opacity-60"
              ></motion.div>
              <div className="absolute top-12 right-12 w-64 h-64 bg-white border-2 border-blue-400 rounded-xl overflow-hidden shadow-lg">
                <div className="h-full w-full bg-white p-4 flex flex-col">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-medium">Arigo Pay</span>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-3 text-sm">
                    Sent ₦50,000 to @friend. Instant transfers with zero fees! #ArigoPay #BankSmart
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <CreditCard size={12} className="mr-1" /> Instant
                    </span>
                    <span className="flex items-center">
                      <Lock size={12} className="mr-1" /> Secure
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-24 right-24 w-64 h-64 bg-white border-2 border-blue-600 rounded-xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-blue-50 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              Why Arigo Pay?
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="h-8 w-8 text-blue-600" />,
                title: 'Mobile-First Banking',
                description: 'Manage your money on the go with our intuitive app. Pay, save, and invest anytime, anywhere.',
              },
              {
                icon: <CreditCard className="h-8 w-8 text-blue-400" />,
                title: 'Zero-Fee Transfers',
                description: 'Send money instantly to anyone, anywhere, with no hidden fees or charges.',
              },
              {
                icon: <Lock className="h-8 w-8 text-blue-600" />,
                title: 'Top-Notch Security',
                description: 'Your funds are protected with bank-grade encryption and biometric authentication.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-blue-100 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 shadow-sm"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4">
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Future of Banking</h2>
          <p className="text-gray-600 mb-8">
            Open your Arigo Pay account in minutes and experience banking designed for you.
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md text-lg font-medium text-white hover:opacity-90 transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-6 md:mb-0"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <DollarSign size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Arigo Pay
              </span>
            </motion.div>

            <div className="flex space-x-8">
              <motion.a
                whileHover={{ y: -2 }}
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="/terms"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </motion.a>
            </div>
          </div>
          <div className="text-center md:text-left text-gray-500 text-sm mt-8">
            © 2025 Arigo Pay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;